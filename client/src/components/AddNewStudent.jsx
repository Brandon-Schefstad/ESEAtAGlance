import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import ButtonWithLoader from "./ButtonWithLoader";
import addNewStudent from "./fetch/addNewStudent";
import Navbar from "./Navbar";
import UploadWidget from "./UploadWidget";
import bannerStyles from "./utils/styles";
const AddNewStudent = () => {
  const [success, setSuccess] = useState(false);
  const [studentToSend, setStudentToSend] = useState({});
  const [imageUrl, setImageUrl] = useState();

  function setStateOnChange(e) {
    setStudentToSend(
      studentToSend,
      ...(studentToSend[e.target.name] = e.target.value)
    );
  }
  const inputStyles =
    " bg-gray-50 border-2 border-rose-400/50 border-solid col-span-2 pl-2 py-2 placeholder:text-yellow-100 placeholder:text-xl  xl:text-xl mb-4";
  const titleStyles =
    "block col-span-2 text-xl mb-2 font-semibold xl:text-2xl ";
  return success ? (
    <Navigate to="/addNewGoals" />
  ) : (
    <>
      <Navbar />

      <h1 className={bannerStyles}>Enter Demographic Information</h1>
      <form className=" mx-8 grid grid-cols-2 gap-4 bg-amber-100  px-6 pt-4 pb-6   text-slate-800 shadow-md md:px-12 lg:px-20 lg:py-12 xl:mx-auto xl:w-5/6 xl:px-24 xl:pb-12 xl:shadow-lg xl:shadow-blue-900/50">
        <section className=" col-span-2">
          <span className={titleStyles}>First Name:</span>
          <input
            type="text"
            onChange={(e) => setStateOnChange(e)}
            name="firstName"
            className={inputStyles + "+ col-span-2 w-full px-4"}
          />
        </section>
        <section className=" col-span-2">
          <span className={titleStyles}>Last Name:</span>
          <input
            type="text"
            onChange={(e) => setStateOnChange(e)}
            name="lastName"
            className={inputStyles + "col-span-2 w-full px-4"}
          />
        </section>
        <section className=" col-span-2 md:col-span-1 ">
          <span className={titleStyles}>Student Number:</span>
          <input
            type="number"
            onChange={(e) => setStateOnChange(e)}
            name="ID"
            className={inputStyles + "+ w-full px-4"}
          />
        </section>
        <section className="  col-span-2 md:col-span-1">
          <span className={titleStyles}>Grade:</span>
          <input
            type="number"
            onChange={(e) => setStateOnChange(e)}
            name="grade"
            className={inputStyles + "+ col-span-2 w-full px-4"}
          />
        </section>
        <section className=" col-span-2">
          <span className={titleStyles}>Exceptionality:</span>
          <input
            type="text"
            onChange={(e) => setStateOnChange(e)}
            name="primary"
            className={inputStyles + "+ col-span-2 w-full px-4"}
          />
        </section>
        <section className="col-span-2 grid grid-cols-2 ">
          <span className=" block ">IEP Due Date:</span>
          <input
            type="date"
            onChange={(e) => setStateOnChange(e)}
            name="IEP"
            className={inputStyles + "+ col-span-2 w-full px-4"}
          />

          <section className="col-span-2 m-auto mt-4 rounded-lg bg-blue-200 py-2 px-4  font-bold text-blue-900 sm:col-span-1 sm:py-4 lg:mt-8 lg:px-12 lg:text-2xl">
            <UploadWidget setImageUrl={setImageUrl} />
          </section>
          <ButtonWithLoader
            handleClick={(e) =>
              addNewStudent(studentToSend, imageUrl, setSuccess, e)
            }
            className={
              "text-md col-span-2 m-auto mt-4 rounded-lg bg-green-200 py-2 px-4 font-bold text-green-900 sm:col-span-1 sm:py-4 lg:mt-8 lg:px-12 lg:text-2xl"
            }
            name={"Next"}
          />
        </section>
      </form>
    </>
  );
};

export default AddNewStudent;
