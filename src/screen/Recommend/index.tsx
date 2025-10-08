import React, {useCallback, useEffect} from 'react';
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
import WordsPagination from './components/Pagination';
import {
  selectRecommendCategory,
  selectRecommendSearch,
  selectRecommendSubCategory,
} from '../../redux/filters/filtersSelectors';
import {
  resetCurrentPage,
  setCurrentPage,
} from '../../redux/recommend/recommendSlice';

export default function Recommend() {
  const dispatch = useAppDispatch();
  const words = useAppSelector(selectRecommendWords);
  const currentPage = useAppSelector(selectCurrentPage);
  const totalPages = useAppSelector(selectTotalPages);
  const search = useAppSelector(selectRecommendSearch);
  const category = useAppSelector(selectRecommendCategory);
  const subCategory = useAppSelector(selectRecommendSubCategory);

  // коли екран у фокусі — скидати фільтри
  useFocusEffect(
    useCallback(() => {
      dispatch(resetRecommendFilters());
    }, [dispatch]),
  );

  useEffect(() => {
    dispatch(resetCurrentPage());
  }, [dispatch, search, category, subCategory]);

  // коли змінюються фільтри або сторінка — фетчити
  useEffect(() => {
    const verb = category === 'verb';

    // задаємо ліміт залежно від підкатегорії
    const limit = verb ? 4 : 5;
    dispatch(getAllWords({limit}));
  }, [dispatch, currentPage, search, category, subCategory]);

  const onAdd = async (id: string) => {
    try {
      await dispatch(addWordById(id));
    } catch (error) {
      console.log('error: ', error);
    }
  };

  const onPageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <View>
      <SearchBar mode={'recommend'} />
      <WordsTable words={words} onAdd={onAdd} variant="recommend" />
      <WordsPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </View>
  );
}
