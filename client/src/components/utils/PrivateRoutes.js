import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  let user = localStorage.getItem("user");
  let auth = localStorage.getItem("auth") === JSON.parse(user)._id;

  if (auth === "false") {
    return <Navigate to="/" />;
  } else {
    return <Outlet />;
  }
};

export default PrivateRoutes;
