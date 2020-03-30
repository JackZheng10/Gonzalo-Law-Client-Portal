const express = require("express");
const routes = express.Router();
const { login, register } = require("../controllers/loginRegisterController");
const { uploadFile, getFiles, downloadFile } = require("../controllers/fileController");
const {
  getClients,
  getUserProjects,
  addProject,
  updatePhase,
  getUserProject
} = require("../controllers/userController");

routes.post("/api/login", login);
routes.post("/api/register", register);
routes.get("/api/getClients", getClients);
routes.get("/api/getUserProjects", getUserProjects);
routes.get("/api/getUserProject", getUserProject);
routes.post("/api/addProject", addProject);
routes.post("/api/updatePhase", updatePhase);
routes.get("/api/upload", uploadFile);
routes.get("/api/download", downloadFile);
routes.get("/api/getFiles", getFiles);

module.exports = routes;
