const { urlencoded } = require("express");
const express = require("express");
const router = express.Router();
const passport = require("passport");
const app = express();
const User = require("./../models/user");

module.exports.renderRegister = (req, res) => {
  res.render("users/register");
};

module.exports.register = async (req, res, next) => {
  try {
    console.log(req.body);
    const { email, username, password, comp_type } = req.body;
    console.log(comp_type);
    const user = new User({ email, username, comp_type });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      res.redirect("/");
    });
  } catch (e) {
    req.flash("error", `${e.message}`);
    console.log(e);
    res.redirect("register");
  }
};

module.exports.renderLogin = (req, res) => {
  res.render("users/login");
};

module.exports.login = (req, res) => {
  try {
    console.log("Hello Inside Login controller");
    console.log(req.user);
    res.redirect("/");
  } catch (e) {
    console.log(e);
  }
};

module.exports.logout = (req, res) => {
  req.logout(function (err) {
    if (err) {
      console.log(err);
    }
    console.log("Logging Out");
    req.flash("success", "Goodbye!");
    res.redirect("/");
  });
};

module.exports.dashboard = async (req, res) => {
  const user = req.user;
  const users = await User.findById(req.user._id).populate("coupon");
  var total_coupons = 0;
  console.log(users.coupon);
  users.coupon.forEach((e) => {
    console.log(total_coupons);
    total_coupons += e.numCodes;
  });
  console.log(total_coupons);
  res.render("coupon/dashboard", { users, total_coupons });
};
