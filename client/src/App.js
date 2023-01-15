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
import PrivateRoutes from "./components/PrivateRoutes";
import SearchStudent from "./components/SearchStudent";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <>
        <Route path={"/"} element={<Login />}></Route>
        <Route element={<PrivateRoutes />}>
          <Route path={"/dashboard"} element={<Dashboard />}></Route>
          <Route path={"/addNewStudent"} element={<AddNewStudent />}></Route>
          {/* <Route
            path={"/addNewGoals/:id"}
            element={<AddNewGoals student_id={req.params.id} />}
          ></Route> */}
          <Route path={"/addNewGoals"} element={<AddNewGoals />}></Route>
          <Route
            path={"/addNewAccommodations"}
            element={<AddNewAccommodations />}
          ></Route>
          <Route path={"/searchStudent"} element={<SearchStudent />}></Route>
        </Route>
        {/* <Route element={<Login />} path="/login" /> */}
      </>
    </>
  )
);

function App() {
  useEffect(() => {
    document.body.classList.add(
      "bg-amber-50",

      "px-6",
      "max-w-[1800px]",
      "m-auto"
    );
  }, []);
  return <RouterProvider router={router} />;
}

export default App;
