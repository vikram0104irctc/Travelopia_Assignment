import { useSelector } from "react-redux";
import { getFormatedTime, getStatusColor } from "../utils/formateDate";
import { useNavigate } from "react-router-dom";
import { FlightState } from "../redux/reducer";

export const FlightTable = () => {
  const data = useSelector((state: FlightState) => state.flightData);
  const navigate = useNavigate();
  const handleFlightRedirect = (id: string) => {
    navigate(`/flight/${id}`);
  };

  return (
    <>
      <div className="overflow-x-auto rounded-md overflow-hidden font-inter shadow-md">
        <table className="min-w-full bg-white border border-gray-200 overflow-hidden rounded-md">
          <thead>
            <tr className="bg-black text-white text-sm leading-normal">
              <th className="py-3 pr-2 pl-4 text-left">Flight Number</th>
              <th className="py-3 px-4 text-left">Airline</th>
              <th className="py-3 px-4 text-left hidden sm:table-cell">
                Origin
              </th>
              <th className="py-3 px-4 text-left hidden sm:table-cell">
                Destination
              </th>
              <th className="py-3 px-4 text-left hidden sm:table-cell">
                Departure Time & Date
              </th>
              <th className="py-3 px-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm  font-light">
            {data.map((flight) => (
              <tr
                key={flight.id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-4">
                  <button
                    className="cursor-pointer underline text-blue-400"
                    onClick={() => handleFlightRedirect(flight.id.toString())}
                  >
                    {flight.flightNumber}
                  </button>
                </td>
                <td className="py-3 px-4">
                  {flight.airline}

                  <div className="md:hidden table-cell text-[10px]">
                    {getFormatedTime(flight.departureTime)}
                  </div>
                </td>
                <td className="py-3 px-4 hidden sm:table-cell">
                  {flight.origin}
                </td>
                <td className="py-3 px-4 hidden sm:table-cell">
                  {flight.destination}
                </td>
                <td className="py-3  pl-4 pr-3 hidden sm:table-cell">
                  {getFormatedTime(flight.departureTime)} ,
                  {flight.departureTime
                    .split("T")[0]
                    .split("-")
                    .reverse()
                    .join("-")}
                </td>
                <td className={`py-3 px-4`}>
                  <div
                    className={`font-bold py-1 px-3 rounded-full text-center ${getStatusColor(
                      flight.status
                    )}`}
                  >
                    {flight.status}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
