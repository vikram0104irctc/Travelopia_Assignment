import { useDispatch } from "react-redux"
import { FlightCard } from "./FlightCard"
import { Navbar } from "./Navbar"
import axios from "axios";
import { currentStatusDataUpdate, dataUpdate } from "../redux/action";
import { FlightTable } from "./FlightTable";
import { useEffect } from "react";

interface dataType {
  id: number;
  flightNumber: string;
  airline: string;
  origin: string;
  destination: string;
  departureTime: string;
  status: string;
}

export const FlightBoard = () => {
  let dispatch = useDispatch()
  useEffect(() => {
    const fetchData = () => {
      axios.get("https://flight-status-mock.core.travelopia.cloud/flights")
        .then((response) => {
          dispatch(dataUpdate(response.data));
          const flights: dataType[] = response.data;
          const sortedFlights = [...flights].sort((a, b) => {
            const dateA = new Date(a.departureTime).getTime();
            const dateB = new Date(b.departureTime).getTime();
            return dateA - dateB;
          });
          console.log(sortedFlights);
          const boardingFlight = sortedFlights.find(flight => flight.status === "Boarding");
          const recentFlight = sortedFlights.find(flight => flight.status === "On Time");
          const delayedFlight = sortedFlights.find(flight => flight.status === "Delayed");
          const filteredFlights = [
            boardingFlight,
            recentFlight,
            delayedFlight
          ];
          dispatch(currentStatusDataUpdate(filteredFlights.filter(Boolean) as dataType[]))
        })
        .catch((error) => {
          console.error("Error fetching flight data:", error);
        });
    };
    fetchData();
    const intervalId = setInterval(() => {
      fetchData();
    }, 1000 * 30);
    return () => clearInterval(intervalId);
  }, [dispatch]);


  return (
    <div className="bg-[#ebf5fe] rounded-2xl mt-4 px-4 py-6 min-h-[95vh] w-full">
      <Navbar />
      <div className="mt-4 flex gap-4 w-full justify-between">
        <FlightCard />
      </div>
      <FlightTable />
    </div>
  )
}
