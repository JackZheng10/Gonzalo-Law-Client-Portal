const express = require("express");
const routes = express.Router();
const { uploadFile, getFiles } = require("../controllers/fileController");
const {
  login,
  register,
  verify
} = require("../controllers/loginRegisterController");
const {
  getClients,
  getUserProjects,
  addProject,
  updatePhase,
  getUserProject
} = require("../controllers/userController");
const verifyToken = require("../authHelpers").verifyToken;

routes.post("/api/register", register);
routes.post("/api/login", login);

//use for all requests that hit this
routes.use(verifyToken);

routes.get("/api/checkToken", verify);
routes.get("/api/getClients", getClients);
routes.get("/api/getUserProjects", getUserProjects);
routes.get("/api/getUserProject", getUserProject);
routes.post("/api/addProject", addProject);
routes.post("/api/updatePhase", updatePhase);
routes.put("/api/upload", uploadFile);
//routes.get("/api/download", downloadFile);
routes.get("/api/getFiles", getFiles);

module.exports = routes;
