const User = require("../models/User");
const jwtDecode = require("jwt-decode");

const getClients = (req, res) => {
  //    console.log(User.find());

  const currUser = jwtDecode(req.headers.token);

  if(currUser.isAdmin === true){
    User.find({ isAdmin: "false" })
      .then(users => {
        res.json(users);

      })
      .catch(error => {
        res.send(error);
      });

  }
  else{
    res.status(400).send("unarthorized access");
  }
};

const getUserProjects = (req, res) => {
  //strangely, the email is inside the query, body is empty
  const currUser = jwtDecode(req.headers.token);

  if(currUser.isAdmin === true || currUser.email === req.query.email){
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
  }
  else{
    res.status(400).send("unarthorized access");
  }

};

const addProject = (req, res) => {
  const currUser = jwtDecode(req.headers.token);

  if(currUser.isAdmin === true){
    const filter = { email: req.body.email };
    const proj = { name: req.body.project.name,
                   type: req.body.project.type};

    User.findOneAndUpdate(filter,  { $push: { projects: proj } }, {new: true})
      .then(user => {
        res.json(user.projects);
      })
      .catch(error => {
        res.send(error);
      });
      console.log("added project");
  }
  else {
      res.status(400).send("unarthorized access");
  }
};

const getUserProject = (req, res) => {

  const currUser = jwtDecode(req.headers.token);

  if(currUser.isAdmin === true || currUser.email === req.query.email) {
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
  else {
    res.status(400).send("unarthorized access");
  }
}


const updatePhase = async (req, res) => {
  const currUser = jwtDecode(req.headers.token);

  if(currUser.isAdmin === true){
    try{
      const filter = {"email": req.body.email, "projects._id": req.body.uid};

      const user = await User.findOneAndUpdate(filter, {"$set": {
                "projects.$.phase": req.body.phase
            }}, {new: true});

      res.json(user.projects.id(req.body.uid));
    }
    catch(error){
      res.send(error);
    }
  }
  else{
    res.status(400).send("unarthorized access");
  }

};

const deleteUser = async (req, res) => {
  const currUser = jwtDecode(req.headers.token);

  if(currUser.isAdmin === true) {
    try{
      const user = await User.findByIdAndDelete(req.query.uid);
      res.send(user);
    }
    catch(error){
      res.send(error);
    }
  }
  else{
    res.status(400).send("unarthorized access");
  }
}
module.exports = { getClients, getUserProjects, getUserProject, addProject, updatePhase, deleteUser };
