import axios from "axios";
import { React, useState } from "react";
import { Navigate } from "react-router-dom";
import AccommsSection from "./AccommsSection";
import Navbar from "./Navbar";
import accommodations from "./utils/accommodations";

const AddNewAccommodations = ({ student_id }) => {
  const { presentation, response, scheduling, setting } = accommodations;

  const [studentFinished, setStudentFinished] = useState(false);
  const [studentId, setStudentId] = useState(0);

  let accommodationsToSend = [];
  function handleChange(name) {
    accommodationsToSend.includes(name)
      ? accommodationsToSend.splice(accommodationsToSend.indexOf(name), 1)
      : accommodationsToSend.push(name);

    console.log(accommodationsToSend);
  }
  async function postNewAccommodations(e) {
    e.preventDefault();
    const { data, status } = await axios.post(
      "http://localhost:5501/api/student/addNewAccommodations",
      {
        ID: studentId,
        accommodationsToSend,
      },
      {
        headers: {
          authorization: localStorage.getItem("auth"),
        },
      }
    );
    if (status === 200) {
      accommodationsToSend = [];
      setStudentFinished(true);
    }
  }

  return studentFinished ? (
    <Navigate to="/Dashboard" />
  ) : (
    <>
      <Navbar />

      <form
        onSubmit={postNewAccommodations}
        className=" m-8 grid grid-cols-2 gap-4 bg-amber-100 pt-2 text-green-900  shadow-md shadow-amber-900  xl:mx-auto xl:w-5/6 xl:px-12 xl:pb-12 "
      >
        <h1 className="col-span-2 mx-[-3rem] mt-[-.5rem] bg-green-800 font-[Martel] text-2xl font-semibold text-amber-100 xl:col-span-6 xl:mb-8 xl:py-4 xl:text-center xl:text-4xl">
          New Accommodations
        </h1>
        <label
          className=" m-auto text-xl xl:col-span-6 xl:text-3xl"
          htmlFor="studentNumber"
        >
          {" "}
          Student number
          <input
            type="number"
            name="ID"
            id="studentNumber"
            onChange={(e) => setStudentId(e.target.value)}
            className=" ml-8 mt-2 text-green-900"
          />
        </label>
        <AccommsSection
          name={"Presentation"}
          data={presentation}
          handleChange={handleChange}
          active={accommodationsToSend}
        />
        <AccommsSection
          name={"Response"}
          data={response}
          handleChange={handleChange}
          active={accommodationsToSend}
        />
        <AccommsSection
          name={"Setting"}
          data={setting}
          handleChange={handleChange}
          active={accommodationsToSend}
        />
        <AccommsSection
          name={"Scheduling"}
          data={scheduling}
          handleChange={handleChange}
          active={accommodationsToSend}
        />
        <input
          className="col-span-2 m-auto mt-4 bg-amber-400 py-4 px-8 font-extrabold text-green-800 xl:col-span-6 xl:w-1/4 xl:text-2xl"
          type="submit"
          value="Submit"
        />
      </form>
    </>
  );
};

export default AddNewAccommodations;
