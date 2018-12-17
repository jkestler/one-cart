import axios from 'axios';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, EDIT_ITEM, UPDATE_ITEM, ITEMS_LOADING, PURCHASE_ITEM, ITEM_ERROR_MESSAGE } from '../actions/types';

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

export const AddItem = (socket, item) => dispatch => {
   axios
  .post('/item/create', item)
  .then(res => 
      socket.emit('addItem', res.data)
   )
   .catch(err => {
      if (err.response.status === 422) {
         dispatch({
            type: ITEM_ERROR_MESSAGE,
            payload: err.response.data.errors
         })
       }
   })
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

export const UpdateItem = (socket, updatedItem) => dispatch => {
   axios
   .post(`/item/${updatedItem.id}/update`, updatedItem)
   .then(res => 
      socket.emit('updateItem', res.data)
   )
   .catch(err => {
      if (err.response.status === 422) {
         dispatch({
            type: ITEM_ERROR_MESSAGE,
            payload: err.response.data.errors
         })
       }
   })
};

export const setItemsLoading = () => {
   return {
      type: ITEMS_LOADING
   }
};

export const setItemPurchase = (socket, id, purchaseStatus) => dispatch => {
   axios
   .post(`/item/${id}/purchase`, {isPurchased: !purchaseStatus})
   .then(res => 
      socket.emit('setPurchase', id) 
   )
};

export const addItemSocket = (item) => {
   return (dispatch) => {
      dispatch({
         type: ADD_ITEM,
         payload: item
      })
	}
};

export const deleteItemSocket = (socket, id) => {
   return (dispatch) => {
      socket.emit('deleteItem', id)
	}
};

export const updateItemSocket = (updatedItem) => {
   return (dispatch) => {
      dispatch({
         type: UPDATE_ITEM,
         payload: updatedItem
      })
	}
};

export const setItemPurchaseSocket = (purchaseStatus) => {
   return (dispatch) => {
      dispatch({
         type: PURCHASE_ITEM,
         payload: purchaseStatus
      })   
   }
};

