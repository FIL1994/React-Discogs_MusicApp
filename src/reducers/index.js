//Reducer Index
import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';
import SearchReducer from './reducer_search';
import SearchingReducer from './reducer_searching';
import TypeReducer from './reducer_type';

const rootReducer = combineReducers({
  state: (state = {}) => state,
  form: formReducer,
  searchResults: SearchReducer,
  searching: SearchingReducer,
  searchByType: TypeReducer
});

export default rootReducer;