import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { React, useState } from "react";
import apiURL from "./utils/apiURL";
import makeHeading from "./utils/makeHeading";
const StudentCard = ({ student, index, getDashboard }) => {
  const [showStudent, setShowStudent] = useState(false);

  async function deleteStudent(ID) {
    let result = await axios.delete(`${apiURL}api/student/deleteStudent`, {
      headers: {
        Authorization: localStorage.getItem("auth"),
      },
      data: {
        ID,
      },
    });
    result.status === 200 ? getDashboard() : console.error(result.status);
  }
  return showStudent ? (
    <button
      onClick={() => setShowStudent(!showStudent)}
      className={
        index % 2 === 0
          ? " relative  border-[2px] border-solid border-black bg-green-900 py-8"
          : "relative  border-[2px] border-solid border-black bg-red-900 py-8 "
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
          alt={`${student.firstName} ${student.lastName}`}
          className=" m-auto max-h-36 rounded-full xl:ml-8 xl:max-h-40 "
        />
        <section className=" my-auto flex flex-col">
          <section className="mb-2 text-xl">
            <span className="block">
              {student.firstName} {student.lastName}
            </span>
            <span>ID: {student.ID}</span>
            <span className="mb-2 block">{makeHeading(student.grade)}</span>
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
    </button>
  ) : (
    <button onClick={() => setShowStudent(!showStudent)}>
      <section
        className={
          index % 2 === 0
            ? " relative  h-20 bg-green-900 py-4 text-center"
            : "relative  h-20 bg-red-900 py-4  text-center "
        }
      >
        <span className="text-3xl  text-white">
          {student.firstName + " " + student.lastName} - {student.ID}
        </span>
      </section>
    </button>
  );
};

export default StudentCard;
