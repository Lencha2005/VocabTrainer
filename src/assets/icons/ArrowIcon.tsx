import * as React from 'react';
import {Path, Svg} from 'react-native-svg';

interface ArrowIconProps {
  rotated?: boolean;
  disabled?: boolean;
  color?: string;
  colorDisabled?: string;
}

export default function ArrowIcon({
  rotated = false,
  disabled = false,
  color = '#121417',
  colorDisabled = '#A1A1AA',
}: ArrowIconProps) {
  const iconColor = disabled ? colorDisabled : color;
  return (
    <Svg
      width="16"
      height="16"
      fill="none"
      viewBox="0 0 16 16"
      style={{
        transform: [{rotate: rotated ? '180deg' : '0deg'}],
      }}>
      <Path
        fill={iconColor}
        d="m10.06 12 .94-.94L7.947 8 11 4.94 10.06 4l-4 4z"
      />
    </Svg>
  );
}
