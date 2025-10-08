import * as Yup from 'yup';

export const RegistrationSchema = () =>
  Yup.object({
    name: Yup.string().min(3).required('Name is required'),
    email: Yup.string()
      .required('Email is required')
      .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, 'Invalid email'),
    password: Yup.string()
      .required('Password is required')
      .matches(
        /^(?=.*[a-zA-Z]{6})(?=.*\d)[a-zA-Z\d]{7}$/,
        'Password must contain 1 number and 6 letters',
      ),
  });

export const LoginSchema = () =>
  Yup.object({
    email: Yup.string()
      .required('Email is required')
      .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, 'Invalid email'),
    password: Yup.string()
      .required('Password is required')
      .matches(
        /^(?=.*[a-zA-Z]{6})(?=.*\d)[a-zA-Z\d]{7}$/,
        'Password must contain 1 number and 6 letters',
      ),
  });

export const EditSchema = Yup.object({
  ua: Yup.string()
    .matches(
      /^(?![A-Za-z])[А-ЯІЄЇҐґа-яієїʼ\s]+$/u,
      'Введіть слово українською мовою',
    )
    .required(),
  en: Yup.string()
    .matches(/^[A-Za-z][A-Za-z'\- ]*$/, 'Введіть слово англійською мовою')
    .required(),
});
