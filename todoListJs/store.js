import {createStore} from "./core.js";
import reducer from "./reducer.js";

const {attack, connect, dispatch} = reducer();

window.dispatch = dispatch;

export {attack, connect};