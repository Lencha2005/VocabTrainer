import React from 'react';
import {Image, Text, View} from 'react-native';
import {IllustrationImg} from '../../../../assets/icons';

export default function AuthHeader() {
  return (
    <View>
      <Image
        source={IllustrationImg}
        style={{width: 247, height: 191, alignSelf: 'center'}}
        resizeMode={'contain'}
      />
      <View>
        <Text>Word</Text>
        <Text>Translation</Text>
        <Text>Grammar</Text>
        <Text>Progress</Text>
      </View>
    </View>
  );
}
