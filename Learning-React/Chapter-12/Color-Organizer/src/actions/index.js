
import { ADD_COLOR, REMOVE_COLOR, RATE_COLOR, SORT_COLORS } from './constants'
/*import { v4 } from 'uuid'*/

import fetch from 'isomorphic-fetch'

const parseResponse = response => response.json()

const logError = error => console.error(error)

const fetchThenDispatch = (dispatch, url, method, body) =>
        fetch(url, {method, body, headers: { 'Content-Type': 'application/json' }})
            .then(parseResponse)
            .then(dispatch)
            .catch(logError)


export const addColor = (title, color) => dispatch =>
    fetchThenDispatch(
        dispatch,
        '/api/colors',
        'POST',
        JSON.stringify({title, color})
    )

export const removeColor = id => dispatch =>
    fetchThenDispatch(
        dispatch,
        `/api/color/${id}`,
        'DELETE'
    )

export const rateColor = (id, rating) => dispatch =>
    fetchThenDispatch(
        dispatch,
        `/api/color/${id}`,
        'PUT',
        JSON.stringify({rating})
    )

export const sortColors = sortedBy =>
    (sortedBy === "rating") ?
        ({
            type: SORT_COLORS,
            sortBy: "SORTED_BY_RATING"
        }) :
        (sortedBy === "title") ?
            ({
                type: SORT_COLORS,
                sortBy: "SORTED_BY_TITLE"
            }) :
            ({
                type: SORT_COLORS,
                sortBy: "SORTED_BY_DATE"
            })
