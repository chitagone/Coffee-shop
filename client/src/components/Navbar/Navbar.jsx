import React from "react";
import { cofee } from "../../assets/website";
import { Menus } from "../../constants";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-gradient-to-r from-secondary to-secondary/90 text-white">
      <div className="container py-2">
        <div className="flex justify-between items-center gap-4">
          {/* logo section*/}
          <div className="">
            <a
              href="/"
              className="font-bold text-2xl sm:text-3xl flex justify-center items-center gap-2 tracking-wider font-cursive  "
            >
              <img src={cofee} alt="logo" className="w-14" />
              Coffee Cafe
            </a>
          </div>

          {/* Link section*/}
          <div className="flex justify-between items-center gap-4">
            <ul className="hidden sm:flex items-center gap-4 ">
              {Menus.map((data, index) => (
                <li key={index}>
                  <a
                    href={data.link}
                    className="inline-block text-xl py-4 px-4 text-white/70 hover:text-white duration-200"
                  >
                    {data.name}
                  </a>
                </li>
              ))}
            </ul>
            <button className="bg-primary/70 px-4 py-2 rounded-full hover:scale-105 duration-200 flex items-center gap-3">
              <Link to="/logins">Login</Link>
              <span> / </span>
              <Link to="/register">Register</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
