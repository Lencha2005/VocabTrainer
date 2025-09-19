import * as React from 'react';
import {Path, Svg} from 'react-native-svg';

export default function CloseIcon() {
  return (
    <Svg width="24" height="24" fill="none" viewBox="0 0 24 24">
      <Path
        stroke="#FCFCFC"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.5"
        d="M18 6 6 18M6 6l12 12"
      />
    </Svg>
  );
}
