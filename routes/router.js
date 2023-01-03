var express = require("express");
var router = express.Router();

router.get("/", (req, res) => {
  if (req.session.user) {
    res.render("dashboard", { user: req.session.user, name: req.session.name });
  } else {
    res.redirect("/login");
  }
});

const credential = [
  {
    email: "admin@gmail.com",
    password: "admin#123",
    name: "mohammed rafhath",
  },
  {
    email: "admin1@gmail.com",
    password: "admin@123",
    name: "Rafhathdana",
  },
];

router.get("/login", (req, res) => {
  if (req.session.user) {
    res.redirect("/");
  } else {
    res.render("index", { title: "Login System" });
  }
});

//login user
router.post("/login", (req, res) => {
  for (secretkey of credential) {
    if (
      req.body.email == secretkey.email &&
      req.body.password == secretkey.password
    ) {
      flag = 0;
      req.session.user = req.body.email;
      req.session.name = secretkey.name;
      res.redirect("/login");
      break;
    } else {
      flag = 1;
    }
  }
  if (flag == 1) {
    errmsg = "Invalid Username or Password";
    res.render("index", { err_msg: errmsg });
  }
});

//route for logout
router.get("/logout", (req, res) => {
  req.session.destroy(function (err) {
    if (err) {
      res.send("Error");
    } else {
      res.redirect("/");
    }
  });
});

module.exports = router;
