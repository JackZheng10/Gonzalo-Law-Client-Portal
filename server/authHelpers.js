const jwt = require("jsonwebtoken"),
  User = require("./models/User.js"),
  jwt_secret = process.env.secret || require("./config/config.js").secret;

// function to create tokens, access time is 24 hrs by default
function signToken(user) {
  const userData = user.toObject();
  delete userData.password;
  return jwt.sign(userData, jwt_secret); //formats it into the JWT encoded xx.xx.xx, to be served to frontend if needed
  //essentially just an encrypted object, but not really that encrypted
}

// function to verify tokens
function verifyToken(req, res, next) {
  const token = req.get("token") || req.body.token || req.query.token;

  // reject user if no token
  if (!token) return res.json({ success: false, error: "No token provided" });

  // try to verify token
  jwt.verify(token, jwt_secret, (err, decodedData) => {
    // error check
    if (err) return res.json({ success: false, error: "Error with token" });

    // find user associated with token
    User.findById(decodedData._id, (err, user) => {
      // reject token if no user
      if (!user) return res.json({ success: false, error: "Error with token" });

      req.user = user;
      next();
    });
  });
}

module.exports = {
  signToken,
  verifyToken
};
