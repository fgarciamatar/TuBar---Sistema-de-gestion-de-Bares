//actions.js
import axios from 'axios';
import {urlApi} from '../utils/definition';
import {
  GET_PROFILES,
  GET_TABLES,
  GET_CATEGORIES,
  GET_PRODUCTS,
  SELECTED_PRODUCTS,
  SHOW_LOADER,
  HIDE_LOADER,
} from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const showLoaderGlobal = () => ({
  type: SHOW_LOADER,
});

export const hideLoaderGlobal = () => ({
  type: HIDE_LOADER,
});

export const getProfile = () => {
  return async function (dispatch) {
    const token = await AsyncStorage.getItem('accessToken');

    try {
      const apiData = await axios.get(`${urlApi}/profiles`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("apiData",apiData.data);
      const profiles = apiData.data;
      return dispatch({
        type: GET_PROFILES,
        payload: profiles,
      });
    } catch (error) {
      console.log('error', error.response.data.message);
    }
  };
};

export const getTables = () => {
  return async function (dispatch) {
    const token = await AsyncStorage.getItem('accessTokenProfile');
    //  console.log("token" ,token);
    try {
      const apiData = await axios.get(`${urlApi}/tables`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log('apiData TABLES', apiData.data);
      const tables = apiData.data;
      return dispatch({
        type: GET_TABLES,
        payload: tables,
      });
    } catch (error) {
      console.log('error', error);
    }
  };
};

export const getCategories = () => {
  return async function (dispatch) {
    const token = await AsyncStorage.getItem('accessTokenProfile');

    try {
      const apiCategorias = await axios.get(`${urlApi}/product-categories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const {categories} = apiCategorias.data;
      return dispatch({
        type: GET_CATEGORIES,
        payload: categories,
      });
    } catch (error) {
      console.log('error Categories', error);
    }
  };
};

export const getProducts = () => {
  return async function (dispatch) {
    const token = await AsyncStorage.getItem('accessTokenProfile');
    try {
      const apiData = await axios.get(`${urlApi}/products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const products = apiData.data;
      // console.log("apiData products",apiData.data);
      return dispatch({
        type: GET_PRODUCTS,
        payload: products,
      });
    } catch (error) {
      console.log('error Products', error);
    }
  };
};

export const selectedProducts = productosSeleccionados => {
  // console.log(productosSeleccionados);
  return {
    type: SELECTED_PRODUCTS,
    payload: productosSeleccionados,
  };
};
