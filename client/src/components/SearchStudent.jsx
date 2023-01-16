import axios from "axios";
import React, { useState } from "react";
import AccommodationList from "./AccommodationList";
import GoalDisplay from "./GoalDisplay";
import Navbar from "./Navbar";
const SearchStudent = () => {
  const [student, setStudent] = useState(false);
  const [studentIdToSend, setStudentIdToSend] = useState();
  async function searchStudent(e) {
    e.preventDefault();
    const { data, status } = await axios.get(
      `https://ese-at-a-glance-api.cyclic.app /api/student/searchStudent/${studentIdToSend}`,
      {
        headers: {
          authorization: localStorage.getItem("auth"),
        },
      }
    );
    if (status === 200) {
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
      <section className="mx-8 mt-8 flex gap-16 bg-amber-100 py-4 px-8 text-slate-800  xl:text-3xl">
        <form onSubmit={searchStudent}>
          <label
            htmlFor="studentId"
            className=""
            onChange={(e) => setStudentIdToSend(e.target.value)}
          >
            Enter Student Id:{" "}
            <input type="number" className="pl-2 text-black" />
          </label>
        </form>
      </section>
      {student ? (
        <>
          <section className="mt-8  bg-green-900 pt-8 shadow-lg shadow-amber-900 xl:mx-auto xl:w-3/4 xl:pt-12 xl:text-xl">
            <section className="bg-amber-100 px-2 pt-4 text-black xl:pt-0 xl:pb-8">
              <section className="grid xl:grid-cols-2 ">
                <section className="text-md flex flex-col gap-2  xl:mt-[0rem] xl:h-full xl:gap-6 xl:border-r-2  xl:border-dashed xl:border-rose-500/50">
                  <section className="grid grid-cols-2 border-b-2 border-dashed border-rose-500/50 px-6 xl:mt-6 xl:px-12 xl:text-xl">
                    <h1 class="">Name: </h1>
                    <h1 class="my-auto">{student.name}</h1>
                  </section>
                  <section className="grid grid-cols-2 border-b-2 border-dashed border-rose-500/50 px-6 xl:px-12  xl:text-xl">
                    <h2 class="">Id: </h2>
                    <h2 class="my-auto">{student.ID} </h2>
                  </section>
                  <section className="grid grid-cols-2 border-b-2 border-dashed border-rose-500/50 px-6 xl:px-12  xl:text-xl">
                    <h2 class="">Grade: </h2>
                    <h2 class="my-auto">{student.grade} </h2>
                  </section>
                  <section className="grid grid-cols-2 border-b-2 border-dashed border-rose-500/50 px-6 xl:px-12  xl:text-xl">
                    <h2 class="">Exceptionality: </h2>
                    <h2 class="my-auto">{student.primary} </h2>
                  </section>
                  <section className="grid grid-cols-2 border-b-2 border-dashed border-rose-500/50 px-6 xl:px-12 xl:pb-2 xl:text-xl">
                    <h2 className="my-auto ">Case Manager: </h2>
                    <h2 class="my-auto w-[120%]">{student.caseManager} </h2>
                  </section>
                </section>
                <img
                  className="my-6 xl:m-auto xl:my-0 xl:w-3/5"
                  src={student.image}
                  alt=""
                />
              </section>
              <section className="accommodations grid xl:mt-8 xl:grid-cols-4">
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
          <h2 className="my-4 text-4xl">Goal History</h2>

          <span>
            {student.history.map((grade, index) => {
              return grade.length > 0 ? (
                <>
                  <h3 class="my-2 text-2xl">{makeHeading(index)}</h3>
                  <section className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {grade.map((goal) => {
                      return <GoalDisplay goal={goal} />;
                    })}
                  </section>
                </>
              ) : (
                <></>
              );
            })}
          </span>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default SearchStudent;
