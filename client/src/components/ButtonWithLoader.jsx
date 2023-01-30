import LoadingButton from "@mui/lab/LoadingButton";
// or
import React, { useState } from "react";

const ButtonWithLoader = ({ name, className, handleClick, stopLoading }) => {
  const [loading, setLoading] = useState(false);
  console.log(`Stop Loading in Button ${stopLoading}`);
  return loading && !stopLoading ? (
    <section className={`px-8 font-bold text-amber-700 ${className}`}>
      <LoadingButton
        style={{
          paddingInline: "2rem",
          paddingBlock: "1.35rem",
          borderRadius: "0.5rem",
        }}
        loading={true}
      />
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
