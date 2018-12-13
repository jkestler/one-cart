import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, EDIT_ITEM, UPDATE_ITEM } from '../actions/types';

export const getItems = () => {
   return {
      type: GET_ITEMS
   }
};

export const deleteItem = (id) => {
   return {
      type: DELETE_ITEM,
      payload: id
   }
};

export const addItem = (item) => {
   return {
      type: ADD_ITEM,
      payload: item
   }
};

export const editItem = (editItem) => {
   return {
      type: EDIT_ITEM,
      payload: editItem
   }
};

export const updateItem = (updatedItem) => {
   return {
      type: UPDATE_ITEM,
      payload: updatedItem
   }
};