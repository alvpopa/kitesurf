import React, { useContext, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import {
  Button,
  Fieldset,
  FormError,
  InputField,
  InputFieldHeader,
  Label,
  PopupContainer,
  Select
} from '../components';

import { authContext } from '../contexts/AuthContext';
import { apiRequest } from '../utils/helpers';
import { calendarMonths } from '../utils/constants';
const {
  REACT_APP_ADD_SPOT,
  REACT_APP_ADD_FAVORITE_SPOT,
  REACT_APP_REMOVE_FAVORITE_SPOT,
  REACT_APP_REMOVE_SPOT
} = process.env;

const Popup = ({ layer, marker, setIsPopupOpen, setApiError, setSpots }) => {
  const {
    id = '',
    country = '',
    latitude = '',
    longitude = '',
    name = '',
    whenToGo = 'January',
    windProbability = '',
    isFavorite = '',
    isPersonal = ''
  } = marker;

  const {
    auth: { token }
  } = useContext(authContext);

  const [favorite, setFavorite] = useState(isFavorite);

  const isDisabled = name ? true : false;

  const toggleFavorite = async event => {
    const bodyParams = { spotId: id };
    const apiMethod = event.currentTarget.className.includes('fas')
      ? REACT_APP_REMOVE_FAVORITE_SPOT
      : REACT_APP_ADD_FAVORITE_SPOT;

    const resp = await apiRequest(apiMethod, 'POST', bodyParams, token);

    const { error, result } = resp;

    if (error) {
      setApiError(error.message);
      return;
    } else {
      const spot = { ...marker, isFavorite: !favorite };
      setSpots(spots => {
        const filteredSpots = spots.filter(spot => spot.id !== result);
        return [...filteredSpots, spot];
      });
      setFavorite(favorite => !favorite);
    }
  };

  const deleteSpot = async () => {
    const bodyParams = { spotId: id };

    const resp = await apiRequest(
      REACT_APP_REMOVE_SPOT,
      'POST',
      bodyParams,
      token
    );

    const { error, result } = resp;

    if (error) {
      setApiError(error.message);
      return;
    } else {
      setSpots(spots => spots.filter(spot => spot.id !== result));
      setIsPopupOpen(false);
      layer.clearLayers();
    }
  };

  const addNewSpot = async (values, { setSubmitting }) => {
    const bodyParams = { ...values, latitude, longitude };
    const resp = await apiRequest(
      REACT_APP_ADD_SPOT,
      'POST',
      bodyParams,
      token
    );
    setSubmitting(false);

    const { error, result } = resp;

    if (error) {
      setApiError(error.message);
      return;
    } else {
      const spot = { ...result };
      setSpots(spots => {
        const newSpots = [...spots, spot];
        return newSpots;
      });
      setIsPopupOpen(false);
    }
  };

  return (
    <PopupContainer>
      <Fieldset disabled={isDisabled}>
        <Formik
          initialValues={{ name, country, whenToGo, windProbability }}
          onSubmit={addNewSpot}
          enableReinitialize
          validationSchema={Yup.object().shape({
            name: Yup.string().required('required'),
            country: Yup.string().required('required'),
            whenToGo: Yup.string().required('required'),
            windProbability: Yup.number()
              .required('required')
              .min(0, '>0')
              .max(100, '<100')
          })}
        >
          {props => {
            const {
              handleChange,
              handleBlur,
              values,
              touched,
              errors,
              isSubmitting,
              handleSubmit
            } = props;

            return (
              <form onSubmit={handleSubmit}>
                <i
                  onClick={toggleFavorite}
                  className={favorite ? 'fas fa-heart' : 'far fa-heart'}
                />
                {isPersonal && (
                  <i onClick={deleteSpot} className="fas fa-trash" />
                )}

                <InputFieldHeader>
                  <Label htmlFor="email">Name</Label>
                  {errors.name && touched.name && (
                    <FormError>{errors.name}</FormError>
                  )}
                </InputFieldHeader>
                <InputField
                  id="name"
                  name="name"
                  placeholder="Enter a location name"
                  className={
                    errors.name && touched.name
                      ? 'text-input error'
                      : 'text-input'
                  }
                />
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
                  <Label htmlFor="whenToGo">When to go</Label>
                  {errors.whenToGo && touched.whenToGo && (
                    <FormError>{errors.whenToGo}</FormError>
                  )}
                </InputFieldHeader>
                <Select
                  name="whenToGo"
                  id="whenToGo"
                  value={values.whenToGo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.whenToGo && touched.whenToGo
                      ? 'text-input error'
                      : 'text-input'
                  }
                >
                  {calendarMonths.map(({ label, value }, index) => (
                    <option key={index} value={value} label={label} />
                  ))}
                </Select>
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

                {!isDisabled && (
                  <Button scaled={true} disabled={isSubmitting}>
                    Submit
                  </Button>
                )}
              </form>
            );
          }}
        </Formik>
      </Fieldset>
      <Button onClick={() => setIsPopupOpen(isp => !isp)} scaled={true}>
        Close
      </Button>
    </PopupContainer>
  );
};

export default Popup;
