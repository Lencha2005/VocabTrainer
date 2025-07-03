import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import AuthLayout from '../components/AuthLayout';
import Input from '../../../common/components/Input';
import styles from '../styles';
import {Formik, FormikValues} from 'formik';
import {LoginSchema} from '../utils/validations';
import {loginUser} from '../../../api/auth';
import AuthHeader from '../components/AuthHeader';

interface ITouched {
  email: boolean;
  password: boolean;
}

interface ILoginForm {
  email: string;
  password: string;
}

export default function LoginPage() {
  const [touched, setTouched] = useState<ITouched>({
    email: false,
    password: false,
  });

  const onLogin = async (email: string, password: string) => {
    try {
      const result = await loginUser(email, password);
      console.log('result: ', result);
    } catch (e: any) {
      console.log('e', e);
    }
  };

  return (
    <AuthLayout>
      {/* <AuthHeader /> */}
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
        validationSchema={LoginSchema()}>
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
                error={touched.email && errors.email}
              />
              <Input
                onFocus={() =>
                  setTouched(prevState => ({...prevState, password: true}))
                }
                value={values.password}
                placeholder={'Password'}
                onChangeText={value => {
                  setFieldValue('password', value);
                }}
                error={touched.password && errors.password}
                secureTextEntry={true}
              />
              <TouchableOpacity
                onPress={handleSubmit}
                style={styles.btn}
                disabled={!isValid || !values.email || !values.password}>
                <Text style={styles.btnText}>Login</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
      <TouchableOpacity onPress={() => {}} style={styles.link}>
        <Text style={styles.linkText}>Register</Text>
      </TouchableOpacity>
    </AuthLayout>
  );
}
