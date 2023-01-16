import React from "react";

const AccommodationList = ({ domain, accommsList }) => {
  return (
    <section className="mb-2 border-t-2 border-dashed border-rose-500/50 xl:col-span-4 xl:p-2">
      <h2 className=" text-2xl ">{domain}</h2>
      {
        <section class="mx-4 flex flex-col rounded-lg  bg-amber-200/50  p-2 xl:col-span-4 xl:grid xl:grid-cols-3 xl:gap-4">
          {accommsList.map((entry) => {
            return (
              <span className="xl:m-auto xl:w-3/4 xl:rounded-lg  xl:bg-amber-50 xl:px-2 xl:py-2 xl:text-center xl:text-lg xl:text-gray-700">
                {entry}
              </span>
            );
          })}
        </section>
      }
    </section>
  );
};

export default AccommodationList;
