import axios from 'axios';
import { CREATE_USER, USER_ERROR_MESSAGE, SIGN_IN_USER, SIGN_OUT_USER } from '../actions/types';

export const createUser = (user) => dispatch => {
   axios
  .post('/users', user)
  .then(res => 
      dispatch({
         type: CREATE_USER,
         payload: res.data
      })
   )
   .catch(err => {
      console.log(err.response.data)
      if (err.response.status === 422) {
         dispatch({
            type: USER_ERROR_MESSAGE,
            payload: err.response.data.errors
         })
       }
   })
};

export const signInUser = (user) => dispatch => {
   axios
  .post('/users/sign_in', user)
  .then(res => 
      dispatch({
         type: SIGN_IN_USER,
         payload: res.data
      })
   )
   .catch(err => {
      console.log("error", err.response.data)
      if (err.response.status === 401) {
         dispatch({
            type: USER_ERROR_MESSAGE,
            payload: [{msg: 'Username or Password incorrect'}]
         })
       }
   })
};

export const signOut = () => dispatch => {
   axios
  .get('/users/sign_out')
  .then(res => 
      dispatch({
         type: SIGN_OUT_USER,
         payload: res.data
      })
   )
   .catch(err => {
      if (err.response.status === 401) {
         dispatch({
            type: USER_ERROR_MESSAGE,
            payload: err.response.data.errors
         })
       }
   })
};
