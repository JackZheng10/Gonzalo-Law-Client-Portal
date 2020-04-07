import axios from "axios";
import baseURL from "../baseURL.js";

//put through to verifyToken middleware
const checkToken = async () => {
  let success = false;
  //alert("1");
  axios.defaults.headers.common["token"] = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : null;

  await axios
    .get(baseURL + "checkToken", {})
    .then(res => {
      //alert("2");
      console.log(res.data.success);
      //alert(res.data.success);
      success = res.data.success;
    })
    .catch(error => {
      alert("error");
      alert(error);
    });

  return success;
};

export default checkToken;
