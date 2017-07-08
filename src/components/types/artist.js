/**
 * @author Philip Van Raalte
 * @date 2017-06-29.
 */
import React, {Component} from 'react';
import {fetchInfoByType} from '../../actions';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import LoadingCircle from '../loading-circle';

class Artist extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        const {id} = this.props.match.params;
        this.props.fetchInfoByType(id, "artist");
    }

    render(){
        const {id} = this.props.match.params;
        let info = this.props.info[id];
        const content = info === undefined ? <LoadingCircle/> :
            <div>
                <div className="jumbotron">
                    <h3 className="text-primary"><b><u>{info.name}</u></b></h3>
                    <img src={info.images[0].uri} alt={info.name} height="300px" className="img-rounded"/>
                </div>
                <div className="btn-group" role="group">
                    <a href={info.uri} className="btn btn-success btn-sm">View on Discogs</a>
                    <Link className="btn btn-primary btn-sm" to={`../artistReleases/${info.id}`}>
                        View Releases
                    </Link>
                </div>
                <br/><br/>
                <div className="container-fluid text-left center-block">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="row">
                                {
                                    info.members === undefined ? "" :
                                    <div className="col-md-3">
                                        <div className="panel panel-primary">
                                            <div className="panel-heading">Members</div>
                                            <div className="panel-body">
                                                {
                                                    info.members.map(function (m) {
                                                        if (m.active)
                                                            return <p key={m.id}>{m.name}</p>;
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                }
                                <div className="col-md-9">
                                    <div className="panel panel-info">
                                        <div className="panel-heading">Profile</div>
                                        <div className="panel-body">
                                            <p>{info.profile}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="panel panel-default">
                                        <div className="panel-heading">Links</div>
                                        <div className="panel-body">
                                            {
                                                info.urls === undefined ? "" :
                                                info.urls.map(function (u) {
                                                        return (
                                                            <a href={u} key={u}>{u}<br/></a>
                                                        );
                                                })
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
export default connect(mapStateToProps, {fetchInfoByType})(Artist);