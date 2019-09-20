import CountdownDispatcher from "./dispatcher/CountdownDispatcher";
import countdownActions from "./actions/countdownActions";
import CountdownStore from "./stores/CountdownStore";
import Countdown from "./components/Countdown";
import React from 'react';
import ReactDOM from 'react-dom';

const appDispatcher = new CountdownDispatcher()
const actions = countdownActions(appDispatcher)
const store = new CountdownStore(10, appDispatcher)

const render = count => ReactDOM.render(
    <Countdown count={count} {...actions} />,
    document.getElementById('react-container')
)

store.on("TICK", () => render(store.count))
store.on("RESET", () => render(store.count))
render(store.count)

