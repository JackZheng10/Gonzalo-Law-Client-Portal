const User = require("../models/User");

const login = (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        if (user.password === req.body.password) {
          return { user: user, isAdmin: user.isAdmin };
        }
        return { error: "Password is incorrect. Please try again." };
      }
      return { error: "User could not be found. Please try again." };
    })
    .then(response => {
      res.json(response);
    })
    .catch(error => {
      res.send(error);
    });
};

const register = (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        res.json({ error: "User already exists. Please try again." });
      } else {
        User.create({
          email: req.body.email,
          password: req.body.password,
          name: req.body.name,
          isAdmin: false,
          projects: []
        })
          .then(users => {
            res.json(users);
          })
          .catch(error => {
            return { error };
          });
      }
    })
    .catch(error => {
      res.send(error);
    });
};

module.exports = { login, register };
