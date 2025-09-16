import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import AuthLayout from '../components/AuthLayout';
import Input from '../../../common/components/Input';
import styles from '../styles';
import {Formik, FormikValues} from 'formik';
import {RegistrationSchema} from '../utils/validations';
import {registerUser} from '../../../redux/auth/authOperations';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {LoggedOutStackType} from '../../../navigation/types';
import {ScreenNames} from '../../../constants/screenNames';
import Toast from 'react-native-toast-message';
import {navigationRef} from '../../../navigation/components/NavigationRef';
import {useAppDispatch} from '../utils/hooks';

interface ITouched {
  name: boolean;
  email: boolean;
  password: boolean;
}

interface IRegistrationForm {
  name: string;
  email: string;
  password: string;
}

export default function RegistrationPage() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<StackNavigationProp<LoggedOutStackType>>();
  const navigationToLogin = () => {
    navigation.navigate(ScreenNames.LOGIN_PAGE);
  };

  const [touched, setTouched] = useState<ITouched>({
    name: false,
    email: false,
    password: false,
  });

  const onRegister = async (name: string, email: string, password: string) => {
    const result = await dispatch(registerUser({name, email, password}));
    console.log('result: ', result);

    if (registerUser.fulfilled.match(result)) {
      if (navigationRef.isReady()) {
        navigationRef.reset({
          index: 1,
          routes: [{name: ScreenNames.LOGGED_IN_STACK}],
        });
      }
    } else {
      Toast.show({
        type: 'error',
        text1: 'Помилка входу',
        text2: result.payload || 'Щось пішло не так',
      });
    }
  };

  return (
    <AuthLayout>
      <View style={styles.wrapperRegisterForm}>
        <Text style={styles.title}>Register</Text>
        <Text style={styles.text}>
          Please enter your login details to continue using our service:
        </Text>
        <Formik<IRegistrationForm>
          initialValues={{
            name: '',
            email: '',
            password: '',
          }}
          onSubmit={value => {
            onRegister(value.name, value.email, value.password);
          }}
          validationSchema={RegistrationSchema()}>
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
                    setTouched(prevState => ({...prevState, name: true}))
                  }
                  value={values.name}
                  placeholder={'Name'}
                  onChangeText={value => {
                    setFieldValue('name', value);
                  }}
                />
                {touched.name && errors.name && (
                  <Text style={styles.errorText}>{errors.name}</Text>
                )}
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
                    !isValid ||
                    !values.name.trim() ||
                    !values.email.trim() ||
                    !values.password.trim()
                      ? styles.btnDisabled
                      : {},
                  ]}>
                  <Text style={styles.btnText}>Register</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
        <TouchableOpacity onPress={navigationToLogin} style={styles.link}>
          <Text style={styles.linkText}>Login</Text>
        </TouchableOpacity>
      </View>
    </AuthLayout>
  );
}
