import React from 'react';
import {Animated, StyleSheet} from 'react-native';
import {Mask, Path, Svg} from 'react-native-svg';

interface ToggleDownProps {
  width?: number;
  height?: number;
  color?: string;
  rotated?: boolean;
}

export default function ToggleDownIcon({
  width = 20,
  height = 20,
  color = '#121417',
  rotated = false,
}: ToggleDownProps) {
  return (
    <Animated.View
      style={[
        styles.container,
        // style,
        {transform: [{rotate: rotated ? '180deg' : '0deg'}]},
      ]}>
      <Svg width={width} height={height} fill="none" viewBox="0 0 20 20">
        <Mask id="path-1-inside-1_92_4415" fill="#fff">
          <Path d="m10 13.752-6.25-6.25.875-.875L10 12.002l5.375-5.375.875.875z" />
        </Mask>
        <Path
          fill={color}
          d="m10 13.752-6.25-6.25.875-.875L10 12.002l5.375-5.375.875.875z"
        />
        <Path
          fill={color}
          d="m10 13.752-1.06 1.06L10 15.874l1.06-1.06zm-6.25-6.25-1.06-1.06-1.061 1.06 1.06 1.06zm.875-.875 1.06-1.06-1.06-1.061-1.06 1.06zM10 12.002l-1.06 1.06L10 14.124l1.06-1.06zm5.375-5.375 1.06-1.06-1.06-1.061-1.06 1.06zm.875.875 1.06 1.06 1.061-1.06-1.06-1.06zm-5.19 5.19-6.25-6.25-2.12 2.12 6.25 6.25zm-6.25-4.13.876-.874-2.122-2.122-.875.875zm-1.246-.874 5.375 5.375 2.122-2.122-5.375-5.375zm7.497 5.375 5.375-5.375-2.122-2.122-5.375 5.375zm3.253-5.375.875.875 2.122-2.122-.875-.875zm.875-1.247-6.25 6.25 2.122 2.122 6.25-6.25z"
          mask="url(#path-1-inside-1_92_4415)"
        />
      </Svg>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 12,
    right: 24,
  },
});
