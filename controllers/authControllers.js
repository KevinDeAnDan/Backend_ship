const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authController = {
  //REGISTER
  registerUser: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);

      const isAdmin = !!req.body.isAdmin;

      //Create new user
      const newUser = await new User({
        username: req.body.username,
        email: req.body.email,
        password: hashed,
        admin: isAdmin,
      });

      //Save to DB
      const user = await newUser.save();
      res.status(200).json(user);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },
  //LOG IN
  loginUser: async (req, res) => {
    try {
      console.log("req", req.body);
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        res.status(400).json("Sai username!");
        return;
      }
      const validPassword = await bcrypt.compare(
        req.body?.password || "",
        user.password
      );
      if (!validPassword) {
        return res.status(400).json("Sai password");
      }
      if (user && validPassword) {
        const accessToken = jwt.sign(
          {
            id: user.id,
            admin: user.admin,
          },
          process.env.KEY_JWB,
          { expiresIn: "1y" }
        );
        res.status(200).json({ user, accessToken });
        return;
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  getAbc: async (req, res) => {
    res.status(200).json(123);
  },
};

module.exports = authController;
