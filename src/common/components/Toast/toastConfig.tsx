import React from 'react';
import {StyleSheet} from 'react-native';
import {BaseToast, ErrorToast} from 'react-native-toast-message';

export const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={styles.success}
      contentContainerStyle={styles.content}
      text1Style={styles.title}
      text2Style={styles.message}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={styles.error}
      contentContainerStyle={styles.content}
      text1Style={styles.title}
      text2Style={styles.message}
    />
  ),
};

const styles = StyleSheet.create({
  success: {
    borderLeftColor: '#4BB543',
    backgroundColor: '#e6f9ec',
  },
  error: {
    borderLeftColor: '#ff3b30',
    backgroundColor: '#ffe6e6',
  },
  content: {
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 14,
    color: '#333',
  },
});
