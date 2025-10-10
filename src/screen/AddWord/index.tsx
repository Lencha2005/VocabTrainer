import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Select from '../../common/components/Select';
import Input from '../../common/components/Input';
import {EnglangIcon, UkraineIcon} from '../../assets/icons';
import {fonts} from '../../constants/fonts';
import {InferType} from 'yup';
import {EditSchema} from '../Auth/utils/validations';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../redux/store';
import {useAppSelector} from '../Auth/utils/hooks';
import {selectCategories} from '../../redux/recommend/recommendSelectors';
import {
  selectRecommendCategory,
  selectRecommendIsIrregular,
} from '../../redux/filters/filtersSelectors';
import {
  setRecommendCategory,
  setRecommendIsIrregular,
} from '../../redux/filters/recommendFiltersSlice';
import {createWord} from '../../redux/dictionary/dictionaryOperations';
import Toast from 'react-native-toast-message';
import {getUserWordsWithPagination} from '../../redux/dictionary/dictionaryOperations';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import {RadioButton} from '../Recommend/components/RadioButton';

type AddWordInputs = InferType<typeof EditSchema>;

export default function AddWordPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();

  const categories = useAppSelector(selectCategories);
  const category = useAppSelector(selectRecommendCategory);
  const isIrregular = useAppSelector(selectRecommendIsIrregular);

  const setCategory = (value: string | null) => {
    dispatch(setRecommendCategory(value));
  };

  const setSub = (value: 'Regular' | 'Irregular' | null) => {
    const sub = value === null ? null : value === 'Irregular' ? true : false;
    dispatch(setRecommendIsIrregular(sub));
  };

  const onSubmit = async (data: AddWordInputs) => {
    try {
      const wordPayload = {
        ...data,
        category,
        ...(category === 'verb' && typeof isIrregular === 'boolean'
          ? {isIrregular}
          : {}),
      };

      await dispatch(createWord(wordPayload)).unwrap();

      await dispatch(
        getUserWordsWithPagination({
          page: 1,
          limit: 5,
        }),
      ).unwrap();
      Toast.show({
        type: 'success',
        text1: 'Слово додано до словника!',
      });

      navigation.goBack();
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Щось пішло не так...',
      });
    }
  };

  return (
    <View style={styles.wrapText}>
      <Text style={styles.title}>Add word</Text>
      <Text style={styles.text}>
        Adding a new word to the dictionary is an important step in enriching
        the language base and expanding the vocabulary.
      </Text>
      <Formik
        initialValues={{
          ua: '',
          en: '',
        }}
        validationSchema={EditSchema}
        onSubmit={onSubmit}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <View style={{position: 'relative', marginBottom: 6}}>
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
                    selected={isIrregular === false}
                    onPress={() => setSub('Regular')}
                  />
                  <RadioButton
                    label="Irregular"
                    selected={isIrregular === true}
                    onPress={() => setSub('Irregular')}
                  />
                </View>
              )}
            </View>
            <View style={styles.wrapInput}>
              <View style={styles.wrapIcon}>
                <UkraineIcon />
                <Text style={styles.label}>Ukrainian</Text>
              </View>
              <Input
                value={values.ua}
                onChangeText={handleChange('ua')}
                onBlur={handleBlur('ua')}
                placeholder="Трохи, трішки"
              />
              {touched.ua && errors.ua && (
                <Text style={styles.error}>{errors.ua}</Text>
              )}
            </View>

            <View style={styles.wrapInput}>
              <View style={styles.wrapIcon}>
                <EnglangIcon />
                <Text style={styles.label}>English</Text>
              </View>

              <Input
                value={values.en}
                onChangeText={handleChange('en')}
                onBlur={handleBlur('en')}
                placeholder="A little bit"
              />
              {touched.en && errors.en && (
                <Text style={styles.error}>{errors.en}</Text>
              )}
            </View>

            <TouchableOpacity
              style={styles.btnAdd}
              onPress={() => handleSubmit()}>
              <Text style={styles.btnText}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapText: {
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  title: {
    fontFamily: fonts.MacPawFixelDisplaySemiBold,
    fontSize: 24,
    color: '#121417',
    marginBottom: 16,
  },
  text: {
    fontFamily: fonts.MacPawFixelDisplayRegular,
    fontSize: 16,
    color: 'rgba(18, 20, 23, 0.8)',
    marginBottom: 16,
  },
  radio: {
    position: 'absolute',
    bottom: 14,
    left: 16,
    flexDirection: 'row',
  },
  wrapInput: {
    marginBottom: 24,
  },
  wrapIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontFamily: fonts.MacPawFixelDisplayMedium,
    color: '#121417',
  },
  error: {
    fontFamily: fonts.MacPawFixelDisplayRegular,
    color: 'red',
    fontSize: 12,
  },
  btnAdd: {
    backgroundColor: '#85aa9f',
    padding: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 12,
  },
  btnText: {
    color: '#fcfcfc',
    fontSize: 16,
    fontFamily: fonts.MacPawFixelDisplayBold,
  },
  cancelText: {
    textAlign: 'center',
    color: 'rgba(18, 20, 23, 0.5)',
    fontSize: 16,
    fontFamily: fonts.MacPawFixelDisplayBold,
  },
});
