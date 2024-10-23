export const SET_FLIGHT_DATA: string = "SET_FLIGHT_DATA";
export const SET_RECENT_FLIGHT_DATA: string = "SET_RECENT_FLIGHT_DATA";

export interface dataType {
  id: number,
  flightNumber: string,
  airline: string,
  origin: string,
  destination: string,
  departureTime: string,
  status: string,
}

export const dataUpdate = (data: dataType[]) => {
  return {
    type: SET_FLIGHT_DATA,
    payload: data,
  };
};

export const currentStatusDataUpdate = (data: dataType[]) => {
  return {
    type: SET_RECENT_FLIGHT_DATA,
    payload: data,
  };
};