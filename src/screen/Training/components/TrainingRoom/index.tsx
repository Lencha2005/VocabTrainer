import React, {useState} from 'react';
import {AnswerResponse, AnswerWordDto, TaskWord} from '../../../../redux/types';
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
import {
  addAnswers,
  getAllUserWords,
} from '../../../../redux/dictionary/dictionaryOperations';
import Toast from 'react-native-toast-message';
import {TrainingSchema} from '../../../Auth/utils/validations';
import {StackNavigationProp} from '@react-navigation/stack';
import {LoggedInStackType} from '../../../../navigation/types';

type TrainingRoomProps = {
  tasks: TaskWord[];
  answers: AnswerWordDto[];
  setAnswers: React.Dispatch<React.SetStateAction<AnswerWordDto[]>>;
  onComplete: (value: AnswerResponse[]) => void;
  direction: 'en' | 'ua';
  setDirection: React.Dispatch<React.SetStateAction<'ua' | 'en' | null>>;
};

type WordTaskInputs = {
  answer: string;
};

export default function TrainingRoom({
  tasks,
  answers,
  setAnswers,
  onComplete,
  direction,
  setDirection,
}: TrainingRoomProps) {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<StackNavigationProp<LoggedInStackType>>();

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const filteredTasks = tasks.filter(task => task.task === direction);
  const currentTask = filteredTasks[currentIndex];

  if (!currentTask) return null;

  const isUaToEn = direction === 'ua';

  const visibleWord = isUaToEn
    ? currentTask.en?.toLowerCase()
    : currentTask.ua?.toLowerCase();

  const handleNext = async (data: WordTaskInputs, resetForm: () => void) => {
    const userAnswer = data.answer.toLowerCase().trim();

    const answer: AnswerWordDto = {
      _id: currentTask._id,
      ua: isUaToEn ? userAnswer : currentTask.ua,
      en: isUaToEn ? currentTask.en : userAnswer,
      task: direction,
    };

    const finalAnswers = [...answers, answer];
    setAnswers(finalAnswers);
    resetForm();

    if (currentIndex < tasks.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      try {
        const result = await dispatch(addAnswers(finalAnswers)).unwrap();
        await dispatch(getAllUserWords());
        // await dispatch(getTasks());
        onComplete(result);
      } catch {
        Toast.show({
          type: 'error',
          text1: 'Щось пішло не так...',
        });
        navigation.goBack();
      }
    }
  };

  //   const key = direction;

  if (!currentTask) return null;

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
          answer: '',
        }}
        validationSchema={TrainingSchema(direction)}
        onSubmit={(data, {resetForm}) => handleNext(data, resetForm)}>
        {({handleChange, handleBlur, submitForm, values, errors, touched}) => (
          <>
            <View style={styles.wrapInput}>
              <Input
                value={values.answer}
                onChangeText={handleChange('answer')}
                onBlur={handleBlur('answer')}
                additionalContainerStyle={styles.input}
                placeholder="Введіть переклад"
              />
              {touched.answer && errors.answer && (
                <Text style={styles.error}>{errors.answer}</Text>
              )}
              {currentIndex < filteredTasks.length - 1 && (
                <TouchableOpacity style={styles.btnNext} onPress={submitForm}>
                  <Text style={styles.btnNextText}>Next</Text>
                  <SwitchHorizontalIcon />
                </TouchableOpacity>
              )}
              <View style={styles.wrapIcon}>
                {isUaToEn ? <UkraineIcon /> : <EnglangIcon />}
                {isUaToEn ? (
                  <Text style={styles.iconText}>Ukrainian</Text>
                ) : (
                  <Text style={styles.iconText}>English</Text>
                )}
              </View>
            </View>
            <View style={styles.wrapTranslate}>
              <Text style={styles.textTranslate}>{visibleWord}</Text>
              <View style={styles.wrapIcon}>
                {isUaToEn ? <EnglangIcon /> : <UkraineIcon />}
                {isUaToEn ? (
                  <Text style={styles.iconText}>English</Text>
                ) : (
                  <Text style={styles.iconText}>Ukrainian</Text>
                )}
              </View>
            </View>
            <TouchableOpacity style={styles.btnAdd} onPress={submitForm}>
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
    position: 'absolute',
    bottom: 22,
    right: 22,
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
  error: {
    fontFamily: fonts.MacPawFixelDisplayRegular,
    color: 'red',
    fontSize: 12,
  },
});
