import React from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {IllustrationImg} from '../../../../assets/icons';
import styles from '../../styles';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({children}: AuthLayoutProps) {
  //   const pathname = usePathname();
  //   const isRegisterPage = pathname === '/register';
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.mainWrap}>
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
        <KeyboardAvoidingView
          keyboardVerticalOffset={Platform.select({android: 20, ios: 90})}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          {children}
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}
