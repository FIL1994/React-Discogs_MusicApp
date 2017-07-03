/**
 * Created by Philip
 *              on 2017-06-10.
 */
import _ from 'lodash';
import {MODIFY_SEARCHING_ARTIST_RELEASES} from '../actions';

export default function (state = {}, action) {
    switch(action.type){
        case MODIFY_SEARCHING_ARTIST_RELEASES:
            return action.payload;
        default:
            return state;
    }
}