import React, {useCallback} from 'react';
// import {View} from 'react-native';
import SearchBar from '../../common/components/SearchBar';
import {useAppDispatch} from '../Auth/utils/hooks';
import {resetRecommendFilters} from '../../redux/filters/recommendFiltersSlice';
import {useFocusEffect} from '@react-navigation/native';

export default function Recommend() {
  const dispatch = useAppDispatch();

  useFocusEffect(
    useCallback(() => {
      dispatch(resetRecommendFilters());
    }, [dispatch]),
  );

  return (
    // <View>
    <SearchBar mode={'recommend'} />
    // </View>
  );
}
