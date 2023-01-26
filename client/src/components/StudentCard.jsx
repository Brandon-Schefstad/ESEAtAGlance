import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { React, useState } from 'react';
const StudentCard = ({student, index, getDashboard}) => {
  const [showStudent, setShowStudent] = useState(false)
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
  return showStudent ? (
    <div>
    <section
    onClick={()=>setShowStudent(!showStudent)}
      className={
        index % 2 === 0
          ? " relative rounded-lg border-[2px] border-solid border-black bg-green-900 py-8"
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
) : <><section onClick={()=>setShowStudent(!showStudent)}
className={
  index % 2 === 0
    ? " relative rounded-lg  bg-green-900 py-4 h-20 text-center"
    : "relative rounded-lg  bg-red-800 py-4 h-20  text-center "
}
><span className='text-white  text-3xl'>{student.firstName + ' ' + student.lastName}</span></section></>
}

export default StudentCard