import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Navigate } from "react-router-dom";
const Navbar = () => {
  const [auth, setAuth] = useState(true);
  const [active, setActive] = useState(
    window.location.toString().split("/")[3]
  );

  const activeClass =
    "text-blue-900 bg-blue-200  px-4 py-1.5 rounded-md   max-w-36";
  const inactiveClass = "max-w-36 px-4 py-1.5";
  return !auth ? (
    <Navigate to={"/"} />
  ) : (
    <nav className="flex min-w-full justify-between bg-white py-2 ">
      <ul
        className=" m-auto grid w-full grid-cols-3 items-center justify-evenly 
       text-center text-sm font-extrabold text-gray-800 lg:flex lg:gap-12  xl:px-12 xl:text-xl xl:font-semibold"
      >
        <Link
          className={active === "dashboard" ? activeClass : inactiveClass}
          to={"/dashboard"}
        >
          <li>Dashboard</li>
        </Link>
        <Link
          className={active === "addNewStudent" ? activeClass : inactiveClass}
          to={"/addNewStudent"}
        >
          <li>Student</li>
        </Link>
        <Link
          className={active === "addNewGoals" ? activeClass : inactiveClass}
          to={"/addNewGoals"}
        >
          <li>Goal</li>
        </Link>
        <Link
          className={
            active === "addNewAccommodations" ? activeClass : inactiveClass
          }
          to={"/addNewAccommodations"}
        >
          <li>Accomms</li>
        </Link>
        <Link
          className={
            active === "searchStudent"
              ? activeClass + " col-start-2 row-start-1"
              : inactiveClass + " col-start-2 row-start-1"
          }
          to={"/searchStudent"}
        >
          <li>Search</li>
        </Link>
        <button
          className="  col-start-3 row-start-1 my-[0.25rem] mx-4 rounded-md border-solid  bg-red-600 py-[0.4rem] px-4 font-bold text-white xl:ml-[20%]"
          onClick={() => {
            localStorage.setItem("auth", false);
            localStorage.setItem("user", false);
            setAuth(false);
          }}
        >
          Logout
        </button>
      </ul>
    </nav>
  );
};

export default Navbar;
