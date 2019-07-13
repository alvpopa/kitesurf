import React, { useContext, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { authContext } from '../contexts/AuthContext';
import {
  Button,
  FormContainer,
  FormError,
  InputField,
  InputFieldHeader,
  Label,
  Logo
} from '../components';

const Signup = ({ client, setLoggedIn }) => {
  const auth = useContext(authContext);
  const [error, setError] = useState('');

  const signupHandler = async (values, { setSubmitting }) => {
    const { passwordConfirmation, ...bodyParams } = values;
    const { error, result } = await client.signUp(bodyParams);
    setSubmitting(false);

    if (error) {
      return setError(error.message);
    } else {
      auth.setAuthStatus(result);
      setLoggedIn(true);
    }
  };

  return (
    <FormContainer>
      <Logo>Kite</Logo>
      <Formik
        initialValues={{ email: '', password: '', passwordConfirmation: '' }}
        onSubmit={signupHandler}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email('This is not an valid email.')
            .required('No email provided.'),
          password: Yup.string()
            .required('No password provided.')
            .min(3, 'Password is too short - should be 3 chars minimum.'),
          passwordConfirmation: Yup.string().oneOf(
            [Yup.ref('password'), null],
            'Passwords must match'
          )
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
              <InputFieldHeader>
                <Label htmlFor="passwordConfirmation">
                  Password confirmation
                </Label>
                {errors.passwordConfirmation &&
                  touched.passwordConfirmation && (
                    <FormError>{errors.passwordConfirmation}</FormError>
                  )}
              </InputFieldHeader>
              <InputField
                id="passwordConfirmation"
                name="passwordConfirmation"
                placeholder="Enter your password again"
                type="password"
                className={
                  errors.passwordConfirmation && touched.passwordConfirmation
                    ? 'text-input error'
                    : 'text-input'
                }
              />

              <div className="buttonWrapper">
                <Button type="submit" disabled={isSubmitting}>
                  Signup
                </Button>
                {error && <FormError>{error}</FormError>}
              </div>
            </form>
          );
        }}
      </Formik>
    </FormContainer>
  );
};

export default Signup;
