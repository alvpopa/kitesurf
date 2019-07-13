import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import {
  Button,
  FilterContainer,
  FormError,
  InputField,
  InputFieldHeader,
  Label
} from '../components';

const Filter = ({
  client,
  filterValues,
  layer,
  setFilterValues,
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

  const filterHandler = async (values, { setSubmitting }) => {
    //if filters didn't change, spare an extra api call
    if (JSON.stringify(values) === JSON.stringify(filterValues)) {
      setSubmitting(false);
      return;
    }

    const bodyParams = { ...values };
    const { error, result } = await client.getSpots(bodyParams);
    setSubmitting(false);

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
          const { errors, handleSubmit, isSubmitting, touched } = props;

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
