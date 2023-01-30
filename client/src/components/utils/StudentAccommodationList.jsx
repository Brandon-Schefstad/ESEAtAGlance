import React from "react";

const StudentAccommodationList = ({ domain, accommsList }) => {
  return accommsList.length > 0 ? (
    <section className=" mt-4  xl:col-span-4 xl:mt-0 xl:p-2">
      <h2 className=" mb-2 ml-4 text-2xl font-semibold underline underline-offset-2 xl:ml-0">
        {domain}
      </h2>
      {
        <ul className=" mx-4 flex list-[circle] flex-col  p-2 md:col-span-4 md:grid md:list-none md:grid-cols-2 md:gap-2 md:px-0 md:py-2 xl:gap-4 xl:py-4">
          {accommsList.map((entry, index) => {
            return (
              <li
                key={index}
                className=" mx-4  md:bg-green-900  md:px-2 md:py-2 md:text-center md:text-sm md:text-white xl:m-auto xl:w-5/6"
              >
                {entry}
              </li>
            );
          })}
        </ul>
      }
    </section>
  ) : (
    <></>
  );
};

export default StudentAccommodationList;
