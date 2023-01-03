const express = require("express");
const app = express();
const path = require("path");
const bodyparser = require("body-parser");
const session = require("express-session");
const { v4: uuidv4 } = require("uuid");

const router = require("./routes/router");

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true })); //responsilble for passing req in middleware

app.set("view engine", "ejs");

app.use(
  session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/", router);
app.listen(3400);
