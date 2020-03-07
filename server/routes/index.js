const express = require("express");
const routes = express.Router();
const { login, register } = require("../controllers");
const {getClients, getUserProjects, addProject} = require("../controllers/userController")

routes.post("/api/login", login);
routes.post("/api/register", register);
routes.post("/api/getClients", getClients);
routes.post("/api/getUserProjects", getUserProjects);
routes.post("/api/addProject", addProject);
module.exports = routes;
