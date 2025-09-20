// src/assets/icons/MoreIcon.tsx
import React from 'react';
import Svg, {Circle} from 'react-native-svg';

export default function MoreIcon({width = 22, height = 12, color = '#121417'}) {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Circle cx="5" cy="12" r="2" fill={color} />
      <Circle cx="12" cy="12" r="2" fill={color} />
      <Circle cx="19" cy="12" r="2" fill={color} />
    </Svg>
  );
}
