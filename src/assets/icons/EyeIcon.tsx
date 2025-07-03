import React from 'react';
import Svg, {G, Path, ClipPath, Defs} from 'react-native-svg';

const EyeIcon = ({width = 20, height = 20, color = '#121417'}) => (
  <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
    <G
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      clipPath="url(#clip0)">
      <Path d="M.833 10S4.167 3.333 10 3.333 19.167 10 19.167 10 15.833 16.667 10 16.667.833 10 .833 10" />
      <Path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
    </G>
    <Defs>
      <ClipPath id="clip0">
        <Path fill="#fff" d="M0 0h20v20H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default EyeIcon;
