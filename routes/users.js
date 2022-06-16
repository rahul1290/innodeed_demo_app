const express = require("express");
var router = express.Router();
const usersCtrl = require("../controller/userCtrl");
// console.log(allUsers);
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
router.get("/", usersCtrl.allUsers);

//get specific user
router.get("/:userId", usersCtrl.specificUser);

//save user
router.post("/", usersCtrl.saveUser);

//delete user
router.delete("/:userId", usersCtrl.deleteUser);

//update User
// router.patch("/:userId", async (req, res) => {
//   try {
//     const updatedUser = await User.updateOne(
//       { _id: req.params.userId },
//       {
//         $set: {
//           name: req.body.name,
//         },
//       }
//     );
//     res.json(updatedUser);
//   } catch (err) {
//     res.json({
//       message: err,
//     });
//   }
// });

//update User all records
router.put("/:userId", usersCtrl.updateUser);

module.exports = router;
