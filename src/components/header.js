/**
 * @author Philip Van Raalte
 * @date 2017-06-10.
 *
 * The header component that displays navigation.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import ListItemLink from './list-item-link';

class Header extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="#">Music App</a>
                    </div>
                    <ul className={"nav navbar-nav"}>
                        <ListItemLink to="/" name="Home"/>
                    </ul>
                </div>
            </nav>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        state
    };
}

export default Header;