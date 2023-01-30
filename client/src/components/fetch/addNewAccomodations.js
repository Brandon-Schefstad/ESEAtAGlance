import axios from "axios";
import { Navigate } from "react-router-dom";
import apiURL from "../utils/apiURL";

async function postNewAccommodations(
  studentId,
  accommodationsToSend,
  setStudentFinished
) {
  const { status } = await axios
    .post(
      `${apiURL}api/student/addNewAccommodations`,
      {
        ID: studentId,
        accommodationsToSend,
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
  if (status === 200) {
    accommodationsToSend = [];
  }
  <Navigate to={`/searchStudent/${studentId}`} />;
}

export default postNewAccommodations;
