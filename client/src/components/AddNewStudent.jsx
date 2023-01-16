import axios from "axios";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import AddNewGoals from "./AddNewGoals";
import ButtonWithLoader from "./ButtonWithLoader";
import Navbar from "./Navbar";
const AddNewStudent = () => {
  const [nextPage, setNextPage] = useState(false);
  const [success, setSuccess] = useState(false);
  const [student_id, setStudent_id] = useState(null);
  const [studentToSend, setStudentToSend] = useState({});

  async function postNewStudent(e) {
    const response = await axios.post(
      "https://ese-at-a-glance-api.cyclic.app/api/student/addNewStudent",
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
        className=" m-8 grid grid-cols-2 gap-6   bg-amber-200/30  pt-2 text-slate-800 shadow-md shadow-amber-900 xl:mx-auto xl:w-5/6 xl:px-12 xl:pb-12"
        onSubmit={postNewStudent}
      >
        <h1 className="col-span-2 mx-[-3rem] mt-[-.5rem] bg-green-800 font-[Martel] text-2xl font-semibold text-amber-100 xl:py-4 xl:text-center xl:text-4xl">
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

        <ButtonWithLoader
          onClick={() => alert("hello")}
          handleClick={postNewStudent}
          className={"m-auto w-1/2 rounded-lg py-2"}
          name={"Submit"}
        />
      </form>
    </>
  );
};

export default AddNewStudent;

// TODO - Add image support
