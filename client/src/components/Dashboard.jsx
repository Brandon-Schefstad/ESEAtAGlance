import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
const Dashboard = () => {
  const [auth, setAuth] = useState(true);
  const [students, setStudents] = useState();
  async function getDashboard() {
    console.log(localStorage.getItem("auth"));
    const response = await axios.get(
      `http://localhost:5501/api/dashboard/${localStorage.getItem("_id")}`,
      {
        headers: {
          authorization: localStorage.getItem("auth"),
        },
      }
    );
    const { studentList } = await response.data;
    setStudents(studentList);
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
        <section className="   pt-4 ">
          <div className="my-4 mx-8 font-[Martel] text-5xl font-extrabold text-green-900">
            Your Students
          </div>

          <section className="grid gap-8  px-4 py-4 text-black sm:px-12 md:mx-12 lg:grid-cols-2 xl:mt-8 xl:grid-cols-3 ">
            {students ? (
              students.map((student) => {
                return (
                  <div>
                    <section className=" rounded-lg bg-green-900 py-8">
                      <section className=" grid grid-cols-2 bg-rose-50 p-4 xl:gap-8">
                        <img
                          src={
                            student.image
                              ? student.image
                              : "https://www.theyearinpictures.co.uk/images//image-placeholder.png"
                          }
                          alt=""
                          className=" m-auto h-36"
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
