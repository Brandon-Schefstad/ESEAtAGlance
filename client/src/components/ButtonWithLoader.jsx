import LoadingButton from "@mui/lab/LoadingButton";
// or
import React, { useState } from "react";

const ButtonWithLoader = ({ name, width, className, handleClick }) => {
  const [loading, setLoading] = useState(false);
  return loading ? (
    <section
      className={`mt-8 bg-amber-200 px-8 py-2 font-bold text-amber-700 ${className}`}
    >
      <LoadingButton loading={true} />
    </section>
  ) : (
    <button
      onClick={(e) => {
        setLoading(true);
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
