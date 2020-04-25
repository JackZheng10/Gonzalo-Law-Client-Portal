let baseURL = "";
if (process.env.NODE_ENV === "production") {
  //heroku deployment
  baseURL = "/api/";
} else {
  //local deployment
  baseURL = "http://localhost:8000/api/";
}
//heroku: baseURL = "/api/";
//local: baseURL = "http://localhost:8000/api/";

export default baseURL;
