import axios from "axios";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import AddNewGoals from "./AddNewGoals";
import ButtonWithLoader from "./ButtonWithLoader";
import Navbar from "./Navbar";
const AddNewStudent = () => {
  const [success, setSuccess] = useState(false);
  const [student_id, setStudent_id] = useState(null);
  const [studentToSend, setStudentToSend] = useState({});
  const [loading, setLoading] = useState(false);

  async function postNewStudent(e) {
    e.preventDefault();
    setLoading(true);
    const response = await axios
      .post(
        "https://ese-at-a-glance-api.cyclic.app/api/student/addNewStudent",

        { studentToSend: studentToSend, _id: localStorage.getItem("_id") },
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
    " bg-gray-50 border-2 border-rose-400/50 border-solid col-span-2 pl-2 py-2 placeholder:text-yellow-100 placeholder:text-xl  xl:text-xl";
  const titleStyles =
    "block col-span-2 text-xl mb-2 font-semibold xl:text-2xl ";
  return success ? (
    <Navigate to="/addNewGoals" />
  ) : student_id ? (
    <AddNewGoals student_id={student_id} />
  ) : (
    <>
      <Navbar />
      <h1 className="col-span-2 mt-4 mb-8 bg-blue-200 px-8 pt-4 pb-2 text-left font-[Martel] text-3xl font-semibold text-blue-900 xl:py-4 xl:text-center xl:text-4xl">
        Student Information
      </h1>
      <form className=" mx-8 grid grid-cols-2 gap-4 bg-amber-100  px-6 pt-4 pb-6   text-slate-800 shadow-md  xl:mx-auto xl:w-5/6 xl:px-12 xl:pb-12">
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
          handleClick={(e) => postNewStudent(e)}
          className={
            "m-auto mt-6 rounded-lg bg-green-200 py-2 text-green-800 xl:w-64 xl:text-2xl"
          }
          name={"Submit"}
          loading={loading}
        />
      </form>
    </>
  );
};

export default AddNewStudent;

// TODO - Add image support
