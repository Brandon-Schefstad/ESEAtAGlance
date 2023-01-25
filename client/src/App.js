import { Cloudinary } from "@cloudinary/url-gen";
import { useEffect } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import AddNewAccommodations from "./components/AddNewAccommodations";
import AddNewGoals from "./components/AddNewGoals";
import AddNewStudent from "./components/AddNewStudent";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import SearchStudent from "./components/SearchStudent";
import PrivateRoutes from "./components/utils/PrivateRoutes";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <>
        <Route path={"/"} element={<Login />}></Route>
        <Route element={<PrivateRoutes />}>
          <Route path={"/dashboard"} element={<Dashboard />}></Route>
          <Route path={"/addNewStudent"} element={<AddNewStudent />}></Route>
          <Route path={"/addNewGoals"} element={<AddNewGoals />}></Route>
          <Route
            path={"/addNewAccommodations"}
            element={<AddNewAccommodations />}
          ></Route>
          <Route path={"/searchStudent"} element={<SearchStudent />}></Route>
        </Route>
      </>
    </>
  )
);
const cld = new Cloudinary({
  cloud: {
    cloudName: "nlhd",
  },
});
function App() {
  useEffect(() => {
    document.body.classList.add(
      "bg-amber-50",
      "min-h-screen",
      "max-w-[2000px]",
      "m-auto"
    );
  }, []);
  return <RouterProvider router={router} />;
}

export default App;
