/**
 * @author Philip Van Raalte
 * @date 2017-06-10.
 *
 * Displays the search results to the user.
 */
import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import LoadingCircle from './loading-circle';
import {Link} from 'react-router-dom';

class SearchResults extends Component {
    constructor(props){
        super(props);
        this.state = {
            results : {}
        };
    }
    renderResults(){
        //console.log(this.props.results);

        return _.map(this.props.results.undefined, result => {
            //console.log(result);
            return(
               <li className="list-group-item" key={result.id}>
                   <div className="media">
                       <div className="media-left">
                           <a href={result.resource_url}>
                               <img width="150px" className="media-object" src={result.thumb} alt={result.title} />
                           </a>
                       </div>
                       <div className="media-body">
                           <h4 className="media-heading text-primary">{result.title}</h4>
                           <p className="text-muted">Type: {result.type}</p>
                           <Link className="btn btn-primary btn-sm" to={`${result.type}/${result.id}`}>More Info</Link>
                       </div>
                   </div>
               </li>
            );
        });
    }

    render(){
        let isLoading;
        try {
            isLoading = this.props.results.loading === true ?
                <LoadingCircle/> : <ul className="list-group">{this.renderResults()}</ul>;
        } catch(e){}
        return(
            <div>
                {isLoading}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        results : state.searchResults
    };
}

export default connect(mapStateToProps)(SearchResults);