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
  let currentStatusData = useSelector((state: FlightState) => state.recentFlightData)
  function getFormatedTIme(departureTime: string): string {
    const date = new Date(departureTime);
    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const amPm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedTime = `${hours}:${formattedMinutes} ${amPm}`;
    return formattedTime;
  }
  function nameShortner(str: string): string {
    const words = str.split(' ');
    const firstLetter = words[0].charAt(0).toUpperCase();
    const secondLetter = words[0].charAt(1).toUpperCase();
    const number = words[1][words[1].length - 1];
    return `${firstLetter}${secondLetter}${number}`;
  }

  function getFormatedTImeRandom(formattedTime: string): string {
    const [time, amPm] = formattedTime.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (amPm === 'PM' && hours !== 12) {
      hours += 12;
    } else if (amPm === 'AM' && hours === 12) {
      hours = 0;
    }
    const randomHours = Math.floor(Math.random() * 24) + 1;
    let newHours = (hours + randomHours) % 24;
    const newAmPm = newHours >= 12 ? 'PM' : 'AM';
    newHours = newHours % 12 || 12;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const newFormattedTime = `${newHours}:${formattedMinutes} ${newAmPm}`;
    return newFormattedTime;
  }
  return (
    <>
      {
        currentStatusData.map((ele, i) => {
          return (
            <div key={ele.flightNumber} className="bg-white py-4 lg:px-6 md:px-2  rounded-md flex flex-1 flex-col ">
              <div className="w-full flex mb-4 justify-between items-center">
                <p className="font-bold">Indigo</p>
                <p className={`px-3 text-end py-1 rounded-full ${i === 0 ? "bg-green-500" : i === 1 ? "bg-blue-500" : "bg-red-500"}`}>{ele.status}</p>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <div className="flex lg:gap-1 xl:gap-2 items-center">
                    <GiAirplaneDeparture />
                    <p>{getFormatedTIme(ele.departureTime)}</p>
                  </div>
                  <p className="lg:text-xl md:text-lg  font-bold">{nameShortner(ele.origin)}</p>
                  <p className="">{ele.origin}</p>
                </div>
                <div>
                  <CgAirplane className="lg:text-2xl md:text-2xl xl:text-4xl" />
                </div>
                <div>
                  <div className="flex lg:gap-2 md:gap-1  items-center">
                    <p>{getFormatedTImeRandom(ele.departureTime)}</p>
                    <GiAirplaneArrival />
                  </div>
                  <p className="lg:text-xl md:text-lg font-bold text-end">{nameShortner(ele.destination)}</p>
                  <p className="">{ele.destination}</p>
                </div>
              </div>

            </div>
          )
        })
      }
    </>
  )
}
