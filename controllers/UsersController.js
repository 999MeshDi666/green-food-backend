const Users = require('../models/UserModel');

const jwt = require('jsonwebtoken');

const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, { expiresIn: '30s' });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Users.login(email, password);
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const signupUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await Users.signup(username, email, password);
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  loginUser,
  signupUser,
};
