import axios from "axios";
import apiURL from "../utils/apiURL";
const authorize = async (login, authorizeInfo, setAuth) => {
  let response;
  if (login) {
    response = await axios.post(`${apiURL}api/login`, authorizeInfo);
  } else {
    response = await axios.post(`${apiURL}api/signup`, authorizeInfo);
  }
  const { token, user } = await response.data;
  if (token) {
    localStorage.setItem("auth", token);
    localStorage.setItem("_id", user._id);
    setAuth(true);
  } else {
    localStorage.setItem("user", "none");
    localStorage.setItem("auth", false);
  }
};

export default authorize;
