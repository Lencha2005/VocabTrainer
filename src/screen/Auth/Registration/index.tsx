import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import AuthLayout from '../components/AuthLayout';
import Input from '../../../common/components/Input';
import styles from '../styles';
import {Formik, FormikValues} from 'formik';
import {RegistrationSchema} from '../utils/validations';
import {registerUser} from '../../../api/auth';
// import AuthHeader from '../components/AuthHeader';

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

export default function RagistrationPage() {
  const [touched, setTouched] = useState<ITouched>({
    name: false,
    email: false,
    password: false,
  });

  const onRegister = async (name: string, email: string, password: string) => {
    try {
      const result = await registerUser(name, email, password);
      console.log('result: ', result);
    } catch (e: any) {
      console.log('e', e);
    }
  };

  return (
    <AuthLayout>
      {/* <AuthHeader /> */}
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
                  error={touched.name && errors.name}
                />
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
                  disabled={
                    !isValid ||
                    !values.name ||
                    !values.email ||
                    !values.password
                  }>
                  <Text style={styles.btnText}>Register</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
        <TouchableOpacity onPress={() => {}} style={styles.link}>
          <Text style={styles.linkText}>Login</Text>
        </TouchableOpacity>
      </View>
    </AuthLayout>
  );
}
