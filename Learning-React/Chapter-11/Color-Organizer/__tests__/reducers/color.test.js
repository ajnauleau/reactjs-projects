import { color } from '../../src/reducers/colorReducer'
import { colors } from '../../src/reducers/colorsReducer'
import { ADD_COLOR, RATE_COLOR, REMOVE_COLOR } from '../../src/actions/constants'
import deepFreeze from 'deep-freeze'

describe("color Reducer", () => {

    it("ADD_COLOR success", () => {
        const state = {}
        const action = {
            type: ADD_COLOR,
            id: 0,
            title: 'Test Teal',
            color: '#90C3D4',
            timestamp: new Date().toString()
        }
        deepFreeze(state)
        deepFreeze(action)
        const result = color(state, action)
        expect(result)
            .toEqual({
                id: 0,
                title: 'Test Teal',
                color: '#90C3D4',
                timestamp: action.timestamp,
                rating: 0
            })
    })

    it("RATE_COLOR success", () => {
        const state = {
            id: 0,
            title: 'Test Teal',
            color: '#90C3D4',
            timestamp: 'Sat Mar 12 2016 16:12:09 GMT-0800 (PST)',
            rating: undefined
        }
        const action = {
            type: RATE_COLOR,
            id: 0,
            rating: 3
        }
        deepFreeze(state)
        deepFreeze(action)
        const result = color(state, action)
        expect(result)
            .toEqual({
                id: 0,
                title: 'Test Teal',
                color: '#90C3D4',
                timestamp: 'Sat Mar 12 2016 16:12:09 GMT-0800 (PST)',
                rating: 3
            })
    })

    it("REMOVE_COLOR success", () => {
        const state = {
            id: 0,
            title: 'Test Teal',
            color: '#90C3D4',
            timestamp: 'Sat Mar 12 2016 16:12:09 GMT-0800 (PST)',
            rating: undefined
        }
        const action = {
            type: REMOVE_COLOR,
            id: 0
        }
        deepFreeze(state)
        deepFreeze(action)
        const result = color(state, action)
        expect(result)
            .toEqual({})
    })

    it("Defaults array for incorrect action", () =>
        expect(color()).toEqual({}))

})
