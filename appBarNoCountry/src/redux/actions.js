//actions.js
import axios from 'axios';
import {urlApi} from '../utils/definition';
import {GET_PROFILES} from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';



//products
// export const getProducts = () => {
//   return async function (dispatch) {
//     const apiData = await axios.get(`${apiUrl}/product`);
//     const product = apiData.data;
//     return dispatch({
//       type: GET_PRODUCTS,
//       payload: product,
//     });
//   };
// };
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

