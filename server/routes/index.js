const express = require("express");
const routes = express.Router();
const {
  uploadFile,
  getFiles,
  deleteFile,
} = require("../controllers/fileController");
const multer = require("multer");
const { memoryStorage } = require("multer");
const {
  login,
  register,
  verify,
} = require("../controllers/loginRegisterController");
const {
  getClients,
  getUserProjects,
  addProject,
  updatePhase,
  getUserProject,
  deleteUser,
  deleteUserProject,
} = require("../controllers/userController");
const {
  pwdResetEmail,
  resetPassword,
} = require("../controllers/pwdRecoveryController");

const verifyToken = require("../authHelpers").verifyToken;

routes.post("/register", register);
routes.post("/login", login);
routes.post("/pwdResetEmail", pwdResetEmail);
routes.post("/resetPassword", resetPassword);

const m = multer({
  storage: memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, //Max size of file is 5 mb
  },
});

//use for all requests that hit this
routes.use(verifyToken);

routes.get("/checkToken", verify);
routes.get("/getClients", getClients);
routes.get("/getUserProjects", getUserProjects);
routes.get("/getUserProject", getUserProject);
routes.post("/deleteUserProject", deleteUserProject);
routes.post("/addProject", addProject);
routes.post("/updatePhase", updatePhase);
routes.put("/upload", m.single("file"), uploadFile);
routes.put("/deleteFile", deleteFile);

//routes.get("/api/download", downloadFile);
routes.get("/getFiles", getFiles);
routes.post("/deleteUser", deleteUser);

module.exports = routes;
