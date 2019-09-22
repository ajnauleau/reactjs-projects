import React from 'react';
import {StarRating} from "./StarRating";
import {rateColor, removeColor} from "../actions";
import { PropTypes } from 'prop-types';
const { Component } = React;

export class Color extends Component {

    render() {
        const { store } = this.context
        const { id, title, color, rating } = this.props;
        return (
            <section className="color" style={this.style}>
                <h1 ref="title">{title}</h1>
                <button onClick={() =>
                    store.dispatch(
                        removeColor(id)
                    )
                }>X</button>
                <div className="color"
                     style={{ backgroundColor: color }}>
                    <p></p>
                </div>
                <div>
                    <StarRating starsSelected={rating}
                                onRate={rating =>
                                    store.dispatch(
                                        rateColor(id, rating)
                                        )
                                    } />
                </div>
            </section>
        )
    }
}

Color.contextTypes = {
    store: PropTypes.object
}
