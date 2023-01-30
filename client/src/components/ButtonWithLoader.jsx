import LoadingButton from "@mui/lab/LoadingButton";
// or
import React from "react";

const ButtonWithLoader = ({ name, width, className, handleClick, loading }) => {
  return loading ? (
    <section
      className={`mt-8 bg-amber-200 px-8 py-2 font-bold text-amber-700 ${className}`}
    >
      <LoadingButton loading={true} />
    </section>
  ) : (
    <button
      onClick={(e) => {
        handleClick(e);
      }}
      type="button"
      className={` px-8 py-2 font-bold ${className} rounded-lg text-xl`}
    >
      {name}
    </button>
  );
};

export default ButtonWithLoader;
