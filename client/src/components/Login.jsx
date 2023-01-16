import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import bgimage from "../assets/bg-main.png";
import ButtonWithLoader from "./ButtonWithLoader";
import Footer from "./Footer";

const Login = () => {
  const [authorizeInfo, setAuthorizeInfo] = useState({});
  const [auth, setAuth] = useState(null);
  const [login, setLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let user = localStorage.getItem("user");
    if (user) {
      setAuth(localStorage.getItem("auth") === JSON.parse(user)._id);
    }
  }, []);
  function formatAuthorizeInfo(e, name) {
    setAuthorizeInfo(authorizeInfo, ...(authorizeInfo[name] = e.target.value));
  }

  async function authorize(e) {
    e.preventDefault();
    let response;
    if (login) {
      response = await axios.post(
        "http://localhost:5501/api/login",
        authorizeInfo
      );
    } else {
      response = await axios.post(
        "http://localhost:5501/api/signup",
        authorizeInfo
      );
    }
    const { token, user } = await response.data;
    console.log(token);

    if (token) {
      localStorage.setItem("auth", token);
      localStorage.setItem("_id", user._id);
      setAuth(true);
    } else {
      localStorage.setItem("auth", false);
      localStorage.setItem("_id", 0);
    }
  }

  const inputStyles =
    " border-b-2 border-green-800 border-solid text-green-900 col-span-2 pl-2 py-2 placeholder:text-green-900  placeholder:text-xl  text-xl xl:mt-6 xl:mx-8 ";
  const activeStyle =
    "text-amber-800 rounded-lg py-2 text-2xl border-2 border-amber-800 bg-amber-200 font-bold xl:bg-amber-500 xl:w-full xl:text-white xl:pb-2 xl:shadow-inner xl:shadow-amber-800 xl:py-4 xl:mb-8";
  const inactiveStyle =
    "text-gray text-gray-800  py-2 text-2xl border-b-2 border-gray-800 bg-gray-200 text-2xl xl:bg-yellow-400 xl:text-yellow-700 xl:py-4 xl:mb-8";
  {
    return auth ? (
      <Navigate to="/dashboard" props={setAuth} />
    ) : (
      <section className="px-4 xl:grid xl:grid-cols-2">
        <h1 className="mainTitle mb-4 pt-16 text-[2.75rem] font-[900] text-green-900 xl:col-span-2 xl:ml-24 xl:mb-0 xl:text-[5rem]">
          ESE-At-A-Glance
        </h1>
        <span className="mb-4 block text-lg font-semibold text-black xl:col-span-2 xl:row-start-2 xl:ml-24 xl:text-2xl">
          Student tracking for the busy teacher!
        </span>
        {/* {warning ? warning : ""} */}
        <section className="relative z-10 rounded-lg border-[2px] border-solid border-green-900 bg-white px-8 pt-12 pb-8 xl:top-0 xl:row-start-3 xl:m-auto xl:grid xl:w-3/4 xl:-translate-y-20 xl:px-0 xl:pt-0">
          <form
            className=" grid grid-cols-2 gap-10 text-center  xl:gap-0"
            method="POST"
          >
            {login ? (
              <>
                <span className={activeStyle} onClick={() => setLogin(true)}>
                  Login
                </span>
                <span className={inactiveStyle} onClick={() => setLogin(false)}>
                  Signup
                </span>
                <input
                  type="text"
                  className={inputStyles}
                  onChange={(e) => formatAuthorizeInfo(e, "email")}
                  name="email"
                  id=""
                  placeholder="Email"
                />
                <input
                  type="text"
                  className={inputStyles}
                  onChange={(e) => formatAuthorizeInfo(e, "password")}
                  name="password"
                  id=""
                  placeholder="Password"
                />
              </>
            ) : (
              <>
                {" "}
                <span
                  className={inactiveStyle}
                  onClick={() => {
                    setLogin(true);
                    setLoading(false);
                  }}
                >
                  Login
                </span>
                <span
                  className={activeStyle}
                  onClick={() => {
                    setLogin(false);
                    setLoading(null);
                  }}
                >
                  Signup
                </span>
                <input
                  type="text"
                  className={inputStyles}
                  onChange={(e) => formatAuthorizeInfo(e, "email")}
                  name="email"
                  id=""
                  placeholder="Email"
                />
                <input
                  type="text"
                  className={inputStyles}
                  onChange={(e) => formatAuthorizeInfo(e, "firstName")}
                  name="firstName"
                  id=""
                  placeholder="First Name"
                />
                <input
                  type="text"
                  className={inputStyles}
                  onChange={(e) => formatAuthorizeInfo(e, "lastName")}
                  name="lastName"
                  id=""
                  placeholder="Last Name"
                />
                <input
                  type="text"
                  className={inputStyles}
                  onChange={(e) => formatAuthorizeInfo(e, "password")}
                  name="password"
                  id=""
                  placeholder="Password"
                />
                <input
                  type="text"
                  className={inputStyles}
                  onChange={(e) => formatAuthorizeInfo(e, "confirmPassword")}
                  name="confirmPassword"
                  id=""
                  placeholder="Confirm Password"
                />
              </>
            )}
            <ButtonWithLoader
              name={"Enter"}
              handleClick={(e) => {
                setLoading(true);
                authorize(e);
              }}
              loading={loading}
              className={
                "text:3xl col-span-2 m-auto mt-4 bg-green-300 text-green-900"
              }
            />
          </form>
        </section>
        <img
          className="absolute bottom-12 left-0 z-0 xl:relative xl:row-start-3 xl:m-auto"
          src={bgimage}
          alt=""
          srcset=""
        />
        <Footer />
      </section>
    );
  }
};

export default Login;
