import { createStore } from "redux";
import { flightStatusReducer } from "./reducer"

export const store = createStore(flightStatusReducer)