import React from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { AddColorForm } from '../AddColorForm-stateless'
import { ColorList } from '../ColorList'
import { addColor, sortColors, rateColor, removeColor } from '../../actions'
import {sortFunction} from "../../lib/array-helpers";

export const NewColor = connect(
    null,
    dispatch =>
        ({
            onNewColor(title, color) {
                dispatch(addColor(title,color))
            }
        })
)(AddColorForm)

export const Colors = connect(
    state =>
        ({
            colors: [...state.colors].sort(sortFunction(state.sort))
        }),
    dispatch =>
        ({
            onRemove(id) {
                dispatch(removeColor(id))
            },
            onRate(id, rating) {
                dispatch(rateColor(id, rating))
            }
        })
)(ColorList)
