import { useState } from "react";
import { useSelector } from "react-redux";
import { getFormatedTime, getStatusColor } from "../utils/formateDate";
import { useNavigate } from "react-router-dom";
import { FlightState } from "../redux/reducer";
import { MdOutlineNavigateNext } from "react-icons/md";
import { MdOutlineNavigateBefore } from "react-icons/md";

export const FlightTable = () => {
  const data = useSelector((state: FlightState) => state.flightData);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(data.length / recordsPerPage);

  const handleFlightRedirect = (id: string) => {
    navigate(`/flight/${id}`);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <div className="overflow-x-auto rounded-md overflow-hidden font-inter shadow-md">
        <table className="min-w-full bg-white border border-gray-200 overflow-hidden rounded-md">
          <thead>
            <tr className="bg-black text-white text-sm leading-normal">
              <th className="py-3 pr-2 pl-4 text-left">Flight Number</th>
              <th className="py-3 px-4 text-left">Airline</th>
              <th className="py-3 px-4 text-left hidden sm:table-cell">Origin</th>
              <th className="py-3 px-4 text-left hidden sm:table-cell">Destination</th>
              <th className="py-3 px-4 text-left hidden sm:table-cell">Departure Time & Date</th>
              <th className="py-3 px-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm  font-light">
            {currentRecords.map((flight) => (
              <tr key={flight.id} className="border-b border-gray-200 hover:bg-gray-100">
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
                <td className="py-3 px-4 hidden sm:table-cell">{flight.origin}</td>
                <td className="py-3 px-4 hidden sm:table-cell">{flight.destination}</td>
                <td className="py-3  pl-4 pr-3 hidden sm:table-cell">
                  {getFormatedTime(flight.departureTime)} ,
                  {flight.departureTime.split("T")[0].split("-").reverse().join("-")}
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

      <div className="flex justify-center gap-4 items-center mt-4 px-2">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="bg-gray-400 px-4 py-1 md:py-2 rounded disabled:opacity-50"
        >
          <MdOutlineNavigateBefore />
        </button>
        <span className="text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="bg-gray-400 px-4 py-1 md:py-2 rounded disabled:opacity-50"
        >
          <MdOutlineNavigateNext />
        </button>
      </div>
    </>
  );
};
