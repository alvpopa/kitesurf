import React, { useContext, useState, useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { authContext } from '../contexts/AuthContext';
import {
  Button,
  FormContainer,
  FormError,
  Heading,
  InputField,
  InputFieldHeader,
  Label
} from '../components';

const Login = ({ client, setLoggedIn }) => {
  const auth = useContext(authContext);
  const [error, setError] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setError('');
    }, 5000);
    return () => clearTimeout(timer);
  }, [error]);

  const loginHandler = async (values, { setSubmitting }) => {
    const { error, result } = await client.logIn(values);
    setSubmitting(false);

    if (error) {
      setError(error.message);
      return;
    } else {
      const user = { ...result };
      auth.setAuthStatus(user);
      setLoggedIn(true);
    }
  };

  return (
    <FormContainer>
      <Heading>LOGIN</Heading>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={loginHandler}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email('This is not an valid email')
            .required('No email provided'),
          password: Yup.string()
            .required('No password provided')
            .min(3, 'Password needs 3 or more chars')
        })}
      >
        {props => {
          const { touched, errors, isSubmitting, handleSubmit } = props;

          return (
            <form onSubmit={handleSubmit}>
              <InputFieldHeader>
                <Label htmlFor="email">Email</Label>
                {errors.email && touched.email && (
                  <FormError>{errors.email}</FormError>
                )}
              </InputFieldHeader>
              <InputField
                id="email"
                name="email"
                placeholder="Enter your email"
                className={
                  errors.email && touched.email
                    ? 'text-input error'
                    : 'text-input'
                }
              />
              <InputFieldHeader>
                <Label htmlFor="password">Password</Label>
                {errors.password && touched.password && (
                  <FormError>{errors.password}</FormError>
                )}
              </InputFieldHeader>
              <InputField
                id="password"
                name="password"
                placeholder="Enter your password"
                type="password"
                className={
                  errors.password && touched.password
                    ? 'text-input error'
                    : 'text-input'
                }
              />

              <Button disabled={isSubmitting}>Login</Button>
              {error && <FormError>{error}</FormError>}
            </form>
          );
        }}
      </Formik>
    </FormContainer>
  );
};

export default Login;
