/**
 * Created by Philip
 *              on 2017-07-01.
 */
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {fetchArtistReleases, loadingArtistReleases} from '../actions';
import {connect} from 'react-redux';
import { browserHistory } from 'react-router';

class Pagination extends Component {
    constructor(props){
        super(props);
        this.onPageClick = this.onPageClick.bind(this);
    }

    onPageClick(event, p){
        const id = this.props.id;
        const sortByRadios = document.getElementsByName("sortBy");
        let sortBy = null;
        for (let i = 0; i < sortByRadios.length; i++) {
            if(sortByRadios[i].checked){
                sortBy = sortByRadios[i].value;
                break;
            }
        }
        this.props.loadingArtistReleases();
        this.props.fetchArtistReleases(id, Number(p), sortBy.toLowerCase());
        event.preventDefault();
    }

    render(){
        const current = Number(this.props.current);
        const total = Number(this.props.total);
        const pages = [...new Array(total).keys()].map(x => ++x);
        const id = this.props.id;
        const context = this;

        const pageList = pages.map(function (p) {
           return(
             <li key={p} className={p === current ? "active" : ""}>
                 <Link to={`/artistReleases/${id}/${p}`}
                       onClick={(event) => {
                           event.preventDefault();
                           browserHistory.push(`/artistReleases/${id}/${p}`);
                           if(p !== current)
                            context.onPageClick(event, p);
                       }}>{p}</Link>
             </li>
           );
        });

        return(
            <ul className="pagination pagination-sm">
                {pageList}
            </ul>
        );
    }
}

function mapStateToProps(state) {
    return {info : state.searchByType};
}

export default connect(null, {fetchArtistReleases, loadingArtistReleases})(Pagination);