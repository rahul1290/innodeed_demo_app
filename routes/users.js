const express = require("express");
var router = express.Router();
const User = require("../models/Users");

//Get all users
router.get("/", async (req, res) => {
  try {
    const allUsers = await User.find();
    res.json(allUsers);
  } catch (err) {
    res.json({
      message: err,
    });
  }
});

//get specific user
router.get("/:userId", async (req, res) => {
  console.log(req.params.userId);
  try {
    const specificUser = await User.findById(req.params.userId);
    res.json(specificUser);
  } catch (err) {
    res.json({
      message: err,
    });
  }
});

//save user
router.post("/", async (req, res) => {
  const user = new User({
    name: req.body.name,
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
});

//delete user
router.delete("/:userId", async (req, res) => {
  try {
    const removedUser = await User.deleteOne({ _id: req.params.userId });
    res.json(removedUser);
  } catch (err) {
    res.json({
      message: err,
    });
  }
});

//update User
router.patch("/:userId", async (req, res) => {
  try {
    const updatedUser = await User.updateOne(
      { _id: req.params.userId },
      {
        $set: {
          name: req.body.name,
        },
      }
    );
    res.json(updatedUser);
  } catch (err) {
    res.json({
      message: err,
    });
  }
});

module.exports = router;
