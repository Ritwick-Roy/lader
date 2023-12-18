const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const authUser = require("../middleware/authUser");
require("dotenv").config();

router.get("/", authUser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id=req.params.id;
    const user = await User.findById(id).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error.message);
  }
});

router.post(
  "/login",
  [
    check("email", "Enter a valid email").isEmail(),
    check("password", "Password required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { email, password } = req.body;
      let user = await User.findOne({ email: email });
      if (!user) {
        console.log("Account not found");
        return res
          .status(400)
          .json({ error: [{ msg: "Invalid email or password" }] });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        console.log("Invalid password");
        return res
          .status(400)
          .json({ error: [{ msg: "Invalid email or password" }] });
      }

      const payload = {
        user: {
          id: user._id,
        },
      };
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 3600 * 4 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.log(error);
      res.status(500).send("Server error");
    }
  }
);

router.post(
  "/register",
  [
    check("name", "Name required").not().isEmpty(),
    check("email", "Enter a valid email").isEmail(),
    check("password", "Password short").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { name, email, password } = req.body;
      let user = await User.findOne({ email: email });
      if (user) {
        return res
          .status(400)
          .json({ error: [{ msg: "User already exists" }] });
      }
      user = new User({
        name,
        email,
        password,
      });
      const salt = await bcrypt.genSalt(10); 
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      const payload = {
        User: {
          id: User.id,
        },
      };
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 3600 * 4 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.log(error);
      res.status(500).send("Server error");
    }
  }
);


router.put('/', async(req,res)=>{
  try {
    const {name,pic} =req.body;
    const id=req.User.id;
    let User=await User.findById(id);
    let files=User.files;
    files=[...files,{name,pic}]
    User=await User.findByIdAndUpdate(id,{files});
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

module.exports = router;