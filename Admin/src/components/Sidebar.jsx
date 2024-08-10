import { assets } from "../assets/assets";
import { NavLink } from "react-router-dom";
const Sidebar = () => {
  return (
    <div className="bg-[#8b5946] min-h-screen pl-[4vw]">
      {/* logo for big screen */}
      <img
        src={assets.cofee}
        className="mt-5 w-[max(10vw,100px)] hidden sm:block"
        alt=""
      />
      {/* logo for small screen */}
      <img
        src={assets.cofee}
        className="mt-5 w-[max(5vw,40px)] mr-5 sm:hidden block"
      />
      <div className="flex flex-col gap-5 mt-10">
        {/* <NavLink
          className="flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#3b2d31] text-sm font-medium "
          to="/add-coffee"
        >
          <img src={assets.coffee} className="w-5" />
          <p className="hidden sm:block">Add Coffee</p>
        </NavLink> */}

        <NavLink
          className="flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#3b2d31] text-sm font-medium "
          to="/list-coffee"
        >
          <img src={assets.coffee} className="w-5" />
          <p className="hidden sm:block">Coffee Menu</p>
        </NavLink>

        <NavLink
          className="flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#3b2d31] text-sm font-medium "
          to="add-dessert"
        >
          <img src={assets.dessert} className="w-5" />
          <p className="hidden sm:block">Add Dessert</p>
        </NavLink>

        <NavLink
          className="flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#3b2d31] text-sm font-medium "
          to="/list-dessert"
        >
          <img src={assets.dessert_list} className="w-5" />
          <p className="hidden sm:block">List Dessert</p>
        </NavLink>

        <NavLink
          className="flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#3b2d31] text-sm font-medium "
          to="/list-member"
        >
          <img src={assets.membership} className="w-5" />
          <p className="hidden sm:block">Members</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
