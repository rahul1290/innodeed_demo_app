const express = require("express");
var router = express.Router();
const User = require("../models/Users");

// var redis = require("redis");
// const redisClient = redis.createClient();
// redisClient.connect();
var faker = require("faker");

router.post("/fake", async (req, res) => {
  for (let i = 0; i < 10; i++) {
    const user = new User({
      name: faker.name.findName(),
      age: Math.floor(Math.random() * 100) + 1,
      email: faker.internet.email(),
    });

    try {
      const saveUser = await user.save();
    } catch (err) {
      res.json({
        message: err,
      });
    }
  }
});

//Get all users
router.get("/", async (req, res) => {
  try {
    // let keyName = "allUser";
    // let getCacheData = await redisClient.get(keyName);
    // if (getCacheData) {
    //   console.log("get cache");
    //   console.timeEnd("getAllUser");
    //   res.json(JSON.parse(getCacheData));
    // } else {
    //   console.log("set cache");
    const allUsers = await User.find();
    // console.timeEnd("getAllUser");
    // redisClient.set(keyName, JSON.stringify(allUsers));
    res.json(allUsers);
    // }
  } catch (err) {
    res.json({
      message: err,
    });
  }
});

//get specific user
router.get("/:userId", async (req, res) => {
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
});

//delete user
router.delete("/:userId", async (req, res) => {
  try {
    //const removedUser = await User.deleteOne({ _id: req.params.userId });
    console.log("sd");
    redisClient.del("allUsers");

    //res.json(removedUser);
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

//update User all records
router.put("/:userId", async (req, res) => {
  try {
    const updatedUser = await User.updateOne(
      { _id: req.params.userId },
      {
        $set: {
          name: req.body.name,
          age: req.body.age,
          email: req.body.email,
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
