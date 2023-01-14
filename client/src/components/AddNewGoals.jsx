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
  const [studentFinished, setStudentFinished] = useState(false);
  const [goalToSend, setGoalToSend] = useState(defaultGoalText);
  const [ID, setID] = useState(false);

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
      "http://localhost:5501/api/student/addNewGoal",
      {
        goalToSend,
      },
      {
        headers: {
          authorization: localStorage.getItem("auth"),
        },
      }
    );
    console.log(response);
    if (response.status === 200) {
      setID(response.data.ID);
      setGoalToSend(defaultGoalText);
      window.location.reload();
    }
  }
  function setStateOnChange(e, name) {
    console.log(goalToSend);
    setGoalToSend(goalToSend, ...(goalToSend[e.target.name] = e.target.value));
  }
  const inputStyles =
    "ml-2 bg-green-700  border-b-2 border-amber-200 border-solid col-span-2 pl-2 py-2 placeholder:text-yellow-100 placeholder:text-xl text-amber-100 xl:text-xl";
  const titleStyles = "block col-span-2 text-xl font-semibold ";
  return studentFinished ? (
    <Navigate to="/addNewAccommodations" />
  ) : ID ? (
    <AddNewGoals student_id={ID} />
  ) : (
    <>
      <Navbar />

      <form
        onSubmit={postNewGoal}
        className="  mt-8 grid grid-cols-2 gap-2 bg-green-800 p-6 pt-8  text-amber-100 xl:mx-auto xl:w-5/6 xl:p-12"
      >
        <h1 className="col-span-2 mb-2 text-2xl font-semibold xl:text-3xl">
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
        <label className={titleStyles + " col-span-1"} htmlFor="attained">
          Attained?
        </label>
        <input
          type="checkbox"
          onChange={(e) => setStateOnChange(e, "attained")}
          name="attained"
          className=" my-1 bg-green-800 text-green-800 accent-amber-300"
        />
        <label className={titleStyles} htmlFor="goalNotes">
          Additional Notes:
        </label>
        <textarea
          cols={30}
          rows={1}
          onChange={(e) => setStateOnChange(e, "notes")}
          name="goalNotes"
          className={inputStyles}
        />
        <input
          className="col-span-2 m-auto mt-4 bg-amber-400 py-4 px-8 font-extrabold text-green-800 xl:w-1/3 xl:text-2xl"
          type="submit"
          value="Submit"
        />
      </form>
    </>
  );
};

export default AddNewGoals;
