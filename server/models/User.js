const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    unique: false
  }
},
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
  type: 'mongoose-unique-validator',
    message: 'Error, expected {PATH} to be unique.'
});


const User = mongoose.model('User', UserSchema);

module.exports = User;