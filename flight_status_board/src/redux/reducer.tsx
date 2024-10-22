import { SET_FLIGHT_DATA, SET_RECENT_FLIGHT_DATA } from "./action";

interface FlightData {
  id: number;
  flightNumber: string;
  airline: string;
  origin: string;
  destination: string;
  departureTime: string;
  status: string;
}

interface FlightState {
  flightData: FlightData[];
  recentFlightData: FlightData[];
}

interface SetFlightDataAction {
  type: string;
  payload: FlightData[];
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