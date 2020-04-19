const User = require("../models/User");
const jwtDecode = require("jwt-decode");

const getClients = (req, res) => {
  //    console.log(User.find());

  const currUser = jwtDecode(req.headers.token);

  if (currUser.isAdmin === true) {
    User.find({ isAdmin: "false" })
      .then((users) => {
        res.json(users);
      })
      .catch((error) => {
        res.send(error);
      });
  } else {
    res.status(400).send("unarthorized access");
  }
};

const getUserProjects = (req, res) => {
  //strangely, the email is inside the query, body is empty
  const currUser = jwtDecode(req.headers.token);

  if (currUser.isAdmin === true || currUser.email === req.query.email) {
    User.findOne({ email: req.query.email }, (err, user) => {
      if (user) {
        res.json(user.projects);
      } else {
        res.status(400).send("No such user exists");
      }
    }).catch((error) => {
      res.send(error);
    });
  } else {
    res.status(400).send("unarthorized access");
  }
};

const addProject = (req, res) => {
  const currUser = jwtDecode(req.headers.token);

  if (currUser.isAdmin === true) {
    const filter = { email: req.body.email };
    const proj = { name: req.body.project.name, type: req.body.project.type };

    User.findOneAndUpdate(filter, { $push: { projects: proj } }, { new: true })
      .then((user) => {
        res.json(user.projects);
      })
      .catch((error) => {
        res.send(error);
      });
    console.log("added project");
  } else {
    res.status(400).send("unarthorized access");
  }
};

const getUserProject = (req, res) => {
  const currUser = jwtDecode(req.headers.token);

  if (currUser.isAdmin === true || currUser.email === req.query.email) {
    User.findOne({ email: req.query.email }, (err, user) => {
      if (user) {
        res.json(user.projects.id(req.query.uid));
      } else {
        res.status(400).send("No such project exists");
      }
    }).catch((error) => {
      res.send(error);
    });
  } else {
    res.status(400).send("unarthorized access");
  }
};

const deleteUserProject = async (req, res) => {
  let projectID = req.body.projectID;
  let userEmail = req.body.userEmail;
  let currentProjects = [];

  await User.findOne({ email: userEmail })
    .then((user) => {
      if (user) {
        currentProjects = user.projects;
      } else {
        return res.json({ success: false, message: "User could not be found" });
      }
    })
    .catch((error) => {
      return res.json({ success: false, message: error });
    });

  let updatedProjects = currentProjects.filter((value, index, arr) => {
    return value._id != projectID;
  });

  User.findOneAndUpdate({ email: userEmail }, { projects: updatedProjects })
    .then((user) => {
      if (user) {
        return res.json({
          success: true,
          message: "Project deleted successfully",
        });
      } else {
      }
    })
    .catch((error) => {
      return res.json({ success: false, message: error });
    });
};

const updatePhase = async (req, res) => {
  const currUser = jwtDecode(req.headers.token);

  if (currUser.isAdmin === true) {
    try {
      const filter = { email: req.body.email, "projects._id": req.body.uid };

      const user = await User.findOneAndUpdate(
        filter,
        {
          $set: {
            "projects.$.phase": req.body.phase,
          },
        },
        { new: true }
      );

      res.json(user.projects.id(req.body.uid));
    } catch (error) {
      res.send(error);
    }
  } else {
    res.status(400).send("unarthorized access");
  }
};

const deleteUser = async (req, res) => {
  const currUser = jwtDecode(req.headers.token);

  if (currUser.isAdmin === true) {
    try {
      const user = await User.findByIdAndDelete(req.query.uid);
      res.send(user);
    } catch (error) {
      res.send(error);
    }
  } else {
    res.status(400).send("unarthorized access");
  }
};
module.exports = {
  getClients,
  getUserProjects,
  getUserProject,
  addProject,
  updatePhase,
  deleteUser,
  deleteUserProject,
};
