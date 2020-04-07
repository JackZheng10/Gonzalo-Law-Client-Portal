const User = require("../models/User");
const signToken = require("../authHelpers").signToken;

const login = (req, res) => {
  User.findOne({ email: req.body.email })
    .then(async user => {
      if (!user || !user.validPassword(req.body.password)) {
        return res.json({ success: false, error: "Invalid login." });
      }

      //granting access to the token, the information for current user
      const token = await signToken(user);
      res.json({
        success: true,
        message: "Successfully logged in, token is attached",
        token: token
      });
    })
    .catch(error => {
      res.json({
        success: false,
        error: error.message
      });
    });
};

const register = async (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        res.json({
          success: false,
          error: "User already exists. Please try again."
        });
      } else {
        User.create({
          email: req.body.email,
          password: req.body.password,
          name: req.body.name,
          isAdmin: false,
          projects: []
        })
          .then(async user => {
            const token = await signToken(user);
            res.json({
              success: true,
              message: "User created with token attached",
              token: token
            });
          })
          .catch(error => {
            res.json({
              success: false,
              error: error
            });
          });
      }
    })
    .catch(error => {
      res.json({
        success: false,
        error: error
      });
    });
};

const verify = (req, res) => {
  return res.json({ success: true, message: "Token passed middleware check" });
};

module.exports = { login, register, verify };
