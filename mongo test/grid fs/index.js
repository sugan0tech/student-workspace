const express = require("express");
const gridfs = require("GridFS");
const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/test";
mongoose.connect(url, () => { console.log("connected to db") }, (e) => { console.log("error occured in connecting the server") })
const app = express();