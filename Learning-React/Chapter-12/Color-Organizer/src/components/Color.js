import React from 'react';
import StarRating from "./StarRating";
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
const { Component } = React;

export class Color extends Component {

    render() {
        const { id, title, color, rating, onRemove, onRate, history} = this.props
        return (
            <section className="color" style={this.style}>
                <h1 ref="title"
                    onClick={() => history.push(`/${id}`)}>{title}</h1>
                <button onClick={onRemove}>
                    X
                </button>
                <div className="color"
                     onClick={() => history.push(`/${id}`)}
                     style={{ backgroundColor: color }}>
                       <p></p>
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

export default withRouter(Color);
