import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className=" min-w-screen mx-[-1.5rem] flex ">
      <ul className="  flex min-w-full gap-8 bg-amber-300 px-4 py-2 pb-4 text-center text-sm text-green-900 xl:justify-end xl:gap-36 xl:px-12 xl:text-2xl xl:font-semibold">
        <Link to={"/addNewStudent"}>
          <li>New Student</li>
        </Link>
        <Link to={"/addNewGoals"}>
          <li>New Goal</li>
        </Link>
        <Link to={"/addNewAccommodations"}>
          <li>New Accommodations</li>
        </Link>
        <Link to={"/searchStudent"}>
          <li>Search a Student</li>
        </Link>
      </ul>
    </nav>
  );
};

export default Navbar;
