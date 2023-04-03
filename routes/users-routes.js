const express = require("express");
const { check } = require("express-validator");
const usersControllers = require("../controllers/users-controller");
const router = express.Router();
router.post(
  "/signup",
  [
    check("email")
      .trim()
      .escape()
      .normalizeEmail({
        all_lowercase: true,
        gmail_lowercase: true,
        gmail_remove_dots: false,
        gmail_remove_subaddress: false,
        gmail_convert_googlemaildotcom: false,
        outlookdotcom_lowercase: true,
        outlookdotcom_remove_subaddress: false,
        yahoo_lowercase: true,
        yahoo_remove_subaddress: false,
        icloud_lowercase: true,
        icloud_remove_subaddress: false,
      })
      .isEmail(),
    check("password").trim().escape().isStrongPassword(),
  ],
  usersControllers.signup
);
router.post(
  "/login",
  [
    check("email")
      .trim()
      .escape()
      .normalizeEmail({
        all_lowercase: true,
        gmail_lowercase: true,
        gmail_remove_dots: false,
        gmail_remove_subaddress: false,
        gmail_convert_googlemaildotcom: false,
        outlookdotcom_lowercase: true,
        outlookdotcom_remove_subaddress: false,
        yahoo_lowercase: true,
        yahoo_remove_subaddress: false,
        icloud_lowercase: true,
        icloud_remove_subaddress: false,
      })
      .isEmail(),
  ],
  usersControllers.login
);

module.exports = router;
