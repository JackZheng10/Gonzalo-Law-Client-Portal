const User = require("../models/User");

const getClients = (req, res) => {
  //    console.log(User.find());
  User.find({ isAdmin: "false" })
    .then(users => {
      res.json(users);
      //console.log(users);
      //console.log("getClients() called");
    })
    .catch(error => {
      res.send(error);
    });
  //res.send();
};

const getUserProjects = (req, res) => {
  //strangely, the email is inside the query, body is empty
  User.findOne({ email: req.query.email }, ((err, user) => {
    if (user) {
        res.json(user.projects);
      }
    else{
      res.status(400).send("No such user exists");
    }
  }))
    .catch(error => {
      res.send(error);
    });
};

const addProject = (req, res) => {
  const filter = { email: req.body.email };
  const proj = { name: req.body.project.name,
                 type: req.body.project.type};
  // { "$push": { "projects": proj } }
  User.findOneAndUpdate(filter,  { $push: { projects: proj } }, {new: true})
    .then(user => {
      res.json(user.projects);
    })
    .catch(error => {
      res.send(error);
    });
};

const getUserProject = (req, res) => {
  User.findOne({ email: req.query.email }, ((err, user) => {
    if (user) {
        res.json(user.projects.id(req.query.uid));
      }
    else{
      res.status(400).send("No such project exists");
    }
  }))
    .catch(error => {
      res.send(error);
    });
}
const updatePhase = async (req, res) => {
  const filter = {"email": req.body.email, "projects._id": req.body.uid}
  try{
    const user = await User.findOneAndUpdate(filter, {"$set": {
              "projects.$.phase": req.body.phase
          }}, {new: true});

    res.json(user.projects.id(req.body.uid));
  }
  catch(error){
    res.send(error);
  }
};

module.exports = { getClients, getUserProjects, getUserProject, addProject, updatePhase };
