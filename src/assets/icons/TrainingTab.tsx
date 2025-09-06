import React from 'react';
import {Path, Svg} from 'react-native-svg';

const TrainingTab = ({
  width = 24,
  height = 24,
  isFocused = false,
  color = '#FCFCFC',
}) => (
  <Svg width={width} height={height} fill="none" viewBox="0 0 24 24">
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeOpacity={isFocused ? 1 : 0.5}
      strokeWidth={1.3}
      d="M11 4H6.8c-1.68 0-2.52 0-3.162.327a3 3 0 0 0-1.311 1.311C2 6.28 2 7.12 2 8.8v8.4c0 1.68 0 2.52.327 3.162a3 3 0 0 0 1.311 1.311C4.28 22 5.12 22 6.8 22h8.4c1.68 0 2.52 0 3.162-.327a3 3 0 0 0 1.311-1.311C20 19.72 20 18.88 20 17.2V13"
    />
    <Path
      stroke="#FCFCFC"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeOpacity={isFocused ? 1 : 0.5}
      strokeWidth="1.3"
      d="M8 14.326c0-.49 0-.734.055-.965a2 2 0 0 1 .24-.578c.123-.201.296-.374.642-.72L18.5 2.5a2.121 2.121 0 0 1 3 3l-9.563 9.563c-.346.346-.519.519-.72.642a2 2 0 0 1-.578.24c-.23.055-.475.055-.964.055H8z"
    />
  </Svg>
);

export default TrainingTab;
