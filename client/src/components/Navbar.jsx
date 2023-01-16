import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Navigate } from "react-router-dom";
const Navbar = () => {
  const [auth, setAuth] = useState(true);
  const [active, setActive] = useState(
    window.location.toString().split("/")[3]
  );
  console.log(window.location.toString().split("/")[3]);
  const activeClass = "text-green-900 bg-green-200  px-4 py-1.5 rounded-md   ";
  const inactiveClass = "px-4 py-1.5";
  return !auth ? (
    <Navigate to={"/"} />
  ) : (
    <nav className="flex min-w-full justify-between border-b-2 border-dashed  border-rose-500/50 bg-white py-2 pr-20">
      <ul className=" sticky flex  items-center justify-evenly gap-8  px-4   py-2  text-left  text-sm font-extrabold text-gray-800  xl:gap-24 xl:px-12  xl:text-xl xl:font-semibold">
        <Link
          className={active === "dashboard" ? activeClass : inactiveClass}
          to={"/dashboard"}
        >
          <li>Dashboard</li>
        </Link>
        <Link to={"/addNewStudent"}>
          <li>Student</li>
        </Link>
        <Link to={"/addNewGoals"}>
          <li>Goal</li>
        </Link>
        <Link to={"/addNewAccommodations"}>
          <li>Accommodations</li>
        </Link>
        <Link to={"/searchStudent"}>
          <li>Search</li>
        </Link>
      </ul>
    </nav>
  );
};

export default Navbar;
