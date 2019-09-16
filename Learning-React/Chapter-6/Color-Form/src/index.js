
import React from 'react';
import ReactDOM from 'react-dom';
import { Component } from 'react';
import { v4 } from 'uuid';

import './index.css';

import {AddColorForm} from "./components/AddColorForm-stateless";
import {ColorList} from "./components/ColorList";

export class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            colors: [
                {
                    "id": "098",
                    "title": "ocean at dusk",
                    "color": "#00c4e2",
                    "rating": 5
                },
                {
                    "id": "043",
                    "title": "lawn",
                    "color": "#00c4e2",
                    "rating": 3
                },
                {
                    "id": "082",
                    "title": "bright red",
                    "color": "#ff0000",
                    "rating": 0
                }
            ]
        }
        this.addColor = this.addColor.bind(this)
        this.rateColor = this.rateColor.bind(this)
        this.removeColor = this.removeColor.bind(this)
    }

    addColor(title, color) {
        const colors = [
            ...this.state.colors,
            {
                id: v4(),
                title,
                color,
                rating: 0
            }
        ]
        this.setState({colors})
    }

    rateColor(id, rating) {
        const colors = this.state.colors.map(color=>
            (color.id !== id) ?
                color :
                {
                    ...color,
                    rating
                }
        )
        this.setState({colors})
    }

    removeColor(id) {
        const colors = this.state.colors.filter(
            color => color.id !== id
        )
        this.setState({colors})
    }

    render() {
        const { addColor, rateColor, removeColor } = this
        const { colors } = this.state
        return (
            <div className="app">
                <AddColorForm onNewColor={addColor} />
                <ColorList colors={colors}
                            onRate={rateColor}
                            onRemove={removeColor} />
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('react-container')
)
