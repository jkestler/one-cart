import axios from 'axios';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, EDIT_ITEM, UPDATE_ITEM, ITEMS_LOADING, PURCHASE_ITEM } from '../actions/types';

export const getItems = () => dispatch => {
   dispatch(setItemsLoading());
   axios
   .get('/items')
   .then(res => 
      dispatch ({
         type: GET_ITEMS,
         payload: res.data
      })
   )
};

export const addItem = (item) => dispatch => {
   axios
  .post('/item/create', item)
  .then(res => 
      dispatch({
         type: ADD_ITEM,
         payload: res.data
      })
   )
};

export const deleteItem = (id) => dispatch => {
  axios.delete(`/item/${id}`).then(res => 
   dispatch({
      type: DELETE_ITEM,
      payload: id
   })
  )
};

export const editItem = (editItem) => dispatch => {
   axios
   .get(`/item/${editItem.id}/edit`)
   .then(res => 
      dispatch({
         type: EDIT_ITEM,
         payload: res.data
      })
   )
};

export const updateItem = (updatedItem) => dispatch => {
   console.log("Update item", updatedItem)
   axios
   .post(`/item/${updatedItem.id}/update`, updatedItem)
   .then(res => 
      dispatch({
         type: UPDATE_ITEM,
         payload: res.data
      })
   )
};

export const setItemsLoading = () => {
   return {
      type: ITEMS_LOADING
   }
};

export const setItemPurchase = (id, purchaseStatus) => dispatch => {
   console.log("Hello", id, purchaseStatus)
   axios
   .post(`/item/${id}/purchase`, {isPurchased: !purchaseStatus})
   .then(res => 
      dispatch({
         type: PURCHASE_ITEM,
         payload: id
      })   
   )
};
