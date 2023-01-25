import React, { useEffect } from "react";

const UploadWidget = ({ setImageUrl }) => {
  let myWidget;
  useEffect(() => {
    myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: "nlhd",
        uploadPreset: "sj5rp3ig",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info.url);
          setImageUrl(result.info.url);
        }
      }
    );
  }, []);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        myWidget.open();
      }}
    >
      {" "}
      Upload Image
    </button>
  );
};

export default UploadWidget;
