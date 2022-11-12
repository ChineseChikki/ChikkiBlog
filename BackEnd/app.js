const express = require("express");
const app = express();
const cors = require("cors"); /* for allowing cross platform request */
require("dotenv").config();

//DATABASE FOR CONNECTION
const mongoose = require("mongoose");
const userRouter = require("./server/routes/userRouter");
const postRouter = require("./server/routes/postRouter");

const fs = require("fs");
const path = require("path");
const loadSeedData = require("./utils/loadSeed");

//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// FOR IMAGE UPLOADS TO THE DATABASE
fs.readdir("./uploads", { encoding: "utf8" }, (err) => {
  if (err) {
    fs.mkdirSync("./uploads", { encoding: "utf8" }, (err) => {
      if (err) console.log("Could not create directory: " + err.message);
      else console.log("Directory created successfully");
    });
  } else console.log("Directory already exist");
});
app.use(express.static(path.join(__dirname, "uploads")));

loadSeedData();

//imports all routes from routes folder
app.use("/auth", userRouter);
app.use("/api", postRouter);

// CONNECT THE MONGO DB ONLINE
mongoose.connect(process.env.MONGODB_URL, function (err) {
  if (err) {
    console.error("Failed to connect", err);
  } else {
    console.log("connected");
  }
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server running at port ${port}`));
