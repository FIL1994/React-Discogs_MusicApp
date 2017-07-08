/**
 * Reducer Index
 * @author Philip Van Raalte
 * @date 2017-06-10.
 *
 * Combines the reducers
 */
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