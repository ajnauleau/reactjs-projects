
import { ADD_COLOR, RATE_COLOR, REMOVE_COLOR } from '../actions/constants';

export const color = (state = {}, action={ type: null }) => {

    switch(action.type) {
        case ADD_COLOR:
            return {
                id: action.id,
                title: action.title,
                color: action.color,
                timestamp: action.timestamp,
                rating: 0
            }
        case RATE_COLOR:
            return (state.id !== action.id) ?
                state :
                {
                    ...state,
                    rating: action.rating
                }
        case REMOVE_COLOR:
            return (state.id !== action.id) ?
                state :
                { }
        default :
            return state
    }

}
