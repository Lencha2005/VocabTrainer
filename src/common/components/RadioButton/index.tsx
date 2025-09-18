import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {fonts} from '../../../constants/fonts';

interface RadioButtonProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

export function RadioButton({label, selected, onPress}: RadioButtonProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}>
      <View style={[styles.circle, selected && styles.circleSelected]}>
        {selected && <View style={styles.innerCircle} />}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  circle: {
    width: 18,
    height: 18,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'rgba(18, 20, 23, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleSelected: {
    borderColor: '#85aa9f',
  },
  innerCircle: {
    width: 10,
    height: 10,
    borderRadius: 6,
    backgroundColor: '#85aa9f',
  },
  label: {
    marginLeft: 8,
    fontFamily: fonts.MacPawFixelDisplayRegular,
    fontSize: 12,
    color: '#121417',
  },
});
