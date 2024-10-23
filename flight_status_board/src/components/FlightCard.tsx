import { GiAirplaneDeparture } from "react-icons/gi";
import { GiAirplaneArrival } from "react-icons/gi";
import { CgAirplane } from "react-icons/cg";
import { useSelector } from "react-redux";

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

export const FlightCard = () => {
  let currentStatusData = useSelector(
    (state: FlightState) => state.recentFlightData
  );
  function getFormatedTime(departureTime: string): string {
    const date = new Date(departureTime);
    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const amPm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedTime = `${hours}:${formattedMinutes} ${amPm}`;
    return formattedTime;
  }
  function nameShortner(str: string): string {
    const words = str.split(" ");
    const firstLetter = words[0].charAt(0).toUpperCase();
    const secondLetter = words[0].charAt(1).toUpperCase();
    const number = words[1][words[1].length - 1];
    return `${firstLetter}${secondLetter}${number}`;
  }

  function getFormatedTimeRandom(formattedTime: string): string {
    const [time, amPm] = formattedTime.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (amPm === "PM" && hours !== 12) {
      hours += 12;
    } else if (amPm === "AM" && hours === 12) {
      hours = 0;
    }
    const randomHours = Math.floor(Math.random() * 24) + 1;
    let newHours = (hours + randomHours) % 24;
    const newAmPm = newHours >= 12 ? "PM" : "AM";
    newHours = newHours % 12 || 12;
    const formattedMinutes = String(minutes).padStart(2, "0");
    const newFormattedTime = `${newHours}:${formattedMinutes} ${newAmPm}`;
    return newFormattedTime;
  }
  return (
    <>
      {currentStatusData.map((ele, i) => {
        return (
          <div
            key={ele.flightNumber}
            className="bg-white py-6 lg:px-8 md:px-4 rounded-md flex flex-col shadow-md"
          >
            <div className="w-full flex mb-4 justify-between items-center">
              <p className="font-bold text-lg">Indigo</p>
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
              <div className="flex  items-center">
                <hr className="border-t border-gray-300 my-2 w-12" />{" "}
                <CgAirplane className="lg:text-3xl md:text-3xl xl:text-5xl text-gray-700" />
                <hr className="border-t border-gray-300 my-2 w-12" />{" "}
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
