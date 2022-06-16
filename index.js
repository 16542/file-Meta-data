var express = require("express");
var cors = require("cors");
require("dotenv").config();
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

var app = express();
const BodyParser = require("body-parser");
const formidable = require("formidable");
app.use(BodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// get the inforamtion anout the file (size,name,type);

app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  var upfile = req.file;
  if (typeof upfile === "undefined") res.json({ error: "file not uploaded" });
  return res.json({
    name: upfile.originalname,
    type: upfile.mimetype,
    size: upfile.size
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
