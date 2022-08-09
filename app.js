/** @format */

const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");
const cors = require("cors");
const bodyParser = require("body-parser");
const productRouter = require("./routes/product");

//middleware
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.use(function (err, req, res, next) {
  console.error(err.stack);
  if (err.message === "Bad request") {
    res.status(400).json({ error: { msg: err.message, stack: err.stack } });
  }
  res.status(500).send("Something broke!");
});

//authorization
app.use(function (req, res, next) {
  if (req.headers.apikey !== "AHES6ZRVmB7fkLtd1") {
    return res.status(403).json({ error: "No credentials sent!" });
  }
  next();
});

app.use("/products", productRouter);

app.get("/", (req, res) => {
  res.send("we are on home");
});

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, err => {
  if (err) console.log(err);
  else console.log("mongdb is connected");
});

app.listen(3000);
