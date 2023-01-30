import axios from "axios";
import { Navigate } from "react-router-dom";
import apiURL from "../utils/apiURL";

async function postNewAccommodations(
  setLoading,
  studentId,
  accommodationsToSend,
  setStudentFinished
) {
  setLoading(true);

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
      setLoading(false);
      alert("Malformed Data");
    });
  setLoading(false);
  if (status === 200) {
    accommodationsToSend = [];
  }
  <Navigate to={`/searchStudent/${studentId}`} />;
}

export default postNewAccommodations;
