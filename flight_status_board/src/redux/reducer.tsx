import { dataType, SET_FLIGHT_DATA, SET_RECENT_FLIGHT_DATA } from "./action";

export interface FlightState {
  flightData: dataType[];
  recentFlightData: dataType[];
}

export interface SetFlightDataAction {
  type: string;
  payload: dataType[];
}

const initState: FlightState = {
  flightData: [],
  recentFlightData: [],
};

export const flightStatusReducer = (state = initState, action: SetFlightDataAction): FlightState => {
  switch (action.type) {
    case SET_FLIGHT_DATA:
      return {
        ...state,
        flightData: action.payload,
      };
    case SET_RECENT_FLIGHT_DATA:
      return {
        ...state,
        recentFlightData: action.payload,
      };
    default:
      return state;
  }
};