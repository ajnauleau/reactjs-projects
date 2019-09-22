
import React from 'react';
import { Component } from 'react';
import { PropTypes } from 'prop-types';
import { v4 } from 'uuid';

import './App.css';

import {AddColorForm} from "./AddColorForm-stateless";
import {ColorList} from "./ColorList";
import {sortFunction} from "../lib/array-helpers";

export class App extends Component {

    static childContextTypes = {
        store: PropTypes.object.isRequired
    }


    getChildContext() {
        return {
            store: this.props.store
        }
    }

    componentWillMount() {
        this.unsubscribe = this.props.store.subscribe(
            () => this.forceUpdate()
        )
    }

    componentWillUnmount() {
        this.unsubscribe()
    }

    render() {
        const store = this.props.store
        const { colors, sort } = this.props.store.getState()
        const sortedColors = [...colors].sort(sortFunction(sort))
        console.log(sortedColors);
        return (
            <div className="app">
                <AddColorForm />
                <ColorList store={store} />
            </div>
        )
    }
}

App.propTypes = {
    store: PropTypes.object.isRequired
}

export default App;
