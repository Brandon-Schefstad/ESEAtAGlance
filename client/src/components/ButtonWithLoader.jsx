import LoadingButton from "@mui/lab/LoadingButton";
// or
import { CircularProgress } from "@mui/material";
import React, { useState } from "react";
const ButtonWithLoader = ({ name, className, handleClick, stopLoading }) => {
  const [loading, setLoading] = useState(false);
  const primary = "#FFFFFF";
  return loading && !stopLoading ? (
    <button
      type="button"
      className={`rounded-lg px-8 py-2 font-bold text-amber-700 ${className}`}
    >
      <LoadingButton
        sx={{
          height: "100%",
          paddingBlock: "0.85rem",
          width: "80%",
        }}
        loading={true}
        loadingIndicator={
          <CircularProgress
            size={24}
            sx={{
              color: "white",
              height: "100%",
              width: "100%",
              margin: "auto",
            }}
          />
        }
      />
    </button>
  ) : (
    <button
      onClick={(e) => {
        setLoading(true);
        handleClick(e);
      }}
      type="button"
      className={`px-8 py-2 font-bold ${className} rounded-lg text-xl`}
    >
      {name}
    </button>
  );
};

export default ButtonWithLoader;
