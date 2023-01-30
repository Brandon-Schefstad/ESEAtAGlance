import axios from "axios";
import { Navigate } from "react-router-dom";
import apiURL from "../utils/apiURL";

async function postNewGoal(
  setLoading,
  goalToSend,
  setID,
  setGoalToSend,
  defaultGoalText
) {
  setLoading(true);
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
      setLoading(false);
      alert("Malformed Data");
    });
  setLoading(false);
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
