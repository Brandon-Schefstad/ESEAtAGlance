import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ setAuth }) => {
  const [active, setActive] = useState(
    window.location.toString().split("/")[3]
  );
  console.log(window.location.toString().split("/")[3]);
  const activeClass = "text-green-900 bg-green-200  px-4 py-1.5 rounded-md   ";
  const inactiveClass = "px-4 py-1.5";
  return (
    <nav className="flex min-w-full justify-between border-b-2 border-dashed  border-rose-500/50 bg-white py-2 pr-20">
      <ul className=" sticky flex  items-center justify-evenly gap-8  px-4   py-2  text-left  text-sm font-extrabold text-gray-800  xl:gap-24 xl:px-12  xl:text-xl xl:font-semibold">
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
          <li>Accommodations</li>
        </Link>
        <Link
          className={active === "searchStudent" ? activeClass : inactiveClass}
          to={"/searchStudent"}
        >
          <li>Search</li>
        </Link>
      </ul>
      <button
        className="  my-[0.25rem] rounded-md border-solid border-rose-700 bg-rose-200 px-4 font-bold text-rose-900"
        onClick={() => {
          localStorage.setItem("auth", false);
          localStorage.setItem("user", false);
          setAuth(false);
        }}
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
