import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ setAuth }) => {
  const [active, setActive] = useState(
    window.location.toString().split("/")[3]
  );
  console.log(window.location.toString().split("/")[3]);
  return (
    <nav>
      <ul className=" sticky flex min-w-full items-center gap-8 border-b-2 border-dashed border-rose-500/50 px-4 py-2 pb-4 text-left  text-sm  text-gray-500 xl:mb-8 xl:gap-36 xl:px-12 xl:text-2xl xl:font-semibold">
        <Link
          className={active === "dashboard" ? "font-bold text-green-900" : ""}
          to={"/dashboard"}
        >
          <li>Dashboard</li>
        </Link>
        <Link
          className={
            active === "addNewStudent" ? "font-bold text-green-900" : ""
          }
          to={"/addNewStudent"}
        >
          <li>Student</li>
        </Link>
        <Link
          className={active === "addNewGoals" ? "font-bold text-green-900" : ""}
          to={"/addNewGoals"}
        >
          <li>Goal</li>
        </Link>
        <Link
          className={
            active === "addNewAccommodations" ? "font-bold text-green-900" : ""
          }
          to={"/addNewAccommodations"}
        >
          <li>Accommodations</li>
        </Link>
        <Link
          className={
            active === "searchStudent" ? "font-bold text-green-900" : ""
          }
          to={"/searchStudent"}
        >
          <li>Search</li>
        </Link>
        <button
          className=" rounded-lg bg-green-800 px-4 py-2 font-extrabold text-amber-100"
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
