
import React from 'react';
import { Route, Switch } from 'react-router-dom'
import { PropTypes } from 'prop-types';
import { v4 } from 'uuid';

import './App.css';

import {Color, Colors, NewColor} from './containers/containers';
import Menu from "./Menu";

const App = () =>
    <Switch>
        <Route exact path="/:id" component={Color} />
        <Route path="/"
               component={() => (
                   <div className="app">
                       <Route component={Menu} />
                       <NewColor />
                       <Switch>
                           <Route exact path="/" component={Colors} />
                           <Route path="/sort/:sort" component={Colors} />
                       </Switch>
                   </div>
               )} />
    </Switch>

export default App;
