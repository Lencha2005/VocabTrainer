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
  // addWordById,
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
import WordsPagination from '../Recommend/components/Pagination';

export default function Dictionary() {
  const [editWord, setEditWord] = useState<WordItem | null>(null);

  const dispatch = useAppDispatch();
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
    }, [dispatch]),
  );

  // useEffect(() => {
  //   dispatch(resetCurrentPage());
  // }, [dispatch, search, category, subCategory]);

  useEffect(() => {
    const verb = category === 'verb';

    // задаємо ліміт залежно від підкатегорії
    const limit = verb ? 4 : 5;
    dispatch(
      getUserWordsWithPagination({
        limit,
        page: currentPage,
        keyword: search,
        category,
        isIrregular,
      }),
    );
  }, [dispatch, currentPage, search, category, isIrregular]);

  const onPageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };
  // const onAdd = (id: string) => {
  //   dispatch(addWordById(id));
  // };

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
          limit: category === 'verb' ? 4 : 5,
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
    <View>
      <SearchBar mode={'dictionary'} />
      <WordsTable
        words={words}
        onEdit={onEdit}
        onDelete={onDelete}
        variant="dictionary"
      />
      <WordsPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
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
