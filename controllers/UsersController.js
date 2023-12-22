const Users = require('../models/UserModel');
const mongoose = require('mongoose');

const loginUser = async (req, res) => {
  res.json({ msg: 'check login' });
};
const signupUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await Users.signup(username, email, password);
    console.log(user);
    console.log(user);
    res.status(200).json({ email, user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  loginUser,
  signupUser,
};
