import React, { useContext, useEffect, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { apiRequest } from '../utils/helpers';
import { authContext } from '../contexts/AuthContext';

import {
  Button,
  FilterContainer,
  FormError,
  InputField,
  InputFieldHeader,
  Label
} from '../components';

const { REACT_APP_GET_ALL_SPOTS } = process.env;

const Filter = ({
  filterValues,
  setFilterValues,
  layer,
  setApiError,
  setSpots
}) => {
  const { country = '', windProbability = 0 } = filterValues;

  const [error, setError] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setError('');
    }, 5000);
    return () => clearTimeout(timer);
  }, [error]);

  const {
    auth: { token }
  } = useContext(authContext);

  const filterHandler = async (values, { setSubmitting }) => {
    if (JSON.stringify(values) === JSON.stringify(filterValues)) {
      setSubmitting(false);
      return;
    }

    const bodyParams = { ...values };
    const resp = await apiRequest(
      REACT_APP_GET_ALL_SPOTS,
      'POST',
      bodyParams,
      token
    );
    setSubmitting(false);

    const { error, result } = resp;
    if (error) {
      setApiError(error.message);
      return;
    } else if (result.length === 0) {
      setApiError(`No spots with filters ${JSON.stringify(bodyParams)} found.`);
    } else {
      layer.clearLayers();
      setSpots(result);
      setFilterValues({ ...values });
    }
  };

  return (
    <FilterContainer>
      <Formik
        initialValues={{ country, windProbability }}
        onSubmit={filterHandler}
        enableReinitialize
        validationSchema={Yup.object().shape({
          country: Yup.string(),
          windProbability: Yup.number()
            .min(0, '>0')
            .max(100, '<100')
            .default(0)
        })}
      >
        {props => {
          const { touched, errors, isSubmitting, handleSubmit } = props;

          return (
            <form onSubmit={handleSubmit}>
              <InputFieldHeader>
                <Label htmlFor="country">Country</Label>
                {errors.country && touched.country && (
                  <FormError>{errors.country}</FormError>
                )}
              </InputFieldHeader>
              <InputField
                id="country"
                name="country"
                placeholder="Enter your country"
                type="text"
                className={
                  errors.country && touched.country
                    ? 'text-input error'
                    : 'text-input'
                }
              />
              <InputFieldHeader>
                <Label htmlFor="windProbability">Wind probability</Label>
                {errors.windProbability && touched.windProbability && (
                  <FormError>{errors.windProbability}</FormError>
                )}
              </InputFieldHeader>
              <InputField
                id="windProbability"
                name="windProbability"
                placeholder="Enter wind probability"
                type="number"
                className={
                  errors.windProbability && touched.windProbability
                    ? 'text-input error'
                    : 'text-input'
                }
              />

              <Button scaled={true} disabled={isSubmitting}>
                Submit
              </Button>
            </form>
          );
        }}
      </Formik>
      {error && <FormError>{error}</FormError>}
    </FilterContainer>
  );
};

export default Filter;
