import React from "react";

const GoalDisplay = ({ goal }) => {
  return (
    <>
      <section className="m-auto mx-8 my-2 flex flex-col gap-2   bg-amber-100 px-2 pb-4">
        <span className="text-md mx-[-0.5rem]  border-b-2 border-solid border-amber-900 bg-blue-900 py-2 text-center font-semibold text-white lg:text-lg">
          {goal.domain.toUpperCase()[0] + goal.domain.slice(1)}
        </span>
        <span className="my-2 mx-2 bg-white p-2">{goal.text}</span>
        <span
          className={" m-auto w-1/2 rounded-md border-2 border-solid px-4 text-center  ".concat(
            goal.succeed
              ? "border-green-900 bg-green-200"
              : "border-red-900 bg-red-200 "
          )}
        >
          Success: {goal.succeed ? "Yes" : "No"}
        </span>
        <span className="font-semibold underline underline-offset-1">
          Notes:
        </span>
        <section className="mx-4 h-20 overflow-y-scroll bg-white px-4">
          {goal.notes}
        </section>
      </section>
    </>
  );
};

export default GoalDisplay;
