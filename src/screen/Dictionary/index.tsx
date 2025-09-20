import React, {useCallback} from 'react';
import SearchBar from '../Recommend/components/SearchBar';
import {resetDictionaryFilters} from '../../redux/filters/dictionaryFiltersSlice';
import {useAppDispatch, useAppSelector} from '../Auth/utils/hooks';
import {useFocusEffect} from '@react-navigation/native';
import WordsTable from '../Recommend/components/WordsTable';
import {View} from 'react-native';
import {selectDictionary} from '../../redux/dictionary/dictionarySelectors';
import {
  addWordById,
  deleteWordById,
  getAllUserWords,
} from '../../redux/dictionary/dictionaryOperations';

export default function Dictionary() {
  const dispatch = useAppDispatch();
  const words = useAppSelector(selectDictionary);

  useFocusEffect(
    useCallback(() => {
      dispatch(resetDictionaryFilters());
      dispatch(getAllUserWords());
    }, [dispatch]),
  );

  const onEdit = (id: string) => {
    dispatch(addWordById(id));
  };

  const onDelete = (id: string) => {
    dispatch(deleteWordById(id));
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
    </View>
  );
}
