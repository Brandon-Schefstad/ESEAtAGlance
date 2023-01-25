import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import bannerStyles from "./utils/styles";
const Dashboard = () => {
  const [auth, setAuth] = useState(true);
  const [students, setStudents] = useState();
  async function getDashboard() {
    console.log(localStorage.getItem("auth"));
    const response = await axios.get(
      `https://ese-at-a-glance-api.cyclic.app/api/dashboard/${localStorage.getItem(
        "_id"
      )}`,
      {
        headers: {
          authorization: localStorage.getItem("auth"),
        },
      }
    );
    const { studentList } = await response.data;
    setStudents(studentList);
  }
  async function deleteStudent(ID) {
    let result = await axios.delete(
      "https://ese-at-a-glance-api.cyclic.app/api/student/deleteStudent",
      {
        headers: {
          Authorization: localStorage.getItem("auth"),
        },
        data: {
          ID,
        },
      }
    );
    result.status === 200 ? getDashboard() : console.error(result.status);
  }
  function makeHeading(index) {
    switch (index) {
      case 0:
        return "Kindergarten";
      case 1:
        return "1st Grade";
      case 2:
        return "2nd Grade";
      case 3:
        return "3rd Grade";

      default:
        return `${index}th Grade`;
    }
  }
  useEffect(() => {
    getDashboard();
  }, []);
  const rowStyles =
    "grid grid-cols-2 border-2 border-solid border-b-green-400 pl-10 py-2 text-lg";
  {
    return !auth ? (
      <Navigate to="/" />
    ) : (
      <>
        <Navbar setAuth={setAuth} auth={auth} />
        <section className="   ">
          <div className={bannerStyles}>Your Students</div>

          <section className="grid gap-8  px-4 py-4 text-black sm:px-12 md:mx-12 lg:grid-cols-2 xl:mt-8 xl:grid-cols-3 ">
            {students ? (
              students.map((student, index) => {
                console.log(student.image);
                return (
                  <div>
                    <section
                      className={
                        index % 2 === 0
                          ? " relative rounded-lg border-[2px] border-solid border-black bg-blue-900 py-8"
                          : "relative rounded-lg border-[2px] border-solid border-black bg-red-800 py-8 "
                      }
                    >
                      <button
                        onClick={() => deleteStudent(student.ID)}
                        className="absolute right-0 mr-2"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                      <section className=" grid gap-4 bg-white p-4 text-center align-middle sm:grid-cols-2 xl:gap-4 xl:px-8 xl:py-8">
                        <img
                          src={student.image}
                          alt={`Image of ${student.firstName} ${student.lastName}`}
                          className=" m-auto max-h-36 rounded-full xl:ml-8 xl:max-h-40 "
                        />
                        <section className=" my-auto flex flex-col">
                          <section className="mb-2 text-xl">
                            <span className="block">
                              {student.firstName} {student.lastName}
                            </span>
                            <span>ID: {student.ID}</span>
                            <span className="mb-2 block">
                              {makeHeading(student.grade)}
                            </span>
                          </section>

                          <section className="text-sm">
                            <span className="block">
                              {student.caseManager.firstName + " "}
                              {student.caseManager.lastName}
                            </span>
                            <span className="block">
                              Primary: {student.primaryExceptionality}
                            </span>
                            <span className="block">
                              IEP Due: {student.IEPDueDate.split("T")[0]}
                            </span>
                          </section>
                        </section>
                      </section>
                    </section>
                  </div>
                );
              })
            ) : (
              <></>
            )}
          </section>
        </section>
        <Footer />
      </>
    );
  }
};

export default Dashboard;
