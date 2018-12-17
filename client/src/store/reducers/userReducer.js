import { CREATE_USER, SIGN_IN_USER, USER_ERROR_MESSAGE, SIGN_OUT_USER } from '../actions/types';

const initialState = {
   userError: ''
}

export default (state = initialState, action) => {
   switch(action.type) {
      case CREATE_USER:
         return {
            ...state,
            user: action.payload,
            userError: ''
         }
      case SIGN_IN_USER:
         return {
            ...state,
            user: action.payload,
            userError: ''
         }
      case SIGN_OUT_USER:
         return {
            ...state,
            user: '',
            userError: ''
         }
      case USER_ERROR_MESSAGE:
         return {
            ...state,
            userError: action.payload
         }
      default:
      return state;
   }
}