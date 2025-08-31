import React from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {IllustrationImg} from '../../../../assets/icons';
import {fonts} from '../../../../constants/fonts';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({children}: AuthLayoutProps) {
  //   const pathname = usePathname();
  //   const isRegisterPage = pathname === '/register';
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.mainWrap}>
        <View style={styles.wrap}>
          <Image
            source={IllustrationImg}
            style={styles.img}
            resizeMode="contain"
          />
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
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? -68 : 10}>
          <View style={{flex: 1}}>
            <View style={styles.form}>{children}</View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  mainWrap: {
    flex: 1,
    justifyContent: 'center',
    // paddingBottom: 10,
  },
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
  form: {
    position: 'absolute',
    bottom: -34,
    left: 0,
    right: 0,
    zIndex: 10,
  },
});
