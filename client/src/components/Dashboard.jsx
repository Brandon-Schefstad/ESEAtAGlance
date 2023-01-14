import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
const Dashboard = () => {
  const [auth, setAuth] = useState(true);
  const [students, setStudents] = useState();
  async function getDashboard() {
    const response = await axios.get(
      "https://ese-at-a-glance-api.cyclic.app/api/dashboard",
      {
        user: localStorage.getItem("auth"),
      }
    );
    const { studentList } = response.data;
    setStudents(studentList);
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
        <Navbar />
        <section className=" min-h-screen  pt-4 ">
          <div className="my-4 text-5xl font-extrabold text-green-900">
            Dashboard
          </div>

          <section className="grid gap-8 px-4 py-4 text-black sm:px-24 md:grid-cols-2 md:px-12 lg:grid-cols-3 xl:grid-cols-4">
            {students ? (
              students.map((student) => {
                return (
                  <div>
                    <section className="name-wrapper relative z-0 rounded-t-lg bg-green-900 py-2 px-8 text-left text-2xl font-extrabold tracking-wider text-white  ">
                      <span className="text-center">
                        {student.firstName + " " + student.lastName}
                      </span>
                    </section>
                    <section
                      className="  mt-[-0.25rem] grid rounded-lg border-x-2 border-b-2 border-amber-400 bg-amber-200 pb-8 text-xl "
                      key={student._id}
                    >
                      <section className={rowStyles}>
                        <span className="text-left">ID Number: </span>
                        <span className="">{student.ID}</span>
                      </section>
                      <section className={rowStyles}>
                        <span className="text-left">Grade: </span>
                        <span className="">{student.grade}</span>
                      </section>
                      <section className={rowStyles}>
                        <span className="text-left">Primary: </span>
                        <span className="">
                          {student.primaryExceptionality}
                        </span>
                      </section>
                      <section className={rowStyles}>
                        <span className="text-left">IEP Due:</span>

                        <span className="">
                          {student.IEPDueDate.split("T")[0].toString()}
                        </span>
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
        <Footer setAuth={setAuth} auth={auth} />
      </>
    );
  }
};

export default Dashboard;
