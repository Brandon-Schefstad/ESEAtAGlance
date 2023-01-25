import { faCaretDown, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
const AccommsSection = ({ name, data, handleChange, active }) => {
  // const [selected, setSelected] = useState([]);
  const [expand, setExpand] = useState(false);
  const titleStyles =
    "block col-span-3 text-2xl  bg-amber-200/50  mt-2 border-b-2 border-rose-500 border-dotted font-extrabold  py-2 px-8  text-green-900   xl:text-3xl xl:font-extrabold xl:mx-16 mb-4 relative  xl:my-8 tracking-wider xl:col-span-3";
  return (
    <>
      <h1 onClick={() => setExpand(!expand)} className={titleStyles}>
        {name}
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
              className="col-span-3  flex flex-col gap-1 text-green-900  xl:col-span-1  xl:gap-0 xl:px-6 "
              key={index}
            >
              <h3 className="  mt-1 py-1 text-left text-xl font-semibold text-green-800 underline underline-offset-2 xl:mb-2 xl:font-semibold ">
                {title}
              </h3>
              {data[title].map((option, index) => {
                return (
                  <div
                    key={index}
                    className="col-span-2 flex justify-between border-b-[0.1rem] border-dashed border-green-100/25 py-1 pr-6 pl-2 font-light xl:border-[0.1rem] xl:pr-16"
                  >
                    <label
                      className="text-left text-sm xl:text-lg"
                      htmlFor={option}
                    >
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
