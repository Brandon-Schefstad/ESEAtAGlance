import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  let auth = localStorage.getItem("auth");

  console.log(auth ? "logged in" : "not a user");
  return auth ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
