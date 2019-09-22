import React from 'react';
import {StarRating} from "./StarRating";
import {rateColor, removeColor} from "../actions";
import { PropTypes } from 'prop-types';
const { Component } = React;

export class Color extends Component {

    render() {
        const { title, color, rating, onRemove, onRate} = this.props
        return (
            <section className="color" style={this.style}>
                <h1 ref="title">{title}</h1>
                <button onClick={onRemove}>
                    X
                </button>
                <div className="color"
                     style={{ backgroundColor: color }}>
                       *
                </div>
                <div>
                    <StarRating starsSelected={rating} onRate={onRate}/>
                </div>
            </section>
        )
    }

}

Color.propTypes = {
    title: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    rating: PropTypes.number,
    onRemove: PropTypes.func,
    onRate: PropTypes.func
}

Color.defaultProps = {
    rating: 0,
    onRemove: f=>f,
    onRate: f=>f
}

export default Color
