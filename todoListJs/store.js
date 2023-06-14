import {createStore} from "./core.js";
import todoReducer from "./todoReducer.js";
import withLogger from "./logger.js";

const {attack, connect, dispatch} = createStore(withLogger(todoReducer));

window.dispatch = dispatch;

export {attack, connect};