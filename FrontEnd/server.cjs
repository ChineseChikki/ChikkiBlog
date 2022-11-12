const express = require("express");
const path = require("path");

const app = express(),
  port = process.env.PORT || 3002;

app.use(express.static(path.join(__dirname, "dist")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(port, (_) => console.log("Server started on port", port));
