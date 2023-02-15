import axios from "axios";
import apiURL from "../utils/apiURL";

async function searchStudent(
  studentIdToSend,
  setWarning,
  setStudent,
  setStopLoading,
  e
) {
  e.preventDefault();
  const { data, status } = await axios
    .get(`${apiURL}api/student/searchStudent/${studentIdToSend}`, {
      headers: {
        authorization: localStorage.getItem("auth"),
      },
    })
    .catch(() => {
      setWarning(true);
    });
  if (status !== 200 || data.error) {
    setWarning(true);
  } else {
    setWarning(false);
    setStudent(data);
  }
  setStopLoading(true);
}

export default searchStudent;
