import axios from "axios";
import apiURL from "../utils/apiURL";

async function addNewStudent(setLoading, studentToSend, imageUrl, setSuccess) {
  setLoading(true);
  const response = await axios
    .post(
      `${apiURL}api/student/addNewStudent`,
      {
        studentToSend: studentToSend,
        _id: localStorage.getItem("_id"),
        imageUrl: imageUrl,
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
    setSuccess(true);
  }
}

export default addNewStudent;
