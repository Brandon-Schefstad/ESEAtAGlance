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
        `http://localhost:5501/api/student/searchStudent/${studentIdToSend}`,
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
    <>
      <Navbar />
      {warning ? <h1>Error, no student found</h1> : <></>}
      <section>
        <form className=" my-4 flex flex-col gap-4 bg-amber-100 px-6 pt-4 pb-6 text-slate-800 shadow-md md:px-12  lg:flex-row lg:px-20 lg:py-12 xl:mx-auto xl:mt-8 xl:w-1/2 xl:px-16 xl:pb-12 xl:shadow-md xl:shadow-blue-900/50">
          <label htmlFor="studentId" className="text-2xl font-semibold">
            Enter Student Id:{" "}
          </label>
          <input
            onChange={(e) => setStudentIdToSend(e.target.value)}
            type="number"
            className="px-2 text-black"
          />
          <ButtonWithLoader
            handleClick={(e) => searchStudent(e)}
            className={
              "m-auto mt-4 rounded-lg bg-green-200 py-2 text-green-800 xl:ml-8 xl:mt-[-0.5rem]"
            }
            name={"Search"}
            loading={loading}
          />
        </form>
      </section>
      {student && !warning ? (
        <>
          <section className=" mx-auto lg:w-3/4 xl:w-5/6  xl:pt-12 xl:text-xl">
            <section className=" bg-blue-100 px-2 pt-4 pb-8 text-black xl:grid xl:grid-cols-3 xl:gap-8 xl:px-12 xl:pt-4 xl:pb-4">
              <section className="xl:my-4 xl:grid ">
                <section className="text-md xl:max-h-1/2 m-auto flex flex-col gap-2 border-2 border-solid border-black bg-white py-4 md:w-2/3 xl:my-auto xl:w-full xl:gap-6">
                  <img
                    className="m-auto my-6 w-2/3 rounded-full border-2 border-solid border-white lg:w-1/3 xl:my-0 xl:w-3/5"
                    src={student.image}
                    alt={`Image of ${student.firstName} ${student.lastName}`}
                  />
                  <h1 class="my-auto px-6 text-center text-2xl font-bold text-blue-800 xl:mt-6 xl:px-12 xl:text-center xl:text-4xl ">
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
              <section className="accommodations grid xl:col-span-2 xl:grid-cols-4">
                <h1 class="my-auto pt-6 text-center text-2xl font-bold text-black md:text-3xl lg:text-4xl  xl:col-span-4  xl:pt-0 xl:text-4xl ">
                  Accommodations
                </h1>
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
                  <h3 class="my-2 text-2xl xl:ml-12">{makeHeading(index)}</h3>
                  <section className="grid bg-amber-100 sm:px-12 md:px-36 lg:grid-cols-2 lg:px-4 xl:grid-cols-3 xl:py-8">
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
    </>
  );
};

export default AddNewStudent;
