import React, {useCallback} from 'react';
// import {Text, TouchableOpacity} from 'react-native';
// import {useNavigation} from '@react-navigation/core';
// import {StackNavigationProp} from '@react-navigation/stack';
// import {RootStackNavigation} from '../../navigation/types';
import SearchBar from '../../common/components/SearchBar';
import {resetDictionaryFilters} from '../../redux/filters/dictionaryFiltersSlice';
import {useAppDispatch} from '../Auth/utils/hooks';
import {useFocusEffect} from '@react-navigation/native';

export default function Dictionary() {
  const dispatch = useAppDispatch();

  useFocusEffect(
    useCallback(() => {
      dispatch(resetDictionaryFilters());
    }, [dispatch]),
  );
  // const navigation = useNavigation<StackNavigationProp<RootStackNavigation>>();

  return <SearchBar mode={'dictionary'} />;
}
