import axios from "axios";
import { Navigate } from "react-router-dom";
import apiURL from "../utils/apiURL";

async function postNewGoal(goalToSend, setID, setGoalToSend, defaultGoalText) {
  const response = await axios
    .post(
      `${apiURL}api/student/addNewGoal`,
      {
        goalToSend,
      },
      {
        headers: {
          authorization: localStorage.getItem("auth"),
        },
      }
    )
    .catch(() => {
      alert("Malformed Data");
    });

  if (response.status === 200) {
    setID(response.data.ID);
    setGoalToSend(defaultGoalText);
    clearForms();
    return <Navigate to={"/addNewGoals"} replace={true} />;
  }
}
function clearForms() {
  const arr = Array.from(document.querySelectorAll(".form-input"));
  arr.forEach((input) => (input.value = ""));
}

export default postNewGoal;
