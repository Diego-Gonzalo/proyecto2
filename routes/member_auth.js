const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/User");
//const mail = require("../helpers/mailer");

router.get("/login", (req, res) => {
  res.render("login", {
    member: true
  });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/member/login"
  })
);

router.get("/register", (req, res) => {
  res.render("register", {
    member: true
  });
});

router.post("/register", (req, res) => {
  if (req.body.password !== req.body["password-confirm"])
    return res.render("register", { msg: "Las contraseñas no son iguales" });
  const { name, last_name, email, services, password } = req.body;
  User.register({ name, last_name, email, services, role: "MEMBER" }, password)
    .then(user => {
      const options = {
        email: user.email,
        subject: "Confirma tu correo",
        message: "O confirmas o cuello"
      };
      //mail.send(options);
      //res.redirect("/auth/login");
      res.send(user);
    })
    .catch(err => {
      res
        .status(500)
        .render("register", { err, msg: "No pudimos registrarte" });
    });
});

router.post("/logout", (req, res) => {
  req.logout();
  res.redirect("/member/login");
});

module.exports = router;
