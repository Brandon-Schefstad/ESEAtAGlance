import LoadingButton from "@mui/lab/LoadingButton";
// or
import React, { useState } from "react";

const ButtonWithLoader = ({ name, width, className, handleClick }) => {
  const [loading, setLoading] = useState(false);
  return loading ? (
    <LoadingButton loading={true} />
  ) : (
    <button
      onClick={() => {
        setLoading(true);
        handleClick();
      }}
      className={`bg-amber-200 px-8 font-bold text-amber-700 ${className}`}
    >
      {name}
    </button>
  );
};

export default ButtonWithLoader;
