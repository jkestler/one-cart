import { combineReducers } from 'redux';
import itemReducer from './itemReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
   user: userReducer,
   item: itemReducer
})

export default rootReducer;