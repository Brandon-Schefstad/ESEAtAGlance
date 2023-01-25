import axios from "axios";
import { React, useState } from "react";
import { Navigate } from "react-router-dom";
import AccommsSection from "./AccommsSection";
import ButtonWithLoader from "./ButtonWithLoader";
import Navbar from "./Navbar";
import accommodations from "./utils/accommodations";

const AddNewAccommodations = ({ student_id }) => {
  const { presentation, response, scheduling, setting } = accommodations;

  const [studentFinished, setStudentFinished] = useState(false);
  const [studentId, setStudentId] = useState(0);
  const [loading, setLoading] = useState(false);

  let accommodationsToSend = [];
  function handleChange(name) {
    accommodationsToSend.includes(name)
      ? accommodationsToSend.splice(accommodationsToSend.indexOf(name), 1)
      : accommodationsToSend.push(name);

    console.log(accommodationsToSend);
  }
  async function postNewAccommodations(e) {
    setLoading(true);
    e.preventDefault();
    const { data, status } = await axios
      .post(
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
      )
      .catch(() => {
        setLoading(false);
        alert("Malformed Data");
      });
    setLoading(false);

    if (status === 200) {
      accommodationsToSend = [];
      setStudentFinished(true);
    }
  }
  const titleStyles =
    "block col-span-2 text-xl mb-2 font-semibold xl:text-2xl ";
  return studentFinished ? (
    <Navigate to="/Dashboard" />
  ) : (
    <>
      <Navbar />
      <h1 className="col-span-2 mb-8 bg-blue-100  px-8 pt-4 pb-2  font-[Martel] text-3xl font-semibold text-blue-900 xl:py-4 xl:pr-12 xl:text-center xl:text-4xl ">
        New Accommodations
      </h1>
      <form
        onSubmit={postNewAccommodations}
        className="mx-8 grid grid-cols-3  bg-amber-100  px-6 pt-4 pb-6   text-slate-800 shadow-md  md:px-12 lg:px-20 lg:py-12 xl:mx-auto xl:w-5/6 xl:px-16 xl:pb-12 xl:shadow-lg xl:shadow-blue-900/50"
      >
        <section className=" col-span-3 grid gap-4 pt-4 xl:grid-cols-3">
          <label
            className="  text-xl xl:col-span-1   xl:mx-auto xl:block xl:text-4xl"
            htmlFor="studentNumber"
          >
            {" "}
            Student number
          </label>
          <input
            type="number"
            name="ID"
            id="studentNumber"
            onChange={(e) => setStudentId(e.target.value)}
            className=" mb-4 border-2 border-solid border-rose-400/50 bg-gray-50 py-2 pl-2 placeholder:text-xl placeholder:text-yellow-100  xl:col-span-2 xl:w-3/4 xl:text-xl"
          />
        </section>
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

        <ButtonWithLoader
          handleClick={(e) => postNewAccommodations(e)}
          className={
            "col-span-2 m-auto rounded-lg bg-green-200 py-2 text-green-800 xl:col-span-3 xl:py-4 xl:text-3xl"
          }
          name={"Submit"}
          loading={loading}
        />
      </form>
    </>
  );
};

export default AddNewAccommodations;
