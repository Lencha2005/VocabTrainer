import React, {useCallback, useState} from 'react';
import SearchBar from '../Recommend/components/SearchBar';
import {resetDictionaryFilters} from '../../redux/filters/dictionaryFiltersSlice';
import {useAppDispatch, useAppSelector} from '../Auth/utils/hooks';
import {useFocusEffect} from '@react-navigation/native';
import WordsTable from '../Recommend/components/WordsTable';
import {View} from 'react-native';
import {selectDictionary} from '../../redux/dictionary/dictionarySelectors';
import {
  // addWordById,
  deleteWordById,
  getAllUserWords,
  updateWordById,
} from '../../redux/dictionary/dictionaryOperations';
import EditWordModal from './components/EditWordModal';
import {WordItem} from '../../redux/types';

export default function Dictionary() {
  const [editWord, setEditWord] = useState<WordItem | null>(null);

  const dispatch = useAppDispatch();
  const words = useAppSelector(selectDictionary);
  console.log('words: ', words);

  useFocusEffect(
    useCallback(() => {
      dispatch(resetDictionaryFilters());
      dispatch(getAllUserWords());
    }, [dispatch]),
  );

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
      await dispatch(getAllUserWords());
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
      <EditWordModal
        visible={!!editWord}
        word={editWord}
        onClose={() => setEditWord(null)}
        onSave={handleUpdateWord}
      />
    </View>
  );
}
