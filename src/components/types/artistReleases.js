/**
 * Created by Philip
 *              on 2017-06-29.
 */
import React, {Component} from 'react';
import {fetchArtistReleases, loadingArtistReleases} from '../../actions';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Pagination from '../pagination';
import SortReleases from '../sort-releases';
import LoadingCircle from '../loading-circle';

class ArtistReleases extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.loadingArtistReleases();
        const {id, page} = this.props.match.params;
        this.props.fetchArtistReleases(id, page);
    }

    render(){
        const {id, page} = this.props.match.params;
        let info = this.props.info;

        const content = info === undefined ? <LoadingCircle/> :
            <div>
                <div className="center-block text-center">
                    <SortReleases sortOptions={["Year", "Title", "Format"]} sortValue="Year" sortName="sortBy"
                        id={id} page={page}/>
                    {
                        info.pagination === undefined ? "" :
                            <Pagination id={id} current={info.pagination.page} total={info.pagination.pages}/>
                    }
                </div>
                {
                    info.loading || info.releases === undefined ? <LoadingCircle/> :
                        <ul className="list-group">
                        {
                            info.releases.map(function (release) {
                                return (
                                    <li key={release.id} className="list-group-item">
                                        <div className="media">
                                            <div className="media-left">
                                                <a href={release.resource_url}>
                                                    <img width="150px" className="media-object" src={release.thumb}
                                                         alt={release.title}/>
                                                </a>
                                            </div>
                                            <div className="media-body">
                                                <h4 className="media-heading text-primary">{release.title}</h4>
                                                <p className="text-muted">Type: {release.type}</p>
                                                <Link className="btn btn-primary btn-sm"
                                                      to={`/${release.type}/${release.id}`}>
                                                    More Info
                                                </Link>
                                            </div>
                                        </div>
                                    </li>
                                );
                            })
                        }
                        </ul>
                }
                {
                    info.pagination === undefined ? "" :
                        <Pagination id={id} current={info.pagination.page} total={info.pagination.pages}/>
                }
            </div>;

        return(
            <div className="">
                {content}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {info : state.searchByType};
}

//searchByType
export default connect(mapStateToProps, {fetchArtistReleases, loadingArtistReleases})(ArtistReleases);