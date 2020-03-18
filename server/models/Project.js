const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: false,
    required: true
  },
  type: {
    type: String,
    unique: false,
    required: false
  },
  phase: {
    type: Number,
    required: true
  }
});

const Project = mongoose.model("Project", ProjectSchema);

(module.exports = ProjectSchema)
