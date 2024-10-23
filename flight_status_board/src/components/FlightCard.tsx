import { GiAirplaneDeparture } from "react-icons/gi";
import { GiAirplaneArrival } from "react-icons/gi";
import { CgAirplane } from "react-icons/cg";
import { useSelector } from "react-redux";
import { FlightState } from "../redux/reducer";
import { getFormatedTime, getFormatedTimeRandom, nameShortner } from "../utils/formateDate";

export const FlightCard = () => {
  let currentStatusData = useSelector(
    (state: FlightState) => state.recentFlightData
  );

  return (
    <>
      {currentStatusData.map((ele, i) => {
        return (
          <div
            key={ele.flightNumber}
            className="bg-white py-6 lg:px-8 md:px-4 rounded-md flex flex-col shadow-md"
          >
            <div className="w-full flex mb-4 justify-between items-center">
              <p className="font-bold text-lg">{i == 0 ? "Indigo" : i == 1 ? "SpiceJet" : "Air India"}</p>
              <p
                className={`px-3 py-1 rounded-full text-white text-sm font-medium ${i === 0
                  ? "bg-green-400"
                  : i === 1
                    ? "bg-blue-400"
                    : "bg-red-400"
                  }`}
              >
                {ele.status}
              </p>
            </div>

            <div className="flex justify-between items-center">
              <div className="text-left">
                <div className="flex lg:gap-2 xl:gap-3 items-center">
                  <GiAirplaneDeparture className="text-xl text-gray-700" />
                  <p className="text-gray-700 font-medium">
                    {getFormatedTime(ele.departureTime)}
                  </p>
                </div>
                <p className="lg:text-xl md:text-lg font-bold">
                  {nameShortner(ele.origin)}
                </p>
                <p className="text-sm text-gray-500">{ele.origin}</p>
              </div>
              <div className="flex items-center">
                <span className="text-gray-800 my-2 w-12 border-t-2 border-dashed border-gray-400 "></span>
                <CgAirplane className="lg:text-3xl md:text-3xl xl:text-5xl text-gray-700" />
                <span className="text-gray-800 my-2 w-12 border-t-2 border-dashed border-gray-400 "></span>
              </div>

              <div className="text-right">
                <div className="flex lg:gap-2 md:gap-1 items-center justify-end">
                  <p className="text-gray-700 font-medium">
                    {getFormatedTimeRandom(ele.departureTime)}
                  </p>
                  <GiAirplaneArrival className="text-xl text-gray-700" />
                </div>
                <p className="lg:text-xl md:text-lg font-bold">
                  {nameShortner(ele.destination)}
                </p>
                <p className="text-sm text-gray-500">{ele.destination}</p>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
