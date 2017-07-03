/**
 * Created by Philip
 *              on 2017-06-29.
 */
import React, {Component} from 'react';
import {fetchInfoByType} from '../../actions'
import {connect} from 'react-redux';
import LoadingCircle from '../loading-circle';

class Master extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        const {id} = this.props.match.params;
        this.props.fetchInfoByType(id, "master");
    }

    render(){
        const {id} = this.props.match.params;
        let info = this.props.info[id];
        const content = info === undefined ? <LoadingCircle/> :
            <div>
                <div className="jumbotron">
                    <h3 className="text-primary"><b><u>{
                        info.artists === undefined ? "" :
                            <span>
                                {info.artists.map(function (artist) {
                                    return <span key={artist.id}>{artist.name} </span>;
                                })}
                            </span>
                    } - {info.title}</u></b></h3>
                    <img src={info.images[0].uri} alt={info.name} height="300px" className="img-rounded"/>
                </div>
                <a href={info.uri} className="btn btn-success btn-sm">View on Discogs</a>
                <br/><br/>
                <div className="container-fluid text-left center-block">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="row">
                                <div className="col-md-3">
                                    <div className="panel panel-primary">
                                        <div className="panel-heading">Info</div>
                                        <div className="panel-body">
                                            <p>Year: {info.year}</p>
                                            <p>Genres:
                                                {
                                                    info.genres === undefined ? "" :
                                                        <span>
                                                            {
                                                                info.genres.map(function (g) {
                                                                    return <span key={g}>{g}</span>;
                                                                })
                                                            }
                                                        </span>
                                                }
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-9">
                                    <div className="panel panel-info">
                                        <div className="panel-heading">Tracklist</div>
                                        <div className="panel-body">
                                            {
                                                info.tracklist === undefined ? "" :
                                                    <ul className="list-group">
                                                        {
                                                            info.tracklist.map(function (track) {
                                                                return (
                                                                    <li className="list-group-item" key={track.position}>
                                                                        <p>{track.position}. {track.title}</p>
                                                                    </li>
                                                                );
                                                            })
                                                        }
                                                    </ul>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>;
        return(
            <div className="text-center center-block">
                {content}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {info : state.searchByType};
}

//searchByType
export default connect(mapStateToProps, {fetchInfoByType})(Master);