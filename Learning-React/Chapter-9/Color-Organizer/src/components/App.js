
import React from 'react';
import { Component } from 'react';
import { v4 } from 'uuid';

import './App.css';

import {AddColorForm} from "./AddColorForm-stateless";
import {ColorList} from "./ColorList";
import {sortFunction} from "../lib/array-helpers";

export class App extends Component {

    getChildContext() {
        return {
            store: this.props.store
        }
    }

    componentWillMount() {
        this.unsubscribe = store.subscribe(
            () => this.forceUpdate()
        )
    }

    componentWillUnmount() {
        this.unsubscribe()
    }

    render() {
        const { colors, sort } = store.getState()
        const sortedColors = [...colors].sort(sortFunction(sort))
        return (
            <div className="app">
                <AddColorForm />
                <ColorList colors={sortedColors} />
            </div>
        )
    }
}

App.childContextTypes = {
    store: PropTypes.object.isRequired
}

export default App;
