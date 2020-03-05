const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const ProjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: false,
      required: true
    },
    type: {
      type: String,
      unique: false,
      required: false
    }
  }
);

const Project = mongoose.model("Project", ProjectSchema);

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true
    },
    name: {
      type: String,
      unique: false,
      required: true
    },
    password: {
      type: String,
      required: true,
      unique: false
    },
    isAdmin: {
      type: Boolean,
      required: true,
      unique: false
    },
    projects: {
      type: [ProjectSchema],
      required: false,
      unique: false
    }
  },
  { versionKey: false },
  {
    id: false,
    toObject: {
      virtuals: true,
      getters: true
    },
    toJSON: {
      virtuals: true,
      getters: true,
      setters: false
    }
  }
);

UserSchema.plugin(uniqueValidator, {
  type: "mongoose-unique-validator",
  message: "Error, expected {PATH} to be unique."
});

const User = mongoose.model("User", UserSchema);

module.exports = User, Project;
