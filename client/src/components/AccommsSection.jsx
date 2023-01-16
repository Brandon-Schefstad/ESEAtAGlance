import { faCaretDown, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
const AccommsSection = ({ name, data, handleChange, active }) => {
  // const [selected, setSelected] = useState([]);
  const [expand, setExpand] = useState(false);
  const titleStyles =
    "block col-span-2 text-xl  bg-amber-200/50  mt-2 border-b-2 border-rose-500 border-dotted font-semibold  py-2 px-4 text-green-900 mx-[-1.5rem] xl:col-span-6 xl:text-3xl xl:font-extrabold xl:mx-16 mb-4 relative font-[Martel] xl:my-8 ";
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
              className="col-span-2 flex flex-col gap-1  border-x-[0.15rem] border-dashed border-rose-500/50  text-green-900  xl:gap-0 xl:px-6 "
              key={index}
            >
              <h3 className="  mb-2 mt-1 bg-green-800 py-1 text-center text-2xl text-amber-50 xl:mb-2 xl:font-semibold ">
                {title}
              </h3>
              {data[title].map((option, index) => {
                return (
                  <div
                    key={index}
                    className="col-span-2 flex justify-between border-dashed  border-rose-500/50 py-1 pr-6 pl-2  xl:pr-16"
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
