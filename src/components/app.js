import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Header from './header';
import Home from './home';
import Artist from './types/artist';
import Release from './types/release';
import Master from './types/master';
import Label from './types/label';
import ArtistReleases from './types/artistReleases';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
          <div>
            <Header/>
            <section className="container">
              <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/artist/:id" component={Artist}/>
                {/*path="/artist/:id?" --> make param optional*/}
                <Route path="/release/:id" component={Release}/>
                <Route path="/label/:id" component={Label}/>
                <Route path="/master/:id" component={Master}/>
                <Route path="/artistReleases/:id/:page?" component={ArtistReleases}/>
              </Switch>
            </section>
          </div>
      </BrowserRouter>
    );
  }
}