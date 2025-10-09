import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import AuthHeader from '../AuthHeader';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({children}: AuthLayoutProps) {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.mainWrap}>
        <AuthHeader />
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
  form: {
    position: 'absolute',
    bottom: -34,
    left: 0,
    right: 0,
    zIndex: 10,
  },
});
