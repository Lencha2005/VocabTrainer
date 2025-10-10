import React from 'react';
import {AnswerResponse} from '../../../../redux/types';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {BookImg} from '../../../../assets/icons';
import {fonts} from '../../../../constants/fonts';

type WellDoneProps = {
  results: AnswerResponse[];
  onReturn: () => void;
};

export default function WellDone({results, onReturn}: WellDoneProps) {
  const trueResults = results.filter(item => item.isDone);
  console.log('trueResults: ', trueResults);
  const falseResults = results.filter(item => !item.isDone);
  console.log('falseResults: ', falseResults);

  return (
    <View style={styles.wrap}>
      <Image source={BookImg} style={styles.img} resizeMode="contain" />
      <Text style={styles.text}>Well done</Text>
      <View style={styles.wrapList}>
        <View style={styles.list}>
          <Text style={styles.listText}>Correct answers:</Text>
          {trueResults.map(item => (
            <Text key={item._id} style={styles.item}>
              {item.en}
            </Text>
          ))}
        </View>
        <View style={styles.list}>
          <Text style={styles.listText}>Mistakes:</Text>
          {falseResults.map(item => (
            <Text key={item._id} style={styles.item}>
              {item.en}
            </Text>
          ))}
        </View>
      </View>
      <TouchableOpacity style={styles.btn} onPress={onReturn}>
        <Text style={styles.btnText}>Back to Dictionary</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    padding: 32,
  },
  text: {
    fontFamily: fonts.MacPawFixelDisplaySemiBold,
    fontSize: 24,
    color: '#121417',
    textAlign: 'center',
    marginBottom: 32,
  },
  wrapList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    textAlign: 'left',
    marginBottom: 32,
  },
  list: {},
  listText: {
    fontFamily: fonts.MacPawFixelDisplayRegular,
    fontSize: 14,
    color: 'rgba(18, 20, 23, 0.5)',
    marginBottom: 8,
  },
  item: {
    fontFamily: fonts.MacPawFixelDisplayMedium,
    fontSize: 16,
    color: '#121417',
    marginBottom: 4,
  },
  img: {
    width: 140,
    height: 112,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 32,
  },
  btn: {
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
});
