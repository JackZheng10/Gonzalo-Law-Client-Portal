const express = require("express");
const routes = express.Router();
const { login, register } = require("../controllers");

routes.post("/api/login", login);
routes.post("/api/register", register);

module.exports = routes;
