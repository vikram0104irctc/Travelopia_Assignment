import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoMdAirplane } from "react-icons/io";
import { FaMapMarkerAlt } from "react-icons/fa";
import toast from 'react-hot-toast';
import { getFormatedTime, getFormatedTimeRandom, getStatusColor } from "../utils/formateDate";
import { dataType } from "../redux/action";

const FlightDetails = () => {

  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const [flightData, setFlightData] = useState<dataType | null>(null);

  const fetchData = () => {
    axios
      .get(`https://flight-status-mock.core.travelopia.cloud/flights/${id}`)
      .then((response) => {
        setFlightData(response.data);
      })
      .catch(() => {
        toast.error("Error fetching flight data");
        navigate("/")
      });
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  let departuretime = flightData?.departureTime && getFormatedTime(flightData.departureTime);
  let randomtime = flightData?.departureTime && getFormatedTimeRandom(flightData.departureTime);
  let dhour = Number(departuretime?.split(" ")[0].split(":")[0]);
  let dmin = Number(departuretime?.split(" ")[0].split(":")[1]);
  let rhour = Number(randomtime?.split(" ")[0].split(":")[0]);
  let rmin = Number(randomtime?.split(" ")[0].split(":")[1]);
  let hour = Math.abs(rhour - dhour);
  let min = Math.abs(rmin - dmin);
  if (min > 59) {
    min = min % 60;
    hour++;
  }
  if (hour > 23) {
    hour = hour % 24;
  }
  let formattedHour = String(hour).padStart(2, '0');
  let formattedMin = String(min).padStart(2, '0');


  return (
    <>
      <main className="bg-[#ebf5fe] rounded-2xl mt-4 px-4 py-6 min-h-[95vh] w-full flex justify-center items-center">
        <button
          onClick={() => {
            navigate("/");
          }}
          className="absolute top-7 left-6 lg:left-[220px] md:left-7 border-black border-2 px-4 py-2 rounded-md hover:bg-black hover:text-white transition-all duration-300 ease-in-out
          "
        >
          Back
        </button>
        <div className="bg-white shadow-md p-6 rounded-2xl w-[100%] md:w-[60%]">
          <div className="flex flex-col md:flex-row justify-between md:items-center py-2">
            <div>
              <h2 className="font-bold text-xl">{flightData?.airline}</h2>
              <p className="text-gray-400 text-md">{formattedHour} Hours {formattedMin} Minutes</p>
            </div>
            <div className="flex gap-2 items-center mt-2 md:mt-0">
              <span className="px-3 py-1 text-blue-700 bg-[#c4daf07c] rounded-full">
                Direct Flight
              </span>
              <span className={`px-3 py-1 rounded-full ${getStatusColor(flightData?.status ?? 'text-blue-700 bg-[#c4daf07c]')}`}>
                {flightData?.status}
              </span>
            </div>
          </div>
          <div className="flex bg-blue-100 md:gap-5 gap-2 p-4 rounded-xl">
            <div className="flex flex-col justify-between">
              <div className="flex flex-col">
                <span className="font-semibold">Departure</span>
                <span className="text-gray-800 text-sm">
                  {departuretime}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold">Arrival</span>
                <span className="text-gray-800 text-sm">{randomtime}</span>
              </div>
            </div>
            <div className="flex flex-col gap-1 items-center">
              <span className="block w-3 h-3 bg-black rounded-full mb-1"></span>
              <div className="h-14 border-l-2 border-gray-800"></div>
              <IoMdAirplane className="text-2xl text-black my-2 rotate-180" />
              <div className="h-12 border-l-2 border-gray-800"></div>
              <FaMapMarkerAlt className="text-red-500 text-2xl" />
            </div>
            <div className="flex flex-col justify-between">
              <div className="flex flex-col">
                <span className="font-semibold">{flightData?.destination}</span>
                <span className="text-gray-800 text-sm">Pune Airport</span>
              </div>
              <div>
                <span className="bg-neutral-100 border-gray-300 border rounded-xl py-1 px-3 md:text-xs text-[10px]">
                  {formattedHour} Hours {formattedMin} Minutes
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold">{flightData?.origin}</span>
                <span className="text-gray-800 text-sm">Dabolim Airport</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default FlightDetails;
