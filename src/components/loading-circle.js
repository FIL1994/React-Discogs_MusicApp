/**
 * @author Philip Van Raalte
 * @date 2017-06-10.
 *
 * Lets the user know that something is loading.
 */
import React, {Component} from 'react';

class LoadingCircle extends Component {
    render(){
        return(
            <div className="center-block loader"/>
        );
    }
}

export default LoadingCircle;