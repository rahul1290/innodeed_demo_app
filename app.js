const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = process.env.port || 3000;
const bodyParser = require("body-parser");
require("dotenv/config");
const userRoute = require("./routes/users");

app.use(bodyParser.json());
app.use("/users", userRoute);

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
  console.log("database connected.");
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
