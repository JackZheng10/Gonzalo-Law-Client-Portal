const User = require("../models/User");

const users = (req, res) => {
  User.find()
    .then(users => {
      res.json(users);
    })
    .catch(error => {
      res.send(error);
    });
};

const login = (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        if (user.password === req.body.password) {
          return { user: user }; //also return isAdmin as another property of the return object, to be used with line 29 of login
          //isAdmin = new property of user schema
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
          //registration currently broken because of schema Adriel is working on (some required things are not added when creating)
          email: req.body.email,
          password: req.body.password,
          name: req.body.name
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

module.exports = { users, login, register };
