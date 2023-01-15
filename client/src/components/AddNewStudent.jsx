import axios from "axios";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import AddNewGoals from "./AddNewGoals";
import Navbar from "./Navbar";
const AddNewStudent = () => {
  const [nextPage, setNextPage] = useState(false);
  const [success, setSuccess] = useState(false);
  const [student_id, setStudent_id] = useState(null);
  const [studentToSend, setStudentToSend] = useState({});

  async function postNewStudent(e) {
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:5501/api/student/addNewStudent",

      { studentToSend: studentToSend, _id: localStorage.getItem("_id") },
      {
        headers: {
          authorization: localStorage.getItem("auth"),
        },
      }
    );
    if (response.status === 200) {
      setStudent_id(response.data.ID);
      setSuccess(true);
    }
  }
  function setStateOnChange(e) {
    setStudentToSend(
      studentToSend,
      ...(studentToSend[e.target.name] = e.target.value)
    );
  }
  const inputStyles =
    "ml-2 bg-gray-50 border-2 border-rose-500/50 border-solid col-span-2 pl-2 py-2 placeholder:text-yellow-100 placeholder:text-xl text-green-900 xl:text-xl";
  const titleStyles =
    "block col-span-2 text-xl mb-2 font-semibold xl:text-2xl ";
  return nextPage ? (
    <Navigate to="/addNewGoals" />
  ) : success ? (
    <AddNewGoals student_id={student_id} />
  ) : (
    <>
      <Navbar />
      <form
        className=" m-8 grid grid-cols-2 gap-6   bg-amber-200/30  pt-2 text-green-900 shadow-md shadow-amber-900 xl:mx-auto xl:w-5/6 xl:px-12 xl:pb-12"
        onSubmit={postNewStudent}
      >
        <h1 className="col-span-2 mx-[-3rem] mt-[-.5rem] bg-green-800 font-[Martel] text-2xl font-semibold text-amber-100 xl:py-4 xl:text-center xl:text-3xl">
          Student Information
        </h1>
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
        <section className=" ">
          <span className=" block ">IEP Due Date:</span>
          <input
            type="date"
            onChange={(e) => setStateOnChange(e)}
            name="IEP"
            className={inputStyles + "+ col-span-2 w-full px-4"}
          />
        </section>
        {/* <input
					type="file"
					id="image"
					onChange={(e) => {
						const fileToSend = e.target.files[0]
						setStudentProfileImage(fileToSend)
					}}
					name="image"
					encType="multipart/form-data"
				/> */}
        <input
          className="m-auto mt-4 bg-amber-400 py-4 px-8 font-extrabold text-green-800 xl:w-1/2 xl:text-2xl"
          type="submit"
          value="Submit"
        />
      </form>
    </>
  );
};

export default AddNewStudent;

// TODO - Add image support
