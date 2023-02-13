import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import ButtonWithLoader from "./ButtonWithLoader";
import addNewGoal from "./fetch/addNewGoal";
import Navbar from "./Navbar";
import { domains, grades } from "./utils/accommodations";
import bannerStyles from "./utils/styles";
const AddNewGoals = ({ student_id }) => {
  const defaultGoalText = {
    goalGrade: "0",
    domain: "Curriculum and Learning Environment",
    goalText: "None",
    attained: false,
    goalNotes: "None",
  };
  const [goalToSend, setGoalToSend] = useState(defaultGoalText);
  const [ID, setID] = useState(false);
  const [nextPage, setNextPage] = useState(false);
  const [stopLoading, setStopLoading] = useState(false);

  function setStateOnChange(e, name) {
    name === "attained"
      ? setGoalToSend(
          goalToSend,
          ...(goalToSend["attained"] = e.target._valueTracker.getValue())
        )
      : setGoalToSend(
          goalToSend,
          ...(goalToSend[e.target.name] = e.target.value)
        );
  }
  const inputStyles =
    " bg-gray-50 border-2 border-rose-400/50 border-solid col-span-2 pl-2 py-2 placeholder:text-yellow-100 placeholder:text-xl  xl:text-xl mb-4";
  const titleStyles =
    "block col-span-2 text-xl mb-2 font-semibold xl:text-2xl ";
  return nextPage ? (
    <Navigate to="/addNewAccommodations" />
  ) : (
    <>
      <Navbar />
      <h1 className={bannerStyles}>Add a goal to a student profile</h1>
      <form className=" mx-8 grid grid-cols-2  bg-amber-100  px-6 pt-4 pb-6   text-slate-800 shadow-md  md:px-12 lg:px-20 lg:py-12 xl:mx-auto xl:w-5/6 xl:px-24 xl:pb-12 xl:shadow-lg xl:shadow-blue-900/50">
        <label className={titleStyles} htmlFor="studentNumber">
          Student number:
        </label>
        <input
          type="number"
          name="ID"
          id="studentNumber"
          placeholder={student_id ? student_id : ""}
          onChange={(e) => setStateOnChange(e, "ID")}
          className={inputStyles + " form-input col-span-2 w-full px-4"}
        />

        <label className={titleStyles} htmlFor="goalGrade">
          Grade:
        </label>
        <select
          name="goalGrade"
          id="goalGrade"
          onChange={(e) => setStateOnChange(e, "goalGrade")}
          className={inputStyles + " col-span-2 w-full px-4"}
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
          className={inputStyles + " col-span-2 w-full px-4"}
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
          className={inputStyles + " form-input col-span-2 w-full px-4"}
        />

        <section className="col-span-2 grid md:col-span-2 md:grid-cols-4 ">
          <section className=" place-items-left col-span-2 grid lg:place-items-center  xl:col-span-1 xl:row-span-2">
            <label
              className={
                titleStyles +
                " col-span-1 grid grid-cols-2  text-left xl:col-start-1 xl:row-span-2 xl:my-auto  xl:grid-cols-2"
              }
              htmlFor="attained"
            >
              Attained?
              <input
                type="checkbox"
                onChange={(e) => setStateOnChange(e, "attained")}
                name="attained"
                className=" my-1 ml-8 bg-green-800 text-green-800 accent-amber-300 xl:my-auto xl:h-8"
                id="attained"
              />
            </label>
          </section>

          <label
            className={titleStyles + " form-input col-span-2 xl:col-span-1  "}
            htmlFor="goalNotes"
          >
            Additional Notes:
          </label>
          <textarea
            cols={30}
            rows={1}
            onChange={(e) => setStateOnChange(e, "notes")}
            name="goalNotes"
            className={
              inputStyles + " col-span-2 w-full xl:col-span-3 xl:col-start-2"
            }
          />
        </section>
        <section className="col-span-2 mt-4 flex grid-cols-2 flex-col justify-evenly gap-6 lg:flex-row xl:col-span-3 xl:col-start-1 xl:row-span-3 xl:row-start-[12]">
          <ButtonWithLoader
            handleClick={(e) =>
              addNewGoal(
                goalToSend,
                setID,
                setGoalToSend,
                defaultGoalText,
                setStopLoading,
                e
              )
            }
            className={
              "col-span-2 m-auto rounded-lg bg-blue-200 py-2 px-4  font-bold text-blue-900 sm:col-span-1 sm:py-4  lg:px-12 lg:text-2xl"
            }
            name={"Confirm Goal"}
            stopLoading={stopLoading}
          />
          <button
            className="m-auto rounded-lg bg-green-200 py-2 px-4 font-bold text-green-900 sm:col-span-1 sm:py-4 lg:px-12 lg:text-2xl"
            onClick={() => setNextPage(true)}
          >
            {" "}
            Next
          </button>
        </section>
      </form>
    </>
  );
};

export default AddNewGoals;
