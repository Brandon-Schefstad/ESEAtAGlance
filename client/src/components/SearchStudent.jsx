import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ButtonWithLoader from "./ButtonWithLoader";
import searchStudent from "./fetch/searchStudent";
import GoalDisplay from "./GoalDisplay";
import Navbar from "./Navbar";
import makeHeading from "./utils/makeHeading";
import StudentAccommodationList from "./utils/StudentAccommodationList";

const SearchStudent = () => {
  const urlId = useLocation().pathname.split("/")[2];
  const [student, setStudent] = useState(false);
  const [stopLoading, setStopLoading] = useState(false);
  const [studentIdToSend, setStudentIdToSend] = useState(urlId || 0);
  const [warning, setWarning] = useState(false);
  console.log(`stop Loading: ${stopLoading}`);
  useEffect(() => {
    if (urlId && typeof urlId) {
      setStopLoading(true);
      searchStudent(studentIdToSend, setWarning, setStudent);
      setStopLoading(false);
    }
  }, [urlId]);

  return (
    <section className="">
      <Navbar />
      {warning ? <h1>Error, no student found</h1> : <></>}
      <section>
        <form className=" mb-4 flex flex-col items-center gap-4 border-b-2  border-solid border-green-900 px-6 pt-4 pb-6 align-middle text-green-900 md:px-12 lg:flex-row lg:px-20  xl:mx-auto xl:my-0 xl:py-4 xl:px-16 xl:text-4xl ">
          <label htmlFor="studentId" className=" font-semibold ">
            Student Id:{" "}
          </label>
          <input
            onChange={(e) => setStudentIdToSend(e.target.value)}
            type="number"
            placeholder={"Enter"}
            className="border-b-2 border-solid border-black bg-yellow-50 px-2 py-1 text-xl text-black placeholder:text-black "
          />
          <ButtonWithLoader
            handleClick={() =>
              searchStudent(
                studentIdToSend,
                setWarning,
                setStudent,
                setStopLoading
              )
            }
            className={
              " m-auto mt-4 rounded-lg bg-green-200 text-green-900 xl:my-auto xl:ml-8 "
            }
            name={"Search"}
            stopLoading={stopLoading}
          />
        </form>
      </section>
      {student && !warning ? (
        <>
          <section className=" mx-auto lg:w-3/4 xl:w-5/6 xl:text-xl">
            <section className="  px-2 pt-4 pb-8 text-black xl:grid xl:grid-cols-3 xl:gap-8 xl:px-12 xl:pt-4 xl:pb-4">
              <section className="xl:my-4 xl:grid ">
                <section className="text-md xl:max-h-1/2 m-auto flex flex-col gap-2 border-2 border-solid border-black bg-blue-100 py-4 md:w-2/3 xl:my-auto xl:w-full xl:gap-6">
                  <img
                    className="m-auto my-6 w-2/3 rounded-full border-2 border-solid border-white lg:w-1/3 xl:my-0 xl:w-3/5"
                    src={student.image}
                    alt={`${student.firstName} ${student.lastName}`}
                  />
                  <h1 className="my-auto px-6 text-center text-2xl font-bold text-blue-900 xl:mt-6 xl:px-12 xl:text-center xl:text-4xl ">
                    {student.name}
                  </h1>
                  <h2 className="text-center text-sm xl:mb-[-1rem]">
                    {student.caseManager.email}{" "}
                  </h2>
                  <section className="md:text-md m-auto grid grid-cols-3 gap-4  text-center font-semibold lg:text-lg xl:text-xl">
                    <h2 className="">{student.ID} </h2>
                    <h2 className="">{makeHeading(student.grade)} </h2>
                    <h2 className="">{student.primary} </h2>
                  </section>
                </section>
              </section>
              <section className="accommodations grid p-4 xl:col-span-2 xl:grid-cols-4">
                <StudentAccommodationList
                  domain={"Presentation"}
                  accommsList={student.presentationList}
                />
                <StudentAccommodationList
                  domain={"Response"}
                  accommsList={student.responseList}
                />
                <StudentAccommodationList
                  domain={"Scheduling"}
                  accommsList={student.schedulingList}
                />
                <StudentAccommodationList
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
                  <h3 className="my-2 text-2xl underline underline-offset-2 xl:ml-12">
                    {makeHeading(index)}
                  </h3>
                  <section className="grid sm:px-12 md:px-36 lg:grid-cols-2 lg:px-2 xl:mx-16 xl:grid-cols-3 xl:py-4">
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

export default SearchStudent;
