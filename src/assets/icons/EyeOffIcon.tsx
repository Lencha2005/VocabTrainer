import * as React from 'react';
import {ClipPath, Defs, G, Path, Svg} from 'react-native-svg';

const EyeOffIcon = ({width = 20, height = 20, color = '#121417'}) => (
  <Svg width={width} height={height} fill="none" viewBox="0 0 20 20">
    <G
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      clipPath="url(#clip0_52_12061)">
      <Path d="M14.95 14.95A8.4 8.4 0 0 1 10 16.667C4.168 16.667.835 10 .835 10a15.4 15.4 0 0 1 4.217-4.95m3.2-1.517a7.6 7.6 0 0 1 1.75-.2c5.833 0 9.166 6.667 9.166 6.667a15.4 15.4 0 0 1-1.8 2.658m-5.6-.891a2.5 2.5 0 1 1-3.533-3.534M.834.833l18.333 18.334"></Path>
    </G>
    <Defs>
      <ClipPath id="clip0_52_12061">
        <Path fill="#fff" d="M0 0h20v20H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default EyeOffIcon;
