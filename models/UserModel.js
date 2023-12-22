const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const user = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

user.statics.signup = async function ({ username, email, password }) {
  // const existEmail = this.findOne({ email });
  // const existUsername = this.findOne({ username });

  // if (existEmail) {
  //   throw Error('Email already in use');
  // }
  // if (!existUsername) {
  //   throw Error('Username already in use');
  // }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({ username, email, password: hash });
  return user;
};
module.exports = mongoose.model('User', user);
