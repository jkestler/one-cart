import uuid from 'uuid';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, EDIT_ITEM, UPDATE_ITEM } from '../actions/types';

const initialState = {
   items: [
      { id: uuid(), content: "Eggs"},
      { id: uuid(), content: "Steak"},
      { id: uuid(), content: "Potatoes"},
      { id: uuid(), content: "Apples"},
   ],
   isEditing: false
}

export default (state = initialState, action) => {
   switch(action.type) {
      case GET_ITEMS:
         return {
            ...state
         }
      case DELETE_ITEM:
         return {
            ...state,
            items: state.items.filter(item => item.id !== action.payload)
         }
      case ADD_ITEM:
         return {
            ...state,
            items: [action.payload, ...state.items]
         }
      case EDIT_ITEM:
         return {
            ...state,
            editItem: action.payload,
            isEditing: true 
         }
      case UPDATE_ITEM:
         const objIndex = state.items.findIndex(x => x.id === action.payload.id);
         return {
            ...state,
            editItem: '',
            isEditing: false,
            items: state.items.map((item , index) => index === objIndex ? action.payload : item)
         }
      default:
      return state;
   }
}