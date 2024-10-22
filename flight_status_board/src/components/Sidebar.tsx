import { NavLink } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { FaHistory } from "react-icons/fa";
import { IoTicketSharp } from "react-icons/io5";

interface SidebarLink {
  name: string;
  path: string;
  icon: React.ReactNode;
}

export const Sidebar = () => {
  let sidebarLinks: SidebarLink[] = [
    { name: "Home", path: "/", icon: <IoMdHome /> },
    { name: "History", path: "/history", icon: <FaHistory /> },
    { name: "Tickets", path: "/tickets", icon: <IoTicketSharp /> }
  ];

  return (
    <aside className="fixed lg:w-[150px] xl:w-[200px] left-0 top-0 font-inter">
      <div className="px-4 py-6 text-2xl leading-3 font-semibold mt-4">Travelopia</div>
      <div className="flex flex-col gap-2 p-4 mt-1">
        {sidebarLinks.map((ele) => {
          return (
            <NavLink
              className={({ isActive }) =>
                `py-2 px-4 rounded-md flex items-center gap-2 xl:text-xl lg:text-lg md:text-md ${isActive ? 'text-white bg-[#4790f8]' : 'text-gray-500'
                }`
              }
              to={ele.path}
              key={ele.name}
            >
              {ele.icon}
              {ele.name}
            </NavLink>
          );
        })}
      </div>
    </aside>
  );
};
