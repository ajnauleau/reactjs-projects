import React from 'react'
import { connect } from 'react-redux'
import AddColorForm from '../AddColorForm-stateless'
import ColorList from '../ColorList'
import { addColor, rateColor, removeColor } from '../../actions'
import { sortColors } from '../../lib/array-helpers'
import {findById} from "../../lib/findById";
import ColorDetails from "../ColorDetails";

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
    ({colors}, {match})=>
        ({
            colors: sortColors(colors, match.params.sort)
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

export const Color = connect(
    (state, props) => findById(state.colors, props.match.params.id)
)(ColorDetails)

export default Colors;
