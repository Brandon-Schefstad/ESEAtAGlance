import axios from "axios";
import apiURL from "../utils/apiURL";

async function addNewStudent(studentToSend, imageUrl, setSuccess, e) {
  e.preventDefault();
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
      alert("Malformed Data");
    });
  if (response.status === 200) {
    setSuccess(true);
  }
}

export default addNewStudent;
