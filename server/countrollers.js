const User = require("./models/User");

const users = (req, res) => {
    User.find().then((users) => {
        res.json(users)
    }
    ).catch((error) => {
        res.send(error)
    })
}

const login = (req, res) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (user) {
                if (user.password === req.body.password) {
                    return { user: user }
                }
                return {error:"password mismatch"}
            }
            return { error: "no user found" }
            
        }).then((response) => {
          res.json(response)
        }
        ).catch((error) => {
        res.send(error)
    }
    )
}
    

const register = (req, res) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (user) {
                return { error: "user already exists" };
            }
            else {
                User.create({
                    email: req.body.email, password: req.body.password, name: req.body.name
                })
                    .then((users) => {
                        res.json(users)
                    }).catch((error) => {
                        return { error };
                    });
            }
        }).catch((error) => {
                        res.send(error)
                    });
}
    
module.exports = { users, login ,register }