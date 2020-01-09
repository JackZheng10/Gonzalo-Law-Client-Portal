const User = require("./models/User");

const users = (req, res) => {
    User.find().then((users) => {
        res.json(users)
    }
    ).catch((error) => {
        res.send(error)
    }
    )
}

const login = (req, res) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
                res.json({ user: user })
    }).catch((error) => {
        res.send(error)
    }
    )
}
    
const register = (req, res) => {
    User.create({ email: req.body.email, password: req.body.password })
        .then((users) => {
            res.json(users)
        }).catch((error) => {
            res.send(error)
        })
}

module.exports = { users, login ,register }