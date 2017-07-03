/**
 * Created by Philip
 *              on 2017-06-10.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import Search from './search';
import SearchResults from "./search-results";

class Home extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <div className="text-center">
                    <h2>Search Discogs</h2>
                    <Search/>
                    <hr/>
                </div>
                <SearchResults/>
            </div>
        );
    }
}

export default Home;