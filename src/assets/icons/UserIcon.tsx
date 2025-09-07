import * as React from 'react';
import {Path, Svg} from 'react-native-svg';

const UserIcon = ({width = 24, height = 24, color = '#FCFCFC'}) => (
  <Svg width={width} height={height} fill="none" viewBox="0 0 25 24">
    <Path
      fill={color}
      fillOpacity="0.7"
      d="M12.5 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8m0 16s8 0 8-2c0-2.4-3.9-5-8-5s-8 2.6-8 5c0 2 8 2 8 2"
    />
  </Svg>
);

export default UserIcon;
