/**
 * @author Philip Van Raalte
 * @date 2017-06-10.
 *
 * Handles searching for items and letting the application know when it is loading results.
 */
import _ from 'lodash';
import {FETCH_SEARCH_RESULTS, MODIFY_SEARCHING} from '../actions';

export default function (state = {}, action) {
    switch(action.type){
        case FETCH_SEARCH_RESULTS:
            return _.assign(_.mapKeys(action.payload.data, 'id'), {loading : false});
        case MODIFY_SEARCHING:
            return {loading : true};
        default:
            return state;
    }
}