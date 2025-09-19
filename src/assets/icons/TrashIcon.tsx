import * as React from 'react';
import {Path, Svg} from 'react-native-svg';

export default function TrashIcon() {
  return (
    <Svg width="16" height="17" fill="none" viewBox="0 0 16 17">
      <Path
        stroke="#85AA9F"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity="0.94"
        strokeWidth="1.3"
        d="M2 4.5h12M12.667 4.5v9.333a1.333 1.333 0 0 1-1.333 1.334H4.667a1.333 1.333 0 0 1-1.333-1.334V4.5m2 0V3.167a1.333 1.333 0 0 1 1.333-1.334h2.667a1.333 1.333 0 0 1 1.333 1.334V4.5M6.666 7.833v4M9.334 7.833v4"
      />
    </Svg>
  );
}
