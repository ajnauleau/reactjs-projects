import React from 'react'
import { Provider } from 'react-redux'
import { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './components/App'
import storeFactory from './store/index'
import initialState from './data/initial-data'

const store = storeFactory(false, initialState) //window.__INITIAL_STATE__

window.React = React
window.store = store

console.log('rendered from here...')

hydrate(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('react-container')
)
