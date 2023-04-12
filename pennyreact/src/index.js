//----------------------------------------------------------------------
// index.js
// Author: Aetizaz Sameer, Andrew Hwang, Tyler Vu
//----------------------------------------------------------------------

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Landing from './landing';
import Admin from './admin';
import Researcher from './researcher';
import Participant from './participant';

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/index" component={Landing} />
            <Route exact path="/admin" component={Admin} />
            <Route exact path="/researcher" component={Researcher} />
            <Route exact path="/participant" component={Participant} />
        </Switch>
    </BrowserRouter>,
    document.getElementById('root')
);
