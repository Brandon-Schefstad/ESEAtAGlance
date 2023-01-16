import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Navbar from "./Navbar";
const AddNewGoals = ({ student_id }) => {
  const defaultGoalText = {
    goalGrade: "0",
    domain: "Curriculum and Learning Environment",
    goalText: "None",
    succeed: "off",
    goalNotes: "None",
  };

  const [goalToSend, setGoalToSend] = useState(defaultGoalText);
  const [ID, setID] = useState(false);
  const [nextPage, setNextPage] = useState(false);

  const grades = [
    "Kindergarten",
    "1st Grade",
    "2nd Grade",
    "3rd Grade",
    "4th Grade",
    "5th Grade",
    "6th Grade",
    "7th Grade",
    "8th Grade",
    "9th Grade",
    "10th Grade",
    "11th Grade",
    "12th Grade",
  ];
  const domains = [
    "Curriculum and Learning Environment",
    "Social/Emotional",
    "Independent Functioning",
    "Healthcare",
    "Communication",
  ];
  async function postNewGoal(e) {
    e.preventDefault();
    const response = await axios.post(
      "https://ese-at-a-glance-api.cyclic.app/api/student/addNewGoal",
      {
        goalToSend,
      },
      {
        headers: {
          authorization: localStorage.getItem("auth"),
        },
      }
    );
    if (response.status === 200) {
      setID(response.data.ID);
      setGoalToSend(defaultGoalText);
      <Navigate to={"/addNewGoals"} />;
    }
  }
  function setStateOnChange(e, name) {
    console.log(goalToSend);
    setGoalToSend(goalToSend, ...(goalToSend[e.target.name] = e.target.value));
  }

  const inputStyles =
    "ml-2 bg-gray-50 border-2 border-rose-500/50 border-solid col-span-2 pl-2 py-2 placeholder:text-yellow-100 placeholder:text-xl text-green-900 xl:text-xl ";
  const titleStyles = "block col-span-2 text-xl font-semibold xl:text-2xl ";
  return nextPage ? (
    <Navigate to="/addNewAccommodations" />
  ) : (
    <>
      <Navbar />

      <form
        onSubmit={postNewGoal}
        className=" m-8 grid grid-cols-2 grid-rows-[13] gap-4  bg-amber-200/30  pt-2 text-slate-800  shadow-md shadow-amber-900 xl:mx-auto xl:w-5/6 xl:px-12 xl:pb-8 "
      >
        <h1 className="col-span-2 mx-[-3rem] mt-[-.5rem] bg-green-800 font-[Martel] text-2xl font-semibold text-amber-100 xl:py-4 xl:text-center xl:text-4xl">
          New Goal
        </h1>
        <label className={titleStyles} htmlFor="studentNumber">
          Student number:
        </label>
        <input
          type="number"
          name="ID"
          id="studentNumber"
          placeholder={student_id ? student_id : ""}
          onChange={(e) => setStateOnChange(e, "ID")}
          className={inputStyles}
        />

        <label className={titleStyles} htmlFor="goalGrade">
          Grade:
        </label>
        <select
          name="goalGrade"
          id="goalGrade"
          onChange={(e) => setStateOnChange(e, "goalGrade")}
          className={inputStyles}
        >
          {grades.map((grade, index) => (
            <option key={index} value={index}>
              {grade}
            </option>
          ))}
        </select>

        <label className={titleStyles} htmlFor="domain">
          Domain:
        </label>
        <select
          name="domain"
          id="domain"
          className={inputStyles}
          onChange={(e) => setStateOnChange(e, "domain")}
        >
          {domains.map((domain, index) => (
            <option key={index} value={domain}>
              {domain}
            </option>
          ))}
        </select>
        <label className={titleStyles} htmlFor="goalText">
          Goal Text:
        </label>
        <textarea
          cols={30}
          rows={3}
          onChange={(e) => setStateOnChange(e, "goalText")}
          name="goalText"
          className={inputStyles}
        />
        <label
          className={titleStyles + " col-span-1 grid grid-cols-2"}
          htmlFor="attained"
        >
          Attained?
          <input
            type="checkbox"
            onChange={(e) => setStateOnChange(e, "attained")}
            name="attained"
            className=" my-1 bg-green-800 text-green-800 accent-amber-300"
          />
        </label>

        <label
          className={titleStyles + " xl:col-span-1 xl:row-start-[11]"}
          htmlFor="goalNotes"
        >
          Additional Notes:
        </label>

        <textarea
          cols={30}
          rows={1}
          onChange={(e) => setStateOnChange(e, "notes")}
          name="goalNotes"
          className={inputStyles + "xl:col-span-1 xl:row-start-[12]"}
        />
        <section className="flex items-center justify-evenly xl:col-start-2 xl:row-span-3 xl:row-start-[10]">
          <input
            className=" grid rounded-lg bg-amber-400 p-4 font-extrabold text-green-800 xl:mx-4 xl:w-1/2 xl:text-2xl"
            type="submit"
            value="Submit"
          />
          <button
            className=" btn rounded-lg bg-green-200 p-4 font-extrabold text-green-800 xl:mx-4 xl:w-1/2 xl:text-2xl"
            onClick={() => setNextPage(true)}
          >
            {" "}
            Accommodations
            <FontAwesomeIcon className="mx-4 " icon={faArrowRight} />
          </button>
        </section>
      </form>
    </>
  );
};

export default AddNewGoals;
