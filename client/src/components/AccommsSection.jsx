import { faCaretDown, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
const AccommsSection = ({ name, data, handleChange, active }) => {
  // const [selected, setSelected] = useState([]);
  const [expand, setExpand] = useState(false);
  const titleStyles =
    "block col-span-2 text-xl  text-center mt-2 border-x-2 border-green-900 border-dashed font-semibold bg-amber-100 py-2 px-4 text-green-900 mx-[-1.5rem] xl:col-span-6 xl:text-3xl xl:font-extrabold xl:mx-16 mb-4 relative ";
  return (
    <>
      <h1 onClick={() => setExpand(!expand)} className={titleStyles}>
        {name} Accommodations{" "}
        {expand ? (
          <FontAwesomeIcon
            className="absolute right-8 mt-1 xl:right-48"
            icon={faCaretDown}
          />
        ) : (
          <FontAwesomeIcon
            className="absolute right-8  mt-1 xl:right-48"
            icon={faCaretRight}
          />
        )}
      </h1>
      {expand ? (
        Object.keys(data).map((title, index) => {
          return (
            <section
              className="col-span-2 flex flex-col gap-1 xl:gap-0 "
              key={index}
            >
              <h3 className="  mb-2 mt-1 text-2xl text-amber-200 xl:mb-2 xl:font-semibold">
                {title}
              </h3>
              {data[title].map((option, index) => {
                return (
                  <div
                    key={index}
                    className="col-span-2 flex justify-between border-b-[0.1rem] border-dashed border-green-100/25 py-1 pr-6 pl-2 font-light xl:border-[0.1rem] xl:pr-16"
                  >
                    <label className="text-left xl:text-lg" htmlFor={option}>
                      {option}
                    </label>
                    {active.includes(option) ? (
                      <input
                        type="checkbox"
                        checked={true}
                        onChange={() => {
                          handleChange(option);
                        }}
                        className="col-start-2 w-5 accent-amber-300 "
                      />
                    ) : (
                      <input
                        type="checkbox"
                        onChange={() => {
                          handleChange(option);
                        }}
                        className="col-start-2 w-5 accent-amber-300 "
                      />
                    )}
                  </div>
                );
              })}
            </section>
          );
        })
      ) : (
        <></>
      )}
    </>
  );
};

export default AccommsSection;
