const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");

/**
 *
 * @route GET api/users/all
 * @desc Get all users ** not in course **
 * @access private
 *
 */

router.get("/all", auth, async (req, res) => {
 try {
  const users = await User.find({});
  res.send(users);
 } catch (err) {
  res.send(err);
 }
});

/**
 *
 * @route   GET api/users
 * @desc    Register user
 * @access  Public
 *
 * */

router.post(
 "/",
 [
  check("name", "Name required please").not().isEmpty(),
  check("email", "Email required please").isEmail(),
  check(
   "password",
   "Please enter a password with six or more characters"
  ).isLength({
   min: 6,
  }),
 ],
 async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
   return res.status(400).json({
    errors: errors.array(),
   });
  }

  const { name, email, password } = req.body;

  try {
   // see if user exists
   let user = await User.findOne({
    email,
   });
   if (user) {
    return res.status(400).json({
     errors: [
      {
       msg: "User already exits",
      },
     ],
    });
   }
   // get users gravatar
   const avatar = gravatar.url(email, {
    s: "200",
    r: "pg",
    d: "mm",
   });

   user = new User({
    name,
    email,
    avatar,
    password,
   });

   // encrypt password
   const salt = await bcrypt.genSalt(10);
   user.password = await bcrypt.hash(password, salt);

   await user.save();

   // return jasonwebtoken
   const payload = {
    user: {
     id: user.id,
    },
   };

   jwt.sign(
    payload,
    config.get("jwtsecret"),
    {
     // 3600 in production please
     expiresIn: 360000,
    },
    (err, token) => {
     if (err) throw err;
     res.json({
      token,
     });
    }
   );
  } catch (err) {
   console.error(err.message);
   res.status(500).snd("server error");
  }
 }
);

module.exports = router;
