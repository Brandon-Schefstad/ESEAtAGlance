import axios from "axios";
import { React, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AccommsSection from "./AccommsSection";
import ButtonWithLoader from "./ButtonWithLoader";
import Navbar from "./Navbar";
import { accommodations } from "./utils/accommodations";
import apiURL from "./utils/apiURL";
import bannerStyles from "./utils/styles";

const AddNewAccommodations = () => {
  const { presentation, response, scheduling, setting } = accommodations;
  const [studentFinished, setStudentFinished] = useState(false);
  const [studentId, setStudentId] = useState(0);
  const [loading, setLoading] = useState(false);
  const pathName = useLocation().pathname.split("/")[2];

  let accommodationsToSend = [];
  function handleChange(name) {
    accommodationsToSend.includes(name)
      ? accommodationsToSend.splice(accommodationsToSend.indexOf(name), 1)
      : accommodationsToSend.push(name);
  }
  async function postNewAccommodations(e) {
    setLoading(true);
    e.preventDefault();
    const { status } = await axios
      .post(
        `${apiURL}api/student/addNewAccommodations`,
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
  return studentFinished ? (
    <Navigate to="/Dashboard" />
  ) : pathName ? (
    <>
      {" "}
      <Navbar />
      <h1 className={bannerStyles}>Add accommodations to 's profile</h1>{" "}
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
            placeholder={pathName}
            onChange={(e) => setStudentId(e.target.value)}
            className=" mb-4 border-2 border-solid border-rose-400/50 bg-gray-50 py-2 pl-2 placeholder:text-xl placeholder:text-black xl:col-span-2 xl:w-3/4 xl:text-xl"
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
  ) : (
    <>
      <Navbar />
      <h1 className={bannerStyles}>Add accommodations to a student profile</h1>
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
            placeholder={pathName}
            onChange={(e) => setStudentId(e.target.value)}
            className=" mb-4 border-2 border-solid border-rose-400/50 bg-gray-50 py-2 pl-2 placeholder:text-xl placeholder:text-black xl:col-span-2 xl:w-3/4 xl:text-xl"
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
