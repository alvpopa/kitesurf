import React, { useContext, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { apiRequest } from '../utils/helpers';
import { authContext } from '../contexts/AuthContext';
const { REACT_APP_LOG_IN } = process.env;

const Login = () => {
  const auth = useContext(authContext);
  const [error, setError] = useState('');

  const loginHandler = async (values, { setSubmitting }) => {
    const bodyParams = { ...values };
    const resp = await apiRequest(REACT_APP_LOG_IN, 'POST', bodyParams);
    setSubmitting(false);

    const { error, result } = resp;

    if (error) {
      setError(error.message);
      return;
    } else {
      const user = { ...result };
      auth.setAuthStatus(user);
    }
  };

  return (
    <div className="app">
      <h1>LOGIN</h1>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={loginHandler}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email('This is not an valid email.')
            .required('No email provided.'),
          password: Yup.string()
            .required('No password provided.')
            .min(3, 'Password is too short - should be 3 chars minimum.')
        })}
      >
        {props => {
          const {
            values,
            touched,
            errors,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit
          } = props;

          return (
            <form onSubmit={handleSubmit}>
              <label htmlFor="email" style={{ display: 'block' }}>
                Email
              </label>
              <input
                id="email"
                placeholder="Enter your email"
                type="text"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.email && touched.email
                    ? 'text-input error'
                    : 'text-input'
                }
              />
              <label htmlFor="password" style={{ display: 'block' }}>
                Password
              </label>
              <input
                id="password"
                placeholder="Enter your password"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.password && touched.password
                    ? 'text-input error'
                    : 'text-input'
                }
              />

              {errors &&
                touched &&
                Object.entries(errors).map(([key, value]) => {
                  return (
                    touched[key] && (
                      <div key={key} className="input-feedback">
                        {value}
                      </div>
                    )
                  );
                })}

              <div className="buttonWrapper">
                <button type="submit" disabled={isSubmitting}>
                  Login
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

export default Login;
