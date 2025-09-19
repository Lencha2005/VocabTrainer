import React, {useCallback} from 'react';
import {View} from 'react-native';
import SearchBar from './components/SearchBar';
import {useAppDispatch, useAppSelector} from '../Auth/utils/hooks';
import {resetRecommendFilters} from '../../redux/filters/recommendFiltersSlice';
import {useFocusEffect} from '@react-navigation/native';
import WordsTable from './components/WordsTable';
import {getAllWords} from '../../redux/recommend/recommendOperations';
import {selectWords} from '../../redux/recommend/recommendSelectors';
import {addWordById} from '../../redux/dictionary/dictionaryOperations';

export default function Recommend() {
  const dispatch = useAppDispatch();
  const words = useAppSelector(selectWords);
  console.log('words: ', words);

  useFocusEffect(
    useCallback(() => {
      dispatch(resetRecommendFilters());
      dispatch(getAllWords());
    }, [dispatch]),
  );

  const onAdd = async (id: string) => {
    try {
      await dispatch(addWordById(id));
    } catch (error) {
      console.log('error: ', error);
    }
  };

  return (
    <View>
      <SearchBar mode={'recommend'} />
      <WordsTable words={words} onAdd={onAdd} variant="recommend" />
    </View>
  );
}
