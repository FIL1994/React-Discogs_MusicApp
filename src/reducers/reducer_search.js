/**
 * Created by Philip
 *              on 2017-06-10.
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