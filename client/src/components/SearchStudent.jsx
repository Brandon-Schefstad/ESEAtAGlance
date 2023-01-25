import axios from "axios";
import React, { useState } from "react";
import AccommodationList from "./AccommodationList";
import ButtonWithLoader from "./ButtonWithLoader";
import GoalDisplay from "./GoalDisplay";
import Navbar from "./Navbar";
const AddNewStudent = () => {
  const [student, setStudent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [studentIdToSend, setStudentIdToSend] = useState();
  const [warning, setWarning] = useState(false);
  async function searchStudent(e) {
    console.log(studentIdToSend);
    setLoading(true);
    e.preventDefault();
    const { data, status } = await axios
      .get(
        `https://ese-at-a-glance-api.cyclic.app/api/student/searchStudent/${studentIdToSend}`,
        {
          headers: {
            authorization: localStorage.getItem("auth"),
          },
        }
      )
      .catch(() => {
        setLoading(false);
        setWarning(true);
      });
    if (status === 200) {
      setWarning(false);
      setLoading(false);
      setStudent(data);
    }
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
  return (
    <section className="bg-white">
      <Navbar />
      {warning ? <h1>Error, no student found</h1> : <></>}
      <section>
        <form className=" mb-4 flex flex-col items-center gap-4 bg-green-900 px-6  pt-4 pb-6 align-middle text-white md:px-12 lg:flex-row lg:px-20 xl:mx-auto xl:my-0 xl:py-8  xl:px-16 xl:text-4xl ">
          <label htmlFor="studentId" className=" ">
            Enter Student Id:{" "}
          </label>
          <input
            onChange={(e) => setStudentIdToSend(e.target.value)}
            type="number"
            className="px-2 py-1 text-xl text-black"
          />
          <ButtonWithLoader
            handleClick={(e) => searchStudent(e)}
            className={
              " m-auto mt-4 rounded-lg bg-white text-green-900 xl:my-auto xl:ml-8 "
            }
            name={"Search"}
            loading={loading}
          />
        </form>
      </section>
      {student && !warning ? (
        <>
          <section className=" mx-auto lg:w-3/4 xl:w-5/6 xl:text-xl">
            <section className="  px-2 pt-4 pb-8 text-black xl:grid xl:grid-cols-3 xl:gap-8 xl:px-12 xl:pt-4 xl:pb-4">
              <section className="xl:my-4 xl:grid ">
                <section className="text-md xl:max-h-1/2 m-auto flex flex-col gap-2 border-2 border-solid border-black bg-amber-50 py-4 md:w-2/3 xl:my-auto xl:w-full xl:gap-6">
                  <img
                    className="m-auto my-6 w-2/3 rounded-full border-2 border-solid border-white lg:w-1/3 xl:my-0 xl:w-3/5"
                    src={student.image}
                    alt={`Image of ${student.firstName} ${student.lastName}`}
                  />
                  <h1 class="my-auto px-6 text-center text-2xl font-bold text-green-900 xl:mt-6 xl:px-12 xl:text-center xl:text-4xl ">
                    {student.name}
                  </h1>
                  <h2 class="text-center text-sm xl:mb-[-1rem]">
                    {student.caseManager.email}{" "}
                  </h2>
                  <section className="md:text-md m-auto grid grid-cols-3 gap-4  text-center font-semibold lg:text-lg xl:text-xl">
                    <h2 class="">{student.ID} </h2>
                    <h2 class="">{makeHeading(student.grade)} </h2>
                    <h2 class="">{student.primary} </h2>
                  </section>
                </section>
              </section>
              <section className="accommodations grid p-4 xl:col-span-2 xl:grid-cols-4">
                <AccommodationList
                  domain={"Presentation"}
                  accommsList={student.presentationList}
                />
                <AccommodationList
                  domain={"Response"}
                  accommsList={student.responseList}
                />
                <AccommodationList
                  domain={"Scheduling"}
                  accommsList={student.schedulingList}
                />
                <AccommodationList
                  domain={"Setting"}
                  accommsList={student.settingList}
                />
              </section>
            </section>
          </section>

          <section className="pb-8 xl:px-28">
            <h2 className=" my-4 text-3xl font-bold xl:ml-12   ">
              Goal History
            </h2>
            {student.history.map((grade, index) => {
              return grade.length > 0 ? (
                <>
                  <h3 class="my-2 text-2xl underline underline-offset-2 xl:ml-12">
                    {makeHeading(index)}
                  </h3>
                  <section className="grid bg-amber-100 sm:px-12 md:px-36 lg:grid-cols-2 lg:px-2 xl:mx-16 xl:grid-cols-3 xl:py-4">
                    {grade.map((goal) => {
                      return <GoalDisplay goal={goal} />;
                    })}
                  </section>
                </>
              ) : (
                <></>
              );
            })}
          </section>
        </>
      ) : (
        <></>
      )}
    </section>
  );
};

export default AddNewStudent;
