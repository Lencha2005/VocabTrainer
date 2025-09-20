import * as React from 'react';
import {Path, Svg} from 'react-native-svg';

interface ArrowDoubleIconProps {
  rotated?: boolean;
  disabled?: boolean;
  color?: string;
  colorDisabled?: string;
}

export default function ArrowDoubleIcon({
  rotated = false,
  disabled = false,
  color = '#121417',
  colorDisabled = '#A1A1AA',
}: ArrowDoubleIconProps) {
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
        d="m11.726 12 .94-.94L9.613 8l3.053-3.06-.94-.94-4 4z"
      />
      <Path
        fill={iconColor}
        d="m7.333 12 .94-.94L5.22 8l3.053-3.06-.94-.94-4 4z"
      />
    </Svg>
  );
}
