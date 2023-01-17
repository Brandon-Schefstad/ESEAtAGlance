import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import ButtonWithLoader from "./ButtonWithLoader";
import Navbar from "./Navbar";
const AddNewGoals = ({ student_id }) => {
  const defaultGoalText = {
    goalGrade: "0",
    domain: "Curriculum and Learning Environment",
    goalText: "None",
    succeed: "off",
    goalNotes: "None",
  };
  const [studentFinished, setStudentFinished] = useState(false);
  const [goalToSend, setGoalToSend] = useState(defaultGoalText);
  const [ID, setID] = useState(false);
  const [nextPage, setNextPage] = useState(false);
  const [stopAnimation, setStopAnimation] = useState(false);
  const [loading, setLoading] = useState(false);

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
    // console.log(goalToSend);
    setLoading(true);
    e.preventDefault();

    const response = await axios
      .post(
        "https://ese-at-a-glance-api.cyclic.app/api/student/addNewGoal",
        {
          goalToSend,
        },
        {
          headers: {
            authorization: localStorage.getItem("auth"),
          },
        }
      )
      .catch(() => {
        setLoading(false);
        alert("Malformed Data");
      });
    console.log(response);
    setLoading(false);
    if (response.status === 200) {
      setID(response.data.ID);
      setGoalToSend(defaultGoalText);
      setStopAnimation(true);
      clearForms();
      return <Navigate to={"/addNewGoals"} replace={true} />;
    }
  }
  function clearForms() {
    const arr = Array.from(document.querySelectorAll(".form-input"));
    arr.forEach((input) => (input.value = ""));
    console.log(arr);
  }
  function setStateOnChange(e, name) {
    console.log(goalToSend);
    setGoalToSend(goalToSend, ...(goalToSend[e.target.name] = e.target.value));
  }
  const inputStyles =
    " bg-gray-50 border-2 border-rose-400/50 border-solid col-span-2 pl-2 py-2 placeholder:text-yellow-100 placeholder:text-xl  xl:text-xl mb-4";
  const titleStyles =
    "block col-span-2 text-xl mb-2 font-semibold xl:text-2xl ";
  return nextPage ? (
    <Navigate to="/addNewAccommodations" />
  ) : ID ? (
    <AddNewGoals student_id={ID} />
  ) : (
    <>
      <Navbar />
      <h1 className="col-span-2 mt-4 mb-8 bg-blue-200 px-8 pt-4 pb-2 text-right font-[Martel] text-3xl font-semibold text-blue-900 xl:py-4 xl:text-center xl:text-4xl">
        New Goal
      </h1>
      <form className=" mx-8 grid grid-cols-2  bg-amber-100  px-6 pt-4 pb-6   text-slate-800 shadow-md  xl:mx-auto xl:w-5/6 xl:px-12 xl:pb-12 xl:shadow-lg xl:shadow-blue-900/50">
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

        <label
          className={
            titleStyles +
            " col-span-1 grid grid-cols-2 xl:col-start-1 xl:grid-cols-2"
          }
          htmlFor="attained"
        >
          Attained?
          <input
            type="checkbox"
            onChange={(e) => setStateOnChange(e, "attained")}
            name="attained"
            className=" my-1 ml-8 bg-green-800 text-green-800 accent-amber-300 xl:h-8"
          />
        </label>

        <label
          className={titleStyles + " form-input xl:col-span-3  "}
          htmlFor="goalNotes"
        >
          Additional Notes:
        </label>
        <textarea
          cols={30}
          rows={1}
          onChange={(e) => setStateOnChange(e, "notes")}
          name="goalNotes"
          className={inputStyles + "xl:col-span-1"}
        />
        <section className="col-span-2 mt-6 grid grid-cols-2 justify-evenly xl:col-span-3 xl:col-start-1 xl:row-span-3 xl:row-start-[12]">
          <ButtonWithLoader
            handleClick={(e) => postNewGoal(e)}
            className={
              "m-auto rounded-lg bg-green-200 py-2 text-green-800 xl:py-4 xl:text-3xl"
            }
            name={"Submit"}
            loading={loading}
          />
          <button
            className="rounded-lg bg-blue-200 text-xs font-extrabold text-blue-900 xl:mx-4 xl:w-1/2 xl:text-2xl"
            onClick={() => setNextPage(true)}
          >
            {" "}
            Accommodations
            <FontAwesomeIcon
              className="ml-2 xl:ml-4"
              icon={faArrowRight}
              stopAnimation={stopAnimation}
            />
          </button>
        </section>
      </form>
    </>
  );
};

export default AddNewGoals;
