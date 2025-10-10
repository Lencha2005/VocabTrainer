import React, {useState} from 'react';
import {AnswerResponse, AnswerWordDto, TaskWord} from '../../../../redux/types';
import {InferType} from 'yup';
import {EditSchema} from '../../../Auth/utils/validations';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {AppDispatch} from '../../../../redux/store';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Formik} from 'formik';
import {
  EnglangIcon,
  SwitchHorizontalIcon,
  UkraineIcon,
} from '../../../../assets/icons';
import Input from '../../../../common/components/Input';
import {fonts} from '../../../../constants/fonts';

type TrainingRoomProps = {
  tasks: TaskWord[];
  answers: AnswerWordDto[];
  setAnswers: React.Dispatch<React.SetStateAction<AnswerWordDto[]>>;
  onComplete: (value: AnswerResponse[]) => void;
  direction: 'en' | 'ua';
  setDirection: React.Dispatch<React.SetStateAction<'ua' | 'en' | null>>;
};

type WordTaskInputs = InferType<typeof EditSchema>;

export default function TrainingRoom({
  tasks,
  answers,
  setAnswers,
  onComplete,
  direction,
  setDirection,
}: TrainingRoomProps) {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  return (
    <>
      <View style={styles.btnLang}>
        <TouchableOpacity
          onPress={() => {
            setCurrentIndex(0);
            setAnswers([]);
            setDirection(prev => (prev === 'ua' ? 'en' : 'ua'));
          }}>
          <Text>
            Змінити напрямок: {direction === 'ua' ? 'UA → EN' : 'EN → UA'}
          </Text>
        </TouchableOpacity>
      </View>

      <Formik
        initialValues={{
          ua: '',
          en: '',
        }}
        validationSchema={EditSchema}
        onSubmit={() => {}}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <View style={styles.wrapInput}>
              <Input
                value={values.ua}
                onChangeText={handleChange('ua')}
                onBlur={handleBlur('ua')}
                additionalContainerStyle={styles.input}
                placeholder="Введіть переклад"
              />
              <View style={styles.wrapBottom}>
                <TouchableOpacity style={styles.btnNext}>
                  <Text style={styles.btnNextText}>Next</Text>
                  <SwitchHorizontalIcon />
                </TouchableOpacity>
                <View style={styles.wrapIcon}>
                  <UkraineIcon />
                  <Text style={styles.iconText}>Ukrainian</Text>
                </View>
              </View>
            </View>
            <View style={styles.wrapTranslate}>
              <Text style={styles.textTranslate}>Tr</Text>
              <View style={[styles.wrapIcon, styles.added]}>
                <EnglangIcon />
                <Text style={styles.iconText}>English</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.btnAdd}
              onPress={() => handleSubmit()}>
              <Text style={styles.btnText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </>
  );
}

const styles = StyleSheet.create({
  btnLang: {
    paddingVertical: 4,
    marginBottom: 20,
  },
  wrapInput: {
    padding: 22,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: '#fcfcfc',
    borderBottomWidth: 1,
    borderBottomColor: '#dbdbdb',
    height: 195,
    position: 'relative',
  },
  input: {
    marginVertical: 0,
    paddingVertical: 6,
    paddingHorizontal: 0,
    borderColor: 'transparent',
    marginBottom: 90,
  },
  wrapBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnNext: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  btnNextText: {
    fontFamily: fonts.MacPawFixelDisplayMedium,
    fontSize: 16,
    color: 'rgba(18, 20, 23, 0.5)',
  },
  wrapIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconText: {
    color: '#121417',
    fontFamily: fonts.MacPawFixelDisplayMedium,
    fontSize: 14,
  },
  wrapTranslate: {
    padding: 22,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: '#fcfcfc',
    height: 195,
    marginBottom: 32,
  },
  textTranslate: {
    color: '#121417',
    fontFamily: fonts.MacPawFixelDisplayMedium,
    fontSize: 16,
  },
  added: {
    position: 'absolute',
    bottom: 22,
    right: 22,
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
