import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import ProgressBar from '../Dictionary/components/ProgressBar';
import TrainingRoom from './components/TrainingRoom';
import {AnswerResponse, AnswerWordDto, TaskWord} from '../../redux/types';
import {useAppSelector} from '../Auth/utils/hooks';
import {
  selectFullDictionaryItems,
  selectTasks,
} from '../../redux/dictionary/dictionarySelectors';
import {
  getAllUserWords,
  getTasks,
} from '../../redux/dictionary/dictionaryOperations';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../redux/store';
import TrainingEmpty from './components/TrainingEmpty';
import WellDone from './components/WellDone';

export default function Training() {
  const dispatch = useDispatch<AppDispatch>();

  const [answers, setAnswers] = useState<AnswerWordDto[]>([]);
  const [results, setResults] = useState<AnswerResponse[] | null>(null);
  const [direction, setDirection] = useState<'ua' | 'en' | null>(null);
  // const [showModal, setShowModal] = useState(false);

  const words = useAppSelector(selectFullDictionaryItems);
  console.log('words: ', words);
  const tasks = useAppSelector(selectTasks);
  console.log('tasks: ', tasks);

  useEffect(() => {
    if (direction !== null || tasks.length === 0) return;
    const hasUa = tasks.some(task => task.task === 'ua');
    const hasEn = tasks.some(task => task.task === 'en');
    const newDirection = hasUa ? 'ua' : hasEn ? 'en' : 'ua';

    if (direction !== newDirection) {
      setDirection(newDirection);
    }
  }, [tasks, direction]);

  useEffect(() => {
    // if (words.length === 0) {
    dispatch(getAllUserWords());
    dispatch(getTasks());
    // }
  }, [dispatch]);

  const progressMap = new Map(
    words.map(word => [word._id, word.progress ?? 0]),
  );

  const filteredTasks: TaskWord[] = tasks.filter(task => {
    const progress = progressMap.get(task._id);
    return progress !== undefined && progress < 100 && task.task === direction;
  });

  const progress = (answers.length / filteredTasks.length) * 100;

  if (direction === null) return null;

  const handleComplete = (res: AnswerResponse[]) => {
    setResults(res);
    // setShowModal(true);
  };

  return (
    <>
      {filteredTasks.length === 0 ? (
        <TrainingEmpty />
      ) : (
        <View style={styles.wrap}>
          <ProgressBar
            value={progress}
            label={`${progress}`}
            labelPosition="inside"
            size={44}
            trackColor="#ffffff"
            progressColor="radial-gradient(136.22% 136.22% at 142.5% 13.75%, rgb(255, 255, 255) 0%, rgb(133, 170, 159) 100%)"
            additionalContainerStyle={styles.progress}
          />
          <TrainingRoom
            tasks={filteredTasks}
            answers={answers}
            setAnswers={setAnswers}
            onComplete={handleComplete}
            direction={direction}
            setDirection={setDirection}
          />
        </View>
      )}
      {results && <WellDone />}
    </>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
  },
  progress: {
    marginLeft: 'auto',
  },
});
