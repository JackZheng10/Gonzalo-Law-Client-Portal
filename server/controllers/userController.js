
const User = require("../models/User");
const mongoose = require('mongoose');

const getClients = (req, res) => {
//    console.log(User.find());
    User.find({isAdmin: 'false'})
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
    User.find({email: req.body.email})
    .then(user => {
        res.json(user[0].projects);
        //console.log(user[0].projects);
    })
    .catch(error => {
        res.send(error);
    });

}

const addProject = (req, res) => {
    const filter = {email: req.body.email}
    const proj = {name: req.body.project.name, type: req.body.project.type};
    // { "$push": { "projects": proj } }
    User.findOneAndUpdate(filter, {"$push": {projects: proj}})
    .then(user => {
        console.log(user);
    })
    .catch(error => {
        res.send(error);
    })
}

module.exports = {getClients, getUserProjects, addProject};
