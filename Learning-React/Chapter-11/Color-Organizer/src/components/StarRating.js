import React from 'react';
import Star from "./Star";

export const StarRating = ({starsSelected=0, totalStars=5, onRate=f=>f}) =>
    <div className="star-rating">
        <div className="star-container">
        {[...Array(totalStars)].map((n, i) =>
            <Star key={i}
                  selected={i<starsSelected}
                  onClick={() => onRate(i+1)}
            />
        )}
        </div>
        <p>{starsSelected} of {totalStars} stars </p>
    </div>

export default StarRating
