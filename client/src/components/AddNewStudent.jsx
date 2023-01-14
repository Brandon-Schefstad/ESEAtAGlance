import axios from "axios";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import AddNewGoals from "./AddNewGoals";
import Navbar from "./Navbar";
const AddNewStudent = () => {
  // const [nextPage, setNextPage] = useState(false);
  const [success, setSuccess] = useState(false);
  const [student_id, setStudent_id] = useState(null);
  const [studentToSend, setStudentToSend] = useState({});

  async function postNewStudent(e) {
    e.preventDefault();
    const response = await axios.post(
      "/api/student/addNewStudent",
      studentToSend
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
    "ml-2 bg-green-700  border-b-2 border-amber-200 border-solid col-span-2 pl-2 py-2 placeholder:text-yellow-100 placeholder:text-xl text-amber-100 xl:text-xl";
  const titleStyles = "block col-span-2 text-xl mb-2 font-semibold ";
  return nextPage ? (
    <Navigate to="/addNewGoals" />
  ) : success ? (
    <AddNewGoals student_id={student_id} />
  ) : (
    <>
      <Navbar />
      <form
        className=" mt-8 grid grid-cols-2 gap-4 bg-green-800 p-6 pt-8  text-amber-100 xl:mx-auto xl:w-5/6 xl:p-12 "
        onSubmit={postNewStudent}
      >
        <h1 className="col-span-2 text-2xl font-semibold xl:text-3xl">
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
