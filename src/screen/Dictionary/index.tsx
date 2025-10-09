import React, {useCallback, useEffect, useState} from 'react';
import SearchBar from '../Recommend/components/SearchBar';
import {resetDictionaryFilters} from '../../redux/filters/dictionaryFiltersSlice';
import {useAppDispatch, useAppSelector} from '../Auth/utils/hooks';
import {useFocusEffect} from '@react-navigation/native';
import WordsTable from '../Recommend/components/WordsTable';
import {View} from 'react-native';
import {
  selectCurrentPage,
  selectDictionary,
  selectTotalPages,
} from '../../redux/dictionary/dictionarySelectors';
import {
  deleteWordById,
  getUserWordsWithPagination,
  updateWordById,
} from '../../redux/dictionary/dictionaryOperations';
import EditWordModal from './components/EditWordModal';
import {WordItem} from '../../redux/types';
import {
  resetCurrentPage,
  setCurrentPage,
} from '../../redux/dictionary/dictionarySlice';
import {
  selectDictionaryCategory,
  selectDictionarySearch,
  selectDictionaryIsIrregular,
} from '../../redux/filters/filtersSelectors';

export default function Dictionary() {
  const dispatch = useAppDispatch();
  const [editWord, setEditWord] = useState<WordItem | null>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const words = useAppSelector(selectDictionary);
  const currentPage = useAppSelector(selectCurrentPage);
  const totalPages = useAppSelector(selectTotalPages);
  const search = useAppSelector(selectDictionarySearch);
  const category = useAppSelector(selectDictionaryCategory);
  const isIrregular = useAppSelector(selectDictionaryIsIrregular);

  useFocusEffect(
    useCallback(() => {
      dispatch(resetDictionaryFilters());
      dispatch(resetCurrentPage());
      dispatch(getUserWordsWithPagination({page: 1, limit: 7}));
    }, [dispatch]),
  );

  // перше завантаження
  useEffect(() => {
    dispatch(resetCurrentPage());
    dispatch(
      getUserWordsWithPagination({
        page: 1,
        limit: 7,
        keyword: search,
        category,
        isIrregular,
      }),
    );
  }, [dispatch, search, category, isIrregular]);

  // коли догружаємо
  const handleLoadMore = async () => {
    if (isLoadingMore || currentPage >= totalPages) return;

    const nextPage = currentPage + 1;
    setIsLoadingMore(true);
    dispatch(setCurrentPage(nextPage));

    await dispatch(
      getUserWordsWithPagination({
        page: nextPage,
        limit: 7,
        keyword: search,
        category,
        isIrregular,
      }),
    );
    setIsLoadingMore(false);
  };

  const onDelete = (id: string) => {
    dispatch(deleteWordById(id));
  };

  const onEdit = (id: string) => {
    const wordToEdit = words.find(word => word._id === id);
    if (wordToEdit) {
      setEditWord(wordToEdit);
    }
  };

  const handleUpdateWord = async (payload: {
    id: string;
    formData: Omit<WordItem, '_id'>;
  }) => {
    try {
      await dispatch(updateWordById(payload));
      await dispatch(
        getUserWordsWithPagination({
          limit: 7,
          page: currentPage,
          keyword: search,
          category,
          isIrregular,
        }),
      );
    } catch (error) {
      console.error('Update error', error);
    }
  };

  return (
    <View style={{flex: 1}}>
      <SearchBar mode="dictionary" />
      <WordsTable
        words={words}
        onEdit={onEdit}
        onDelete={onDelete}
        variant="dictionary"
        onEndReached={handleLoadMore}
        isLoadingMore={isLoadingMore}
      />
      <EditWordModal
        visible={!!editWord}
        word={editWord}
        onClose={() => setEditWord(null)}
        onSave={handleUpdateWord}
      />
    </View>
  );
}
