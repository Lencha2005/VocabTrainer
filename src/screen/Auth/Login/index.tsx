import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import AuthLayout from '../components/AuthLayout';
import Input from '../../../common/components/Input';
import styles from '../styles';
import {Formik, FormikValues} from 'formik';
import {LoginSchema} from '../utils/validations';
import {loginUser} from '../../../api/auth';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {ScreenNames} from '../../../constants/screenNames';
import {StackNavigationProp} from '@react-navigation/stack';
import {LoggedOutStackType} from '../../../navigation/types';
import Toast from 'react-native-toast-message';

interface ITouched {
  email: boolean;
  password: boolean;
}

interface ILoginForm {
  email: string;
  password: string;
}

export default function LoginPage() {
  const navigation = useNavigation<StackNavigationProp<LoggedOutStackType>>();
  const navigationToRegister = () => {
    navigation.navigate(ScreenNames.REGISTRATION_PAGE);
  };

  const [touched, setTouched] = useState<ITouched>({
    email: false,
    password: false,
  });

  const onLogin = async (email: string, password: string) => {
    try {
      const result = await loginUser(email, password);
      console.log('result: ', result);
      if (result) {
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{name: ScreenNames.LOGGED_IN_STACK}],
          }),
        );
      }
    } catch (e: any) {
      Toast.show({
        type: 'error',
        text1: 'Помилка входу',
        text2: e.response?.data?.message || 'Щось пішло не так',
      });
    }
  };

  return (
    <AuthLayout>
      <View style={styles.wrapperLoginForm}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.text}>
          Please enter your login details to continue using our service:
        </Text>
        <Formik<ILoginForm>
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={value => {
            onLogin(value.email, value.password);
          }}
          validationSchema={LoginSchema()}
          validateOnChange={true}>
          {({
            values,
            setFieldValue,
            handleSubmit,
            isValid,
            errors,
          }: FormikValues) => (
            <>
              <View>
                <Input
                  onFocus={() =>
                    setTouched(prevState => ({...prevState, email: true}))
                  }
                  value={values.email}
                  placeholder={'Email'}
                  onChangeText={value => {
                    setFieldValue('email', value);
                  }}
                />
                {touched.email && errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
                <Input
                  onFocus={() =>
                    setTouched(prevState => ({...prevState, password: true}))
                  }
                  value={values.password}
                  placeholder={'Password'}
                  onChangeText={value => {
                    setFieldValue('password', value);
                  }}
                  secureTextEntry={true}
                />
                {touched.password && errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
                <TouchableOpacity
                  onPress={handleSubmit}
                  style={[
                    styles.btn,
                    !isValid || !values.email.trim() || !values.password.trim()
                      ? styles.btnDisabled
                      : {},
                  ]}>
                  <Text style={styles.btnText}>Login</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
        <TouchableOpacity onPress={navigationToRegister} style={styles.link}>
          <Text style={styles.linkText}>Register</Text>
        </TouchableOpacity>
      </View>
    </AuthLayout>
  );
}
