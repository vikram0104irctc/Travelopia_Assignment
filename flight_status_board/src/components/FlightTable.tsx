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

export const FlightTable = () => {
  const data = useSelector((state: FlightState) => state.flightData);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Boarding":
        return "bg-green-500 text-white";
      case "On Time":
        return "bg-blue-500 text-white";
      case "Delayed":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-300";
    }
  };

  return (
    <div className="overflow-x-auto mt-4 rounded-md overflow-hidden">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Flight Number</th>
            <th className="py-3 px-6 text-left">Airline</th>
            <th className="py-3 px-6 text-left">Origin</th>
            <th className="py-3 px-6 text-left">Destination</th>
            <th className="py-3 px-6 text-left">Departure Time</th>
            <th className="py-3 px-6 text-left">Status</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {data.map((flight) => (
            <tr key={flight.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6">{flight.flightNumber}</td>
              <td className="py-3 px-6">{flight.airline}</td>
              <td className="py-3 px-6">{flight.origin}</td>
              <td className="py-3 px-6">{flight.destination}</td>
              <td className="py-3 px-6">{new Date(flight.departureTime).toLocaleString()}</td>
              <td className={`py-3 px-6`}>
                <div className={`font-bold py-1 px-3 rounded-full text-center ${getStatusColor(flight.status)}`}>
                {flight.status}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
