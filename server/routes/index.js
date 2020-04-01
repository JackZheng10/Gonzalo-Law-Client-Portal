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

routes.post("/register", register);
routes.post("/login", login);

//use for all requests that hit this
routes.use(verifyToken);

routes.get("/checkToken", verify);
routes.get("/getClients", getClients);
routes.get("/getUserProjects", getUserProjects);
routes.get("/getUserProject", getUserProject);
routes.post("/addProject", addProject);
routes.post("/updatePhase", updatePhase);
routes.put("/upload", uploadFile);
//routes.get("/api/download", downloadFile);
routes.get("/getFiles", getFiles);

module.exports = routes;
