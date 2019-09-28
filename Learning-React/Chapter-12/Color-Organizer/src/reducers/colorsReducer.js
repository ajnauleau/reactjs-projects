
import { ADD_COLOR, RATE_COLOR, REMOVE_COLOR } from '../actions/constants';
import { color } from './colorReducer';

export const colors = (state = [], action) => {
    switch(action.type) {
        case ADD_COLOR:
            return [
                ...state,
                color({}, action)
            ]
        case RATE_COLOR:
            return state.map(
                c => color(c, action)
            )
        case REMOVE_COLOR:
            return state.filter(
                c => c.id !== action.id
            )
        default:
            return state
    }
}
