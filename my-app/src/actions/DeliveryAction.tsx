import {
    LOGIN_DELIVERY_PERSON_FAIL,
    LOGIN_DELIVERY_PERSON_REQUEST,
    LOGIN_DELIVERY_PERSON_SUCCESS

} from '../constants/deliveryConstants'
import { Dispatch, AnyAction } from 'redux';
import axios from 'axios';
import api from '../api/Api';

export const deliveryPersonLogin = (deliveryPersonData: { email: string; password: string }) => 
    async (dispatch: Dispatch<AnyAction>) => {
      debugger
    try {
      dispatch({ type: LOGIN_DELIVERY_PERSON_REQUEST });
      console.log('deli 003')
  
      const { data } = await api.post("http://localhost:5000/api/deliveryperson/login", deliveryPersonData);
  
      console.log(data.token, "Token");
      console.log(data.deliveryPerson, "Delivery Person Info");
  
      localStorage.setItem('deliveryPersonId', data.deliveryPerson._id);
      localStorage.setItem('deliveryPersonToken', data.token);
  
      dispatch({
        type: LOGIN_DELIVERY_PERSON_SUCCESS,
        payload: {
          user: data.deliveryPerson,
          token: data.token,
        },
      });
  
      return data.deliveryPerson;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        dispatch({
          type: LOGIN_DELIVERY_PERSON_FAIL,
          payload: error.response?.data.message || 'An error occurred',
        });
      } else {
        dispatch({
          type: LOGIN_DELIVERY_PERSON_FAIL,
          payload: 'An unknown error occurred',
        });
      }
    }
  };