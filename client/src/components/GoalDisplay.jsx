import React from "react";

const GoalDisplay = ({ goal }) => {
  return (
    <>
      <section class="m-auto mx-8 my-2 flex flex-col gap-2  border-2 border-solid border-black bg-blue-100 px-2 pb-2">
        <span className="text-md mx-[-0.5rem] bg-blue-800 py-2 text-center font-semibold text-white lg:text-lg">
          {goal.domain.toUpperCase()[0] + goal.domain.slice(1)}
        </span>
        <span className="my-2 mx-2 bg-white p-2">{goal.text}</span>
        <span
          className={"m-auto  px-4 text-center ".concat(
            goal.succeed ? "bg-green-400" : "bg-red-400"
          )}
        >
          Success: {goal.succeed ? "Yes" : "No"}
        </span>
        <span className="font-semibold">Notes:</span>
        <section className="mx-4 h-20 overflow-y-scroll bg-white px-4">
          {goal.notes}
        </section>
      </section>
    </>
  );
};

export default GoalDisplay;
