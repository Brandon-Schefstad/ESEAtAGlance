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
  const inputStyles =
    " bg-gray-50 border-2 border-rose-400/50 border-solid col-span-2 pl-2 py-2 placeholder:text-yellow-100 placeholder:text-xl  xl:text-xl mb-4";
  const titleStyles =
    "block col-span-2 text-xl mb-2 font-semibold xl:text-2xl ";
  return studentFinished ? (
    <Navigate to="/Dashboard" />
  ) : (
    <>
      <Navbar />
      <h1 className="col-span-2 mt-4 mb-8 bg-blue-200 px-8 pt-4 pb-2  font-[Martel] text-3xl font-semibold text-blue-900 xl:py-4 xl:text-center xl:text-4xl">
        New Accommodations
      </h1>
      <form
        onSubmit={postNewAccommodations}
        className=" m-8 grid grid-cols-2 gap-4 bg-amber-100 pt-2 text-green-900  shadow-md shadow-amber-900  xl:mx-auto xl:w-5/6 xl:px-12 xl:pb-12 "
      >
        <label
          className=" col-span-2 mt-8 ml-8 text-xl xl:col-span-6 xl:text-3xl"
          htmlFor="studentNumber"
        >
          {" "}
          Student number
          <input
            type="number"
            name="ID"
            id="studentNumber"
            onChange={(e) => setStudentId(e.target.value)}
            className="  mt-2 text-green-900"
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
