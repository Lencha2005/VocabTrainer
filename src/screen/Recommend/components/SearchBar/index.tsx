import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../../Auth/utils/hooks';
import {
  setDictionaryCategory,
  setDictionarySearch,
  setDictionarySubCategory,
} from '../../../../redux/filters/dictionaryFiltersSlice';
import {
  setRecommendCategory,
  setRecommendSearch,
  setRecommendSubCategory,
} from '../../../../redux/filters/recommendFiltersSlice';
import Input from '../../../../common/components/Input';
import {
  selectDictionaryCategory,
  selectDictionarySearch,
  selectDictionarySubCategory,
  selectRecommendCategory,
  selectRecommendSearch,
  selectRecommendSubCategory,
} from '../../../../redux/filters/filtersSelectors';
import Select from '../../../../common/components/Select';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {selectCategories} from '../../../../redux/recommend/recommendSelectors';
import {getCategories} from '../../../../redux/recommend/recommendOperations';
import {
  PlusIcon,
  SearchIcon,
  SwitchHorizontalIcon,
} from '../../../../assets/icons';
import {fonts} from '../../../../constants/fonts';
import {RadioButton} from '../RadioButton';

interface ISearchBar {
  mode: 'dictionary' | 'recommend';
}

export default function SearchBar({mode}: ISearchBar) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const categories = useAppSelector(selectCategories);
  console.log('categories: ', categories);

  // вибираємо правильні значення залежно від mode
  const search = useAppSelector(state =>
    mode === 'dictionary'
      ? selectDictionarySearch(state)
      : selectRecommendSearch(state),
  );

  const category = useAppSelector(state =>
    mode === 'dictionary'
      ? selectDictionaryCategory(state)
      : selectRecommendCategory(state),
  );

  const subCategory = useAppSelector(state =>
    mode === 'dictionary'
      ? selectDictionarySubCategory(state)
      : selectRecommendSubCategory(state),
  );

  const setSearch = (value: string) =>
    mode === 'dictionary'
      ? dispatch(setDictionarySearch(value))
      : dispatch(setRecommendSearch(value));

  const setCategory = (value: string | null) => {
    if (mode === 'dictionary') {
      dispatch(setDictionaryCategory(value));
    } else {
      dispatch(setRecommendCategory(value));
    }
  };

  const setSub = (value: 'Regular' | 'Irregular' | null) => {
    if (mode === 'dictionary') {
      dispatch(setDictionarySubCategory(value));
    } else {
      dispatch(setRecommendSubCategory(value));
    }
  };

  return (
    <View style={styles.wrap}>
      <Input
        placeholder="Find the word"
        value={search}
        onChangeText={setSearch}
        icon={<SearchIcon />}
        additionalContainerStyle={styles.inputContainer}
        additionInputStyle={styles.input}
      />
      <Select
        value={category}
        options={categories}
        onChange={setCategory}
        placeholder="Categories"
      />

      {category === 'verb' && (
        <View style={styles.radio}>
          <RadioButton
            label="Regular"
            selected={subCategory === 'Regular'}
            onPress={() => setSub('Regular')}
          />
          <RadioButton
            label="Irregular"
            selected={subCategory === 'Irregular'}
            onPress={() => setSub('Irregular')}
          />
        </View>
      )}

      <View
        style={{flexDirection: 'row', alignItems: 'center', marginBottom: 8}}>
        <Text style={styles.text}>To study: </Text>
        <Text style={styles.subText}>0</Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 16}}>
        {mode === 'dictionary' && (
          <TouchableOpacity style={styles.btn} onPress={() => {}}>
            <Text style={styles.btnText}>Add word</Text>
            <PlusIcon />
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.btn} onPress={() => {}}>
          <Text style={styles.btnText}>Train oneself</Text>
          <SwitchHorizontalIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: 16,
    paddingTop: 16,
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 32,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: 'rgba(18, 20, 23, 0.1)',
    borderRadius: 15,
    paddingHorizontal: 24,
    paddingVertical: Platform.select({ios: 12, android: 12, default: 12}),
  },
  input: {
    flex: 1,
    fontFamily: fonts.MacPawFixelDisplayMedium,
    fontSize: 16,
    color: '#121417',
  },
  radio: {
    position: 'absolute',
    bottom: 60,
    left: 16,
    flexDirection: 'row',
  },
  text: {
    fontFamily: fonts.MacPawFixelDisplayMedium,
    fontSize: 14,
    color: 'rgba(18, 20, 23, 0.5)',
  },
  subText: {
    fontFamily: fonts.MacPawFixelDisplayMedium,
    fontSize: 20,
    color: '#121417',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  btnText: {
    fontFamily: fonts.MacPawFixelDisplayMedium,
    fontSize: 16,
    color: '#121417',
  },
});
