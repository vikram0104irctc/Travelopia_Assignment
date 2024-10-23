import { useDispatch } from "react-redux";
import { FlightCard } from "./FlightCard";
import { Navbar } from "./Navbar";
import axios from "axios";
import { currentStatusDataUpdate, dataType, dataUpdate } from "../redux/action";
import { FlightTable } from "./FlightTable";
import { useEffect } from "react";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

export const FlightBoard = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  useEffect(() => {
    /**
       * fetchData
       *
       * This function fetches flight data from an API, processes it to find specific 
       * flight statuses (Boarding, On Time, Delayed), and updates the application state.
       *
       * - Sends a GET request to fetch flight data.
       * - Updates the application state with the full flight list.
       * - Filters out flights with relevant statuses and updates the current status data.
       * - Handles errors by displaying a message and redirecting to the homepage.
    */

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
    }, 1000 * 10);
    return () => clearInterval(intervalId);
  }, [dispatch]);

  function handleRefresh() {
    axios
      .get("https://flight-status-mock.core.travelopia.cloud/flights")
      .then((response) => {
        dispatch(dataUpdate(response.data));
      })
      .catch(() => {
        toast.error("Error fetching flight data");
        navigate("/")
      });
  }

  return (
    <div className="bg-[#ebf5fe] rounded-2xl mt-4 px-4 py-6 min-h-[95vh] w-full font-inter mb-4">
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
          <h2 onClick={handleRefresh} className=" my-2 text-sm font-monte bg-blue-600 px-3 py-1 rounded-md text-white cursor-pointer shadow-lg hover:bg-blue-700">Refresh</h2>
        </div>
        <FlightTable />
      </div>
    </div>
  );
};
