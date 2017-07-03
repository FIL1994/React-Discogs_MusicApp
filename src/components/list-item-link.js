/**
 * Created by Philip
 *              on 2017-06-10.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavLink, Route, withRouter} from 'react-router-dom';
//using withRouter calls render when the route is changed so the ListItemLinks work

class ListItemLink extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <Route path={this.props.to} children={({match}) => (
                <li className={match && match.isExact ? 'active' : ''}>
                    <NavLink exact to={this.props.to}>{this.props.name}</NavLink>
                </li>
            )}/>
        );
    }
}

ListItemLink.contextTypes = {
    router: React.PropTypes.object
};

function mapStateToProps(state, ownProps) {
    return {
        state
    };
}

export default withRouter((connect(null, mapStateToProps)(ListItemLink)));