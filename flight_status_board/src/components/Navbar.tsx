import { CiSearch } from "react-icons/ci";
import { CiMenuFries } from "react-icons/ci";

export const Navbar = () => {
  return (
    <nav className="w-full flex justify-between">
      <div className="flex gap-2 justify-center">
        <div className="mt-3">
          <CiMenuFries className="lg:hidden md:block text-xl" />
        </div>
        <div className="bg-[#71c878] py-2 px-4 rounded-md text-white font-bold ">
          <p>Flight</p>
        </div>
      </div>

      <div className="relative flex items-center gap-1 bg-[#71c878] py-2 px-4 rounded-md">
        <CiSearch className="text-white text-xl font-extrabold " />
        <input type="text" placeholder="Search flight" className="bg-transparent placeholder:text-white outline-none border-none" />
      </div>
    </nav>
  );
};
