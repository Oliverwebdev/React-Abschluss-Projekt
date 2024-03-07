// controllers/userController.js
import User from '../models/User.js';

export const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.send(users);
};

export const createUser = async (req, res) => {
  const newUser = await User.create(req.body);
  res.send(newUser);
};
