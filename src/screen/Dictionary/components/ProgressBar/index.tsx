import React from 'react';
import {View, ViewStyle} from 'react-native';
import Svg, {Circle} from 'react-native-svg';

type ProgressBarProps = {
  value: number; // 0–100
  label?: string;
  size?: number;
  thickness?: number;
  labelPosition?: 'inside' | 'left';
  trackColor?: string;
  progressColor?: string;
  additionalContainerStyle?: ViewStyle;
};

export default function ProgressBar({
  value,
  size = 24,
  thickness = 4,
  trackColor = '#d4f8d3',
  progressColor = '#2bd627',
  additionalContainerStyle,
}: ProgressBarProps) {
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  const circle = (
    <View
      style={[
        {
          width: size,
          height: size,
          // paddingRight: 64,
        },
        additionalContainerStyle,
      ]}>
      <Svg
        width={size}
        height={size}
        style={{
          transform: [{rotate: '-90deg'}],
        }}>
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
    </View>
  );
  return circle;
}
