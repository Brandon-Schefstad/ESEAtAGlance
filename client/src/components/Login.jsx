import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import bgimage from "../assets/bg-main.png";
import Footer from "./Footer";

const Login = () => {
  const [authorizeInfo, setAuthorizeInfo] = useState({});
  const [warning, setWarning] = useState(null);
  const [auth, setAuth] = useState(null);
  const [login, setLogin] = useState(true);

  useEffect(() => {
    let user = localStorage.getItem("user");
    setAuth(localStorage.getItem("auth") === JSON.parse(user)._id);
  }, []);
  function formatAuthorizeInfo(e, name) {
    setAuthorizeInfo(authorizeInfo, ...(authorizeInfo[name] = e.target.value));
  }

  async function authorize(e) {
    e.preventDefault();
    let response;
    if (login) {
      response = await axios.post("/api/login", authorizeInfo);
    } else {
      response = await axios.post("/api/signup", authorizeInfo);
    }
    const { user } = await response.data;
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("auth", user._id);
      setAuth(true);
    } else {
      localStorage.setItem("user", "none");
      localStorage.setItem("auth", false);
    }
  }

  const formStyles =
    "bg-green-800 border-b-2 border-amber-200 border-solid col-span-2 pl-2 py-2 placeholder:text-yellow-100 placeholder:text-xl text-amber-100 text-xl";
  const activeStyle =
    "text-amber-400 text-2xl underline underline-offset-4 font-bold";
  const inactiveStyle = "text-amber-50 text-2xl";
  {
    return auth ? (
      <Navigate to="/dashboard" props={setAuth} />
    ) : (
      <section className="">
        <h1 className="mb-4 pt-16 text-[2.75rem] font-extrabold text-green-900">
          ESE-At-A-Glance
        </h1>
        <span className="mb-4 block text-lg text-black">
          Student tracking for the busy teacher!
        </span>
        {warning ? warning : ""}
        <section className="relative z-10 bg-green-900 px-4 pt-8 pb-8">
          <form
            className=" mx-4 grid grid-cols-2 gap-8 text-center"
            onSubmit={(e) => authorize(e)}
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
                  className={formStyles}
                  onChange={(e) => formatAuthorizeInfo(e, "email")}
                  name="email"
                  id=""
                  placeholder="Email"
                />
                <input
                  type="text"
                  className={formStyles}
                  onChange={(e) => formatAuthorizeInfo(e, "password")}
                  name="password"
                  id=""
                  placeholder="Password"
                />
              </>
            ) : (
              <>
                {" "}
                <span className={inactiveStyle} onClick={() => setLogin(true)}>
                  Login
                </span>
                <span className={activeStyle} onClick={() => setLogin(false)}>
                  Signup
                </span>
                <input
                  type="text"
                  className={formStyles}
                  onChange={(e) => formatAuthorizeInfo(e, "email")}
                  name="email"
                  id=""
                  placeholder="Email"
                />
                <input
                  type="text"
                  className={formStyles}
                  onChange={(e) => formatAuthorizeInfo(e, "firstName")}
                  name="firstName"
                  id=""
                  placeholder="First Name"
                />
                <input
                  type="text"
                  className={formStyles}
                  onChange={(e) => formatAuthorizeInfo(e, "lastName")}
                  name="lastName"
                  id=""
                  placeholder="Last Name"
                />
                <input
                  type="text"
                  className={formStyles}
                  onChange={(e) => formatAuthorizeInfo(e, "password")}
                  name="password"
                  id=""
                  placeholder="Password"
                />
                <input
                  type="text"
                  className={formStyles}
                  onChange={(e) => formatAuthorizeInfo(e, "confirmPassword")}
                  name="confirmPassword"
                  id=""
                  placeholder="Confirm Password"
                />
              </>
            )}

            <input
              className="col-span-2 m-auto bg-yellow-500 px-8 py-[0.25rem] text-2xl font-bold text-green-800"
              type="submit"
              value="Go"
            />
          </form>
        </section>
        <img
          className="absolute bottom-12 left-0 z-0"
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
