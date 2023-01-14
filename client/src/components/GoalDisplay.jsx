import React from "react";

const GoalDisplay = ({ goal }) => {
  return (
    <>
      <section class="m-auto mx-8 my-2 flex flex-col rounded-lg border-2 border-solid border-black bg-amber-300 px-2 pb-2">
        <span className="text-md mx-[-0.5rem] bg-green-900 py-2 text-center font-semibold text-white">
          {goal.domain.toUpperCase()[0] + goal.domain.slice(1)}
        </span>
        <span className="my-2 ml-4 ">{goal.text}</span>
        <span
          className={"w-1/2 px-4 text-center ".concat(
            goal.succeed ? "bg-green-400" : "bg-red-400"
          )}
        >
          Success: {goal.succeed ? "Yes" : "No"}
        </span>
        <span>Notes:</span>
        <section className="h-20 overflow-y-scroll bg-amber-100 px-2">
          {goal.notes}
        </section>
      </section>
    </>
  );
};

export default GoalDisplay;
