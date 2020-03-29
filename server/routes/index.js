const express = require("express");
const routes = express.Router();
const {
  login,
  register,
  verify
} = require("../controllers/loginRegisterController");
const {
  getClients,
  getUserProjects,
  addProject
} = require("../controllers/userController");
const verifyToken = require("../authHelpers").verifyToken;

routes.post("/api/register", register);
routes.post("/api/login", login);

//use for all requests that hit this
routes.use(verifyToken);

routes.get("/api/checkToken", verify);
routes.get("/api/getClients", getClients);
routes.get("/api/getUserProjects", getUserProjects);
routes.post("/api/addProject", addProject);

module.exports = routes;
