const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
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

user.statics.signup = async function (username, email, password) {
  if (!username || !email || !password) {
    throw Error('All fields must be filled');
  }
  if (!validator.isEmail(email)) {
    throw Error('Filed must be an email');
  }
  if (!validator.isStrongPassword(password)) {
    throw Error('Password is not strong enough');
  }

  const existEmail = await this.findOne({ email });
  const existUsername = await this.findOne({ username });
  if (existEmail) {
    throw Error('Email already in use');
  }
  if (existUsername) {
    throw Error('Username already in use');
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({ username, email, password: hash });
  return user;
};

user.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error('All fields must be filled');
  }
  const user = await this.findOne({ email });
  if (!user) {
    throw Error(`email not found`);
  }
  const pass = await bcrypt.compare(password, user.password);
  if (!pass) {
    throw Error('incorrect password');
  }
  return user;
};
module.exports = mongoose.model('User', user);
