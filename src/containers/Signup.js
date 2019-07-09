import React, { useContext, useState } from 'react';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';

import { apiRequest } from '../utils/helpers';
import { authContext } from '../contexts/AuthContext';
const { REACT_APP_SIGN_UP } = process.env;

const Signup = ({ setLoggedIn }) => {
  const auth = useContext(authContext);
  const [error, setError] = useState('');

  const signupHandler = async (values, { setSubmitting }) => {
    const { passwordConfirmation, ...bodyParams } = values;
    const resp = await apiRequest(REACT_APP_SIGN_UP, 'POST', bodyParams);
    setSubmitting(false);

    const { error, result } = resp;

    if (error) {
      return setError(error.message);
    } else {
      const user = { ...result };
      auth.setAuthStatus(user);
      setLoggedIn(true);
    }
  };

  return (
    <div className="app">
      <h1>SIGNUP</h1>
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
              <label htmlFor="email" style={{ display: 'block' }}>
                Email
              </label>
              {errors.email && touched.email && (
                <div className="input-feedback">{errors.email}</div>
              )}
              <Field
                id="email"
                name="email"
                placeholder="Enter your email"
                className={
                  errors.email && touched.email
                    ? 'text-input error'
                    : 'text-input'
                }
              />
              <label htmlFor="password" style={{ display: 'block' }}>
                Password
              </label>
              {errors.password && touched.password && (
                <div className="input-feedback">{errors.password}</div>
              )}
              <Field
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
              <label
                htmlFor="passwordConfirmation"
                style={{ display: 'block' }}
              >
                Password confirmation
              </label>
              {errors.passwordConfirmation && touched.passwordConfirmation && (
                <div className="input-feedback">
                  {errors.passwordConfirmation}
                </div>
              )}
              <Field
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
                <button type="submit" disabled={isSubmitting}>
                  Signup
                </button>
                {error && <div className="input-feedback">{error}</div>}
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Signup;
