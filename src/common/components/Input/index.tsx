import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {useState} from 'react';
import {fonts} from '../../../constants/fonts';
import EyeIcon from '../../../assets/icons/EyeIcon';
import {EyeOffIcon} from '../../../assets/icons';

interface IInput {
  onBlur?: (e: any) => void;
  value: string;
  onChangeText: (text: string) => void;
  placeholderColor?: string;
  placeholder?: string;
  error?: string | null;
  secureTextEntry?: boolean;
  additionalContainerStyle?: ViewStyle;
  additionInputStyle?: ViewStyle;
  onFocus?: () => void;
  numberOfLines?: number;
  icon?: React.ReactNode;
}
export default function Input({
  onBlur,
  placeholder,
  value,
  onChangeText,
  placeholderColor = '#121417',
  error,
  secureTextEntry = false,
  additionalContainerStyle,
  additionInputStyle,
  numberOfLines = 1,
  onFocus,
  icon,
}: IInput) {
  const [isPassHidden, setIsPassHidden] = useState(secureTextEntry);

  return (
    <>
      <View style={[styles.inputContainer, additionalContainerStyle]}>
        <TextInput
          placeholder={placeholder}
          style={[styles.input, additionInputStyle]}
          placeholderTextColor={placeholderColor}
          onBlur={onBlur}
          onFocus={onFocus}
          value={value}
          numberOfLines={numberOfLines}
          onChangeText={text => onChangeText(text)}
          secureTextEntry={isPassHidden}
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => {
              setIsPassHidden(!isPassHidden);
            }}
            hitSlop={{top: 15, bottom: 15, right: 15, left: 15}}>
            {!isPassHidden ? <EyeIcon /> : <EyeOffIcon />}
          </TouchableOpacity>
        )}
        {!secureTextEntry && icon && (
          <TouchableOpacity style={styles.icon}>{icon}</TouchableOpacity>
        )}
      </View>
      {!!error && <Text>{error}</Text>}
    </>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 1,
    borderRadius: 15,
    marginVertical: 14,
    paddingHorizontal: 18,
    paddingVertical: Platform.select({
      android: 16,
      ios: 18,
      default: 16,
    }),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  },
  // activePasswordBtn: {
  //   height: 20,
  //   width: 20,
  //   backgroundColor: '#121417',
  // },
  // disablePasswordBtn: {
  //   height: 20,
  //   width: 20,
  //   backgroundColor: '#121417',
  // },
  input: {
    padding: 0,
    flex: 1,
    fontFamily: fonts.MacPawFixelDisplayRegular,
  },
  icon: {
    position: 'absolute',
    top: 12,
    right: 24,
  },
});
