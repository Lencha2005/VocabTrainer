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
  selectRecommendIsIrregular,
} from '../../redux/filters/filtersSelectors';
import {
  resetCurrentPage,
  setCurrentPage,
} from '../../redux/recommend/recommendSlice';
import Toast from 'react-native-toast-message';

export default function Recommend() {
  const dispatch = useAppDispatch();
  const words = useAppSelector(selectRecommendWords);
  const currentPage = useAppSelector(selectCurrentPage);
  const totalPages = useAppSelector(selectTotalPages);
  const search = useAppSelector(selectRecommendSearch);
  const category = useAppSelector(selectRecommendCategory);
  const isIrregular = useAppSelector(selectRecommendIsIrregular);

  // коли екран у фокусі — скидати фільтри
  useFocusEffect(
    useCallback(() => {
      dispatch(resetRecommendFilters());
    }, [dispatch]),
  );

  useEffect(() => {
    dispatch(resetCurrentPage());
  }, [dispatch, search, category, isIrregular]);

  // коли змінюються фільтри або сторінка — фетчити
  useEffect(() => {
    const verb = category === 'verb';

    // задаємо ліміт залежно від підкатегорії
    const limit = verb ? 4 : 5;
    dispatch(getAllWords({limit}));
  }, [dispatch, currentPage, search, category, isIrregular]);

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
