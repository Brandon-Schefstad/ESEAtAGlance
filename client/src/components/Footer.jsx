import React from "react";

const Footer = ({ setAuth, auth }) => {
  return (
    <>
      <footer className="min-w-screen absolute bottom-4 flex items-baseline gap-12 bg-none  text-xl  text-black">
        <span>An App by Brandon Schefstad</span>
        {auth ? (
          <button
            className=" rounded-lg bg-green-800 p-4 font-extrabold text-amber-100"
            onClick={() => {
              localStorage.setItem("auth", false);
              localStorage.setItem("user", false);
              setAuth(false);
            }}
          >
            Logout
          </button>
        ) : (
          <></>
        )}
      </footer>
    </>
  );
};

export default Footer;
