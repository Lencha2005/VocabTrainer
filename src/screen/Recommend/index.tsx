import React, {useCallback, useEffect, useState} from 'react';
import {View} from 'react-native';
import SearchBar from './components/SearchBar';
import {useAppDispatch, useAppSelector} from '../Auth/utils/hooks';
import {resetRecommendFilters} from '../../redux/filters/recommendFiltersSlice';
import {useFocusEffect} from '@react-navigation/native';
import WordsTable from './components/WordsTable';
import {getAllWords} from '../../redux/recommend/recommendOperations';
import {
  selectCurrentPage,
  selectRecommendWords,
  selectTotalPages,
} from '../../redux/recommend/recommendSelectors';
import {addWordById} from '../../redux/dictionary/dictionaryOperations';
import {
  selectRecommendCategory,
  selectRecommendSearch,
  selectRecommendIsIrregular,
} from '../../redux/filters/filtersSelectors';
import {
  resetCurrentPage,
  setCurrentPage,
} from '../../redux/recommend/recommendSlice';
import Toast from 'react-native-toast-message';

export default function Recommend() {
  const dispatch = useAppDispatch();
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const words = useAppSelector(selectRecommendWords);
  const currentPage = useAppSelector(selectCurrentPage);
  const totalPages = useAppSelector(selectTotalPages);
  const search = useAppSelector(selectRecommendSearch);
  const category = useAppSelector(selectRecommendCategory);
  const isIrregular = useAppSelector(selectRecommendIsIrregular);

  useFocusEffect(
    useCallback(() => {
      dispatch(resetRecommendFilters());
      dispatch(resetCurrentPage());
      dispatch(getAllWords({page: 1, limit: 7}));
    }, [dispatch]),
  );

  useEffect(() => {
    dispatch(resetCurrentPage());
    dispatch(
      getAllWords({page: 1, limit: 7, keyword: search, category, isIrregular}),
    );
  }, [dispatch, search, category, isIrregular]);

  // коли догружаємо
  const handleLoadMore = async () => {
    if (isLoadingMore || currentPage >= totalPages) return;

    setIsLoadingMore(true);
    const nextPage = currentPage + 1;

    await dispatch(
      getAllWords({
        page: nextPage,
        limit: 7,
        keyword: search,
        category,
        isIrregular,
      }),
    ).unwrap();

    dispatch(setCurrentPage(nextPage));
    setIsLoadingMore(false);
  };

  const onAdd = async (id: string) => {
    try {
      await dispatch(addWordById(id)).unwrap();
      Toast.show({
        type: 'success',
        text1: 'Слово додано до словника!',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Слово вже було додано',
      });
    }
  };

  return (
    <View style={{flex: 1}}>
      <SearchBar mode={'recommend'} />
      <WordsTable
        words={words}
        onAdd={onAdd}
        variant="recommend"
        onEndReached={handleLoadMore}
        isLoadingMore={isLoadingMore}
      />
    </View>
  );
}
