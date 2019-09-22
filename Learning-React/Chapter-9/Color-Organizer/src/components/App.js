
import React from 'react';
import { PropTypes } from 'prop-types';
import { v4 } from 'uuid';

import './App.css';

import { Colors, NewColor } from './containers/containers';

const App = () =>
    <div className="app">
        <NewColor />
        <Colors />
    </div>

export default App;
