/**
 * @author Philip Van Raalte
 * @date 2017-06-10.
 *
 * The search component that allows the user to find a artist, release, etc.
 */
import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {fetchSearchResults, setSearch} from '../actions';

class RadioField extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <label className="radio-inline">
                <Field name={this.props.name} component="input" type="radio" value={this.props.value} />
                {this.props.title}
            </label>
        );
    }
}

class Search extends Component {
    constructor(props){
        super(props);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            submittingPost : false,
            results : {}
        };
    }

    renderField(field){
        //destructuring ES6
        const {meta : {touched, error}} = field;
        const className=`form-group ${touched && error ? 'has-error' : ''}`;
        return(
            <div className={className}>
                <label>{field.label}</label>
                <input
                    className="form-control"
                    {...field.input}
                />
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </div>
        );
    }

    renderSearchField(field){
        //destructuring ES6
        const {meta : {touched, error}} = field;
        const placeholder =  touched && error ? error : 'Search';
        return(
            <input
                className="form-control"
                type="text"
                value={field.value}
                placeholder={placeholder}
                aria-describedby="basic-addon1"
                {...field.input}
            />
        );
    }

    onSubmit(values){
        this.props.setSearch();
        this.props.fetchSearchResults(values);

        /*
         (response) => {
         console.log(response);
         console.log("Request URL", response.request.responseURL);
         this.setState({
         results : response.data.results,
         //submittingPost: false
         });
         console.log("props", this.props.search);
         }
         */
        //console.log("props", this.props.submittingPost);
    }

    render(){
        const {handleSubmit} = this.props;

        return(
            <form id="frmSearch" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <div className="input-group input-group-lg">
                    <Field
                     name="txtSearch"
                     component={this.renderSearchField}
                    />
                    <span className="input-group-btn" id="basic-addon1">
                        <button className="btn btn-primary" type="submit">
                            <span className="glyphicon glyphicon-search" aria-hidden="true"/>
                        </button>
                    </span>
                </div>
                <RadioField
                    name="searchOption"
                    title="All"
                    value=""
                />
                <RadioField
                    name="searchOption"
                    title="Artist"
                    value="artist"
                />
                <RadioField
                    name="searchOption"
                    title="Master"
                    value="master"
                />
                <RadioField
                    name="searchOption"
                    title="Release"
                    value="release"
                />
                <RadioField
                    name="searchOption"
                    title="Label"
                    value="label"
                />
            </form>
        );
    }
}

function validate(values) {
    const errors = {};
    //errors.title= "enter a title";
    if(!values.txtSearch){
        errors.txtSearch = "Search for an artist, master, release or label";
    }
    return errors;
}

function mapStateToProps(state) {
    return {submittingPost : state.searching};
}

export default reduxForm({
    validate,
    form: 'SearchForm',
    initialValues: {searchOption:""}
})(
    connect(mapStateToProps, {fetchSearchResults, setSearch})(Search)
);