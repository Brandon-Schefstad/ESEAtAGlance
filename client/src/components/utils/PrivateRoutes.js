import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  let auth = localStorage.getItem("auth");

  console.log(auth);
  if (auth === "false") {
    return <Navigate to="/" />;
  } else {
    return <Outlet />;
  }
};

export default PrivateRoutes;
