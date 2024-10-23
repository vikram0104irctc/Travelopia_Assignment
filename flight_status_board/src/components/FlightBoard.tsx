import { useDispatch } from "react-redux";
import { FlightCard } from "./FlightCard";
import { Navbar } from "./Navbar";
import axios from "axios";
import { currentStatusDataUpdate, dataUpdate } from "../redux/action";
import { FlightTable } from "./FlightTable";
import { useEffect } from "react";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

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
  let dispatch = useDispatch();
  let navigate = useNavigate();
  useEffect(() => {
    const fetchData = () => {
      axios
        .get("https://flight-status-mock.core.travelopia.cloud/flights")
        .then((response) => {
          dispatch(dataUpdate(response.data));
          const flights: dataType[] = response.data;

          const boardingFlight = flights.find(
            (flight) => flight.status === "Boarding"
          );
          const recentFlight = flights.find(
            (flight) => flight.status === "On Time"
          );
          const delayedFlight = flights.find(
            (flight) => flight.status === "Delayed"
          );
          const filteredFlights = [boardingFlight, recentFlight, delayedFlight];
          dispatch(
            currentStatusDataUpdate(
              filteredFlights.filter(Boolean) as dataType[]
            )
          );
        })
        .catch(() => {
          toast.error("Error fetching flight data");
          navigate("/")
        });
    };
    fetchData();
    const intervalId = setInterval(() => {
      fetchData();
    }, 30000);
    return () => clearInterval(intervalId);
  }, [dispatch]);

  return (
    <div className="bg-[#ebf5fe] rounded-2xl mt-4 px-4 py-6 min-h-[95vh] w-full font-inter">
      <Navbar />
      <div className="mt-8 hidden md:block">
        <div className="font-bold my-2 text-xl font-monte">Recent Flights</div>
        <div className=" flex flex-wrap gap-4 w-full justify-between">
          <FlightCard />
        </div>
      </div>
      <div className="mt-8">
        <div className="flex justify-between items-center">
          <h2 className="font-bold my-2 text-xl font-monte">All Flights</h2>
          <h2 className=" my-2 text-sm font-monte bg-blue-600 px-3 py-1 rounded-md text-white cursor-pointer shadow-lg hover:bg-blue-300">Refresh</h2>
        </div>
        <FlightTable />
      </div>
    </div>
  );
};
