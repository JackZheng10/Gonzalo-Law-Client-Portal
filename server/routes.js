var express = require('express')
var routes = express.Router()
const { users }= require('./countrollers')
const { login,register } = require('./countrollers')

routes.get("/users", users);

routes.post("/login", login);
routes.post("/register", register);


module.exports = routes