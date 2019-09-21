
import { ADD_COLOR, RATE_COLOR } from '../actions/constants';

export const color = (state = {}, action) => {

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
        default :
            return state
    }

}
