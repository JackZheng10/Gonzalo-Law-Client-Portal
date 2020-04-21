const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const ProjectSchema = require("./Project");
const bcrypt = require("bcrypt-nodejs");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      uniqueCaseInsensitive: true,
      required: true,
    },
    name: {
      type: String,
      unique: false,
      required: true,
    },
    password: {
      type: String,
      required: true,
      unique: false,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      unique: false,
    },
    projects: {
      type: [ProjectSchema],
      required: true,
      unique: false,
    },
    calendarID: {
      type: String,
      unique: false,
      default: "",
    },
  },
  { versionKey: false },
  {
    id: false,
    toObject: {
      virtuals: true,
      getters: true,
    },
    toJSON: {
      virtuals: true,
      getters: true,
      setters: false,
    },
  }
);

// adds method to user to create hashed password
UserSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

// adds method to user to check if password is correct
UserSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

// had to add this, checks if password was changed before saving
// before user saved in db
UserSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    this.password = this.generateHash(this.password);
  }
  next();
});

UserSchema.plugin(uniqueValidator, {
  type: "mongoose-unique-validator",
  message: "Error, expected {PATH} to be unique.",
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
