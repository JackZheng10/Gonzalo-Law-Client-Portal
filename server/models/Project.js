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
    required: true
  },
  phase: {
    type: Number,
    required: true,
    default: 0
  },
  files: {
    type: [String],
    required: false,
    unique: false
  }
});

const Project = mongoose.model("Project", ProjectSchema);

(module.exports = ProjectSchema)
