//actions.js
import axios from 'axios';
import {urlApi} from '../utils/definition';
import {GET_PROFILES, GET_TABLES} from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getProfile =  () => {
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
      console.log('error', error);
    }
  };
};

export const getTables =  () => {
  return async function (dispatch) {
    const token = await AsyncStorage.getItem('accessTokenProfile');
   console.log("token" ,token);
    try {
      const apiData = await axios.get(`${urlApi}/tables`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("apiData TABLES",apiData.data);
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

