import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import StudentCard from "./StudentCard";
import apiURL from "./utils/apiURL";
import bannerStyles from "./utils/styles";
const Dashboard = () => {
  const [auth, setAuth] = useState(true);
  const [students, setStudents] = useState();
  async function getDashboard() {
    const response = await axios.get(
      `${apiURL}api/dashboard/${localStorage.getItem("_id")}`,
      {
        headers: {
          authorization: localStorage.getItem("auth"),
        },
      }
    );
    const { studentList } = await response.data;
    setStudents(studentList);
  }

  useEffect(() => {
    getDashboard();
  }, []);

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
              return (
                <StudentCard
                  student={student}
                  index={index}
                  getDashboard={getDashboard}
                />
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
};

export default Dashboard;
