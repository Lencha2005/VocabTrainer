import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {IllustrationImg} from '../../../../assets/icons';
import {fonts} from '../../../../constants/fonts';

export default function AuthHeader() {
  return (
    <View style={styles.wrap}>
      <Image source={IllustrationImg} style={styles.img} resizeMode="contain" />
      <View style={styles.wrapText}>
        {['Word', 'Translation', 'Grammar', 'Progress'].map(
          (word, idx, arr) => (
            <React.Fragment key={word}>
              <Text style={styles.text}>{word}</Text>
              {idx !== arr.length - 1 && <Text style={styles.dot}>•</Text>}
            </React.Fragment>
          ),
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    marginTop: 64,
  },
  img: {
    width: 247,
    height: 191,
    marginBottom: 16,
  },
  wrapText: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: fonts.MacPawFixelDisplayRegular,
    fontSize: 14,
    color: 'rgba(18, 20, 23, 0.8)',
  },
  dot: {
    fontSize: 16,
    color: '#999',
  },
});
