import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import {
  Button,
  Fieldset,
  Footer,
  FormError,
  I,
  InputField,
  InputFieldHeader,
  Label,
  PopupContainer,
  Select
} from '../components';

import { calendarMonths } from '../utils/constants';

const Popup = ({
  client,
  layer,
  marker,
  setIsPopupOpen,
  setApiError,
  setSpots
}) => {
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

  const [favorite, setFavorite] = useState(isFavorite);

  const isDisabled = name ? true : false;

  const toggleFavorite = async event => {
    const bodyParams = { spotId: id };
    const { error, result } = await client.toggleFavorite(event, bodyParams);

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
    const { error, result } = await client.deleteSpot(bodyParams);

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
    const { error, result } = await client.addSpot(bodyParams);
    setSubmitting(false);

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
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}
                >
                  {!isDisabled && (
                    <I onClick={handleSubmit} className="fas fa-plus-circle">
                      add spot
                    </I>
                  )}
                  {isPersonal && (
                    <I
                      onClick={deleteSpot}
                      className="fas fa-trash"
                      isDelete={true}
                    />
                  )}
                  <I
                    isClose={true}
                    onClick={() => setIsPopupOpen(isp => !isp)}
                    className="fas fa-times-circle"
                  />
                </div>
                <InputFieldHeader>
                  <Label htmlFor="email">Name</Label>
                  {errors.name && touched.name && (
                    <FormError>{errors.name}</FormError>
                  )}
                </InputFieldHeader>
                <InputField
                  id="name"
                  name="name"
                  placeholder="Spot name"
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
                  placeholder="Country name"
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
                  placeholder="Wind probability"
                  type="number"
                  className={
                    errors.windProbability && touched.windProbability
                      ? 'text-input error'
                      : 'text-input'
                  }
                />
              </form>
            );
          }}
        </Formik>
      </Fieldset>
      <Footer isFavorite={favorite} onClick={toggleFavorite}>
        {favorite ? '- remove from favorites' : '+ add to favorites'}
      </Footer>
    </PopupContainer>
  );
};

export default Popup;
