const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = process.env.port || 8000;
const bodyParser = require("body-parser");
var cors = require("cors");
require("dotenv/config");
var redis = require("redis");
const userRoute = require("./routes/users");

const redisClient = redis.createClient();
redisClient.connect();

redisClient.on("error", (err) => console.log("Redis Clinet error", err));
redisClient.on("connect", () => {
  console.log("RedisClient connected.");
});

app.use(cors());
app.use(bodyParser.json());
app.use("/users", userRoute);

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
  console.log("database connected.");
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
