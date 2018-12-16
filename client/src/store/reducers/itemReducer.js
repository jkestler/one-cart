import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, EDIT_ITEM, UPDATE_ITEM, ITEMS_LOADING, PURCHASE_ITEM, ERROR_MESSAGE } from '../actions/types';

const initialState = {
   items: [],
   isEditing: false,
   loading: false,
   editItem: '',
   error: ''
}

export default (state = initialState, action) => {
   switch(action.type) {
      case GET_ITEMS:
         return {
            ...state,
            items: action.payload,
            loading: false
         }
      case DELETE_ITEM:
         return {
            ...state,
            items: state.items.filter(item => item.id !== action.payload)
         }
      case ADD_ITEM:
         return {
            ...state,
            items: [action.payload, ...state.items],
            error: ''
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
            items: state.items.map((item , index) => index === objIndex ? action.payload : item),
            error: ''
         }
      case ITEMS_LOADING:
         return {
            ...state,
            loading: true
         }
      case PURCHASE_ITEM:
         const purchaseIndex = state.items.findIndex(x => x.id === action.payload);
         return {
            ...state,
            items: state.items.map((item , index) => index === purchaseIndex ? {...item, isPurchased: !item.isPurchased} : item)
         }
      case ERROR_MESSAGE:
         return {
            ...state,
            error: action.payload
         }
      default:
      return state;
   }
}