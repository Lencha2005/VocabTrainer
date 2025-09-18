import React from 'react';
import {ClipPath, Defs, G, Path, Svg} from 'react-native-svg';

export default function UkraineIcon() {
  return (
    <Svg width="28" height="28" fill="none" viewBox="0 0 28 28">
      <G clipPath="url(#clip0_127_3859)">
        <Path
          fill="#FFDA44"
          d="M14 28c7.732 0 14-6.268 14-14S21.732 0 14 0 0 6.268 0 14s6.268 14 14 14"
        />
        <Path fill="#338AF3" d="M0 14C0 6.268 6.268 0 14 0s14 6.268 14 14" />
      </G>
      <Defs>
        <ClipPath id="clip0_127_3859">
          <Path fill="#fff" d="M0 0h28v28H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
