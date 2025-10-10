import React from 'react';
import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import Svg, {Circle} from 'react-native-svg';
import {fonts} from '../../../../constants/fonts';

type ProgressBarProps = {
  value: number; // 0–100
  label?: string | number;
  showLabel?: boolean;
  size?: number;
  thickness?: number;
  labelPosition?: 'inside' | 'left';
  trackColor?: string;
  progressColor?: string;
  additionalContainerStyle?: ViewStyle;
};

export default function ProgressBar({
  value,
  label,
  showLabel = false,
  size = 24,
  thickness = 4,
  trackColor = '#d4f8d3',
  progressColor = '#2bd627',
  additionalContainerStyle,
}: ProgressBarProps) {
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <View
      style={[
        styles.wrap,
        {width: size, height: size},
        additionalContainerStyle,
      ]}>
      <Svg width={size} height={size} style={styles.svg}>
        {/* фон */}
        <Circle
          stroke={trackColor}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={thickness}
        />
        {/* прогрес */}
        <Circle
          stroke={progressColor}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={thickness}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </Svg>
      {showLabel && label !== undefined && (
        <Text style={[styles.label, {fontSize: size / 2.5}]}>{label}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  svg: {
    position: 'absolute',
    transform: [{rotate: '-90deg'}],
  },
  label: {
    fontFamily: fonts.MacPawFixelDisplayMedium,
    color: '#121417',
    textAlign: 'center',
  },
});
