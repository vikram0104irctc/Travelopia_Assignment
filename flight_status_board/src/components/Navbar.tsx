import { CiSearch } from "react-icons/ci";
import { CiMenuFries } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { dataType, dataUpdate } from "../redux/action";
import toast from 'react-hot-toast';
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate()

  function handleSearch(value: string) {
    if (value.length == 0) {
      axios
        .get("https://flight-status-mock.core.travelopia.cloud/flights")
        .then((response) => {
          dispatch(dataUpdate(response.data));
        })
        .catch(() => {
          toast.error("Error fetching flight data");
          navigate("/")
        });
    } else {
      axios
        .get("https://flight-status-mock.core.travelopia.cloud/flights")
        .then((response) => {
          const filteredFlights = response.data.filter(
            (flight: dataType) =>
              flight.flightNumber.toLowerCase().includes(value.toLowerCase()) ||
              flight.airline.toLowerCase().includes(value.toLowerCase())
          );
          dispatch(dataUpdate(filteredFlights));
        })
        .catch(() => {
          toast.error("Error fetching flight data");
          navigate("/")
        });
    }
  }

  return (
    <nav className="w-full flex justify-between">
      <div className="flex gap-2 justify-center">
        <div className="mt-3">
          <CiMenuFries className="lg:hidden md:block text-xl" />
        </div>
      </div>

      <div className="relative flex items-center gap-2 bg-white py-2 px-2 rounded-md">
        <CiSearch className="text-black text-xl font-extrabold " />
        <input
          onInput={(e: React.FormEvent<HTMLInputElement>) =>
            handleSearch(e.currentTarget.value)
          }
          type="text"
          placeholder="Search flight"
          className="bg-transparent placeholder:text-black outline-none border-none text-black"
        />
      </div>
    </nav>
  );
};
