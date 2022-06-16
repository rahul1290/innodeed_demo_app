const express = require("express");
const User = require("../models/Users");

const allUsers = async (req, res) => {
  try {
    const result = await User.find().limit(10);
    res.json({ data: result });
  } catch (err) {
    res.json({
      message: err,
    });
  }

  // User.find()
  //   .limit(10)
  //   .then((result, err) => {
  //     res.json({ data: result, msg: "all users", status: 200 });
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //   });
};

const specificUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await User.findById(userId);
    res.json({ data: result });
  } catch (err) {
    res.json({
      message: err,
    });
  }
};

const saveUser = async (req, res) => {
  const user = new User({
    name: req.body.uname,
    age: req.body.age,
    email: req.body.email,
  });
  try {
    const saveUser = await user.save();
    res.json(saveUser);
  } catch (err) {
    res.json({
      message: err,
    });
  }
};

const deleteUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const removedUser = await User.deleteOne({ _id: userId });
    res.json(removedUser);
  } catch (err) {
    res.json({
      message: err,
    });
  }
};

const updateUser = async (req, res) => {
  const { name, age, email } = req.body;
  try {
    const updatedUser = await User.updateOne(
      { _id: req.params.userId },
      {
        $set: {
          name: name,
          age: age,
          email: email,
        },
      }
    );
    res.json(updatedUser);
  } catch (err) {
    res.json({
      message: err,
    });
  }
};

module.exports = {
  allUsers,
  specificUser,
  saveUser,
  deleteUser,
  updateUser,
};
