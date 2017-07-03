/**
 * Created by Philip
 *              on 2017-06-29.
 */
import {FETCH_TYPE_INFO, FETCH_ARTIST_RELEASES, LOADING_ARTIST_RELEASES} from '../actions';

export default function (state = {}, action) {
    switch(action.type){
        case FETCH_TYPE_INFO:
            return {...state, [action.payload.data.id] : action.payload.data};
        case FETCH_ARTIST_RELEASES:
            return _.assign(action.payload.data, {loading : false});
        case LOADING_ARTIST_RELEASES:
            //keep pagination if it was loaded
            return {loading: true, pagination: state.pagination || undefined};
        default:
            return state;
    }
}