import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {BloodImg} from '../../../../assets/icons';
import {ScreenNames} from '../../../../constants/screenNames';
import {StackNavigationProp} from '@react-navigation/stack';
import {LoggedInStackType} from '../../../../navigation/types';

export default function TrainingEmpty() {
  const navigation = useNavigation<StackNavigationProp<LoggedInStackType>>();
  const navigationToDictionary = () => {
    // якщо Dictionary всередині TabBarStack:
    navigation.navigate('TAB_BAR_STACK', {
      screen: ScreenNames.DICTIONARY_PAGE,
    });
  };

  const navigationToAddWord = () => {
    navigation.navigate(ScreenNames.ADD_WORD_PAGE);
  };

  return (
    <View style={styles.wrap}>
      <Image source={BloodImg} style={styles.img} resizeMode="contain" />
      <View>
        <Text style={styles.text}>
          You do not have a single word to learn right now.
        </Text>
        <Text style={styles.subText}>
          Please create or add a word to start the workout. We want to improve
          your vocabulary and develop your knowledge, so please share the words
          you are interested in adding to your study.
        </Text>
        <TouchableOpacity style={styles.btnAdd} onPress={navigationToAddWord}>
          <Text style={styles.btnAddText}>Add word</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={navigationToDictionary}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {},
  img: {},
  text: {},
  subText: {},
  btnAdd: {},
  btnAddText: {},
  cancelText: {},
});
