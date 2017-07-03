/**
 * Created by Philip
 *              on 2017-07-01.
 */
import React, {Component} from 'react';
import {fetchArtistReleases, loadingArtistReleases} from '../actions';
import {connect} from 'react-redux';

class SortReleases extends Component {
    constructor(props){
        super(props);
        this.state = {
            sortValue : this.props.sortValue
        };
        this.sortChanged = this.sortChanged.bind(this);
        this.ascChanged = this.ascChanged.bind(this);
    }

    sortChanged(event){
        this.setState({
            sortValue : event.target.value
        });
        let sortBy = event.target.value;
        sortBy = sortBy.toLowerCase();
        //get page
        const page = Number(document.querySelector('ul.pagination li.active a').innerHTML);
        const id = this.props.id;
        const asc = document.getElementById("ascDesc").checked;
        this.props.loadingArtistReleases();
        this.props.fetchArtistReleases(id, page, sortBy, asc);
    }

    ascChanged(event){
        let asc = event.target.checked;
        const id = this.props.id;
        const page = Number(document.querySelector('ul.pagination li.active a').innerHTML);

        this.props.loadingArtistReleases();
        this.props.fetchArtistReleases(id, page, this.state.sortValue.toLowerCase(), asc);
    }

    render(){
        let options = [];
        if(this.props.sortOptions !== null) {
            this.props.sortOptions.map((s) => {
                options.push(
                    <label className="radio-inline" key={s}>
                        <input type="radio"
                               onChange={this.sortChanged}
                               value={s}
                               name={this.props.sortName}
                               checked={s === this.state.sortValue}
                        />
                        {s}
                    </label>
                );
            });
        }

        return (
            <div className="d-inline d-inline-block">
                <label className="right-space">Sort By: </label>
                {options }
                <label className="checkbox-inline left-space">
                    <input type="checkbox"
                           onChange={this.ascChanged}
                           id="ascDesc"/>
                    Asc
                </label>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {info : state.searchByType};
}

export default connect(mapStateToProps, {fetchArtistReleases, loadingArtistReleases})(SortReleases);