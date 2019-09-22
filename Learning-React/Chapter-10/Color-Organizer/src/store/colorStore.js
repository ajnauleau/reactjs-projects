
import { createStore } from 'redux';
import { color } from '../reducers';

const store = createStore(color)

console.log( store.getState() );
