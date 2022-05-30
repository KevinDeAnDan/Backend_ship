const User = require("../models/User");

const userController = {
  getAllUser: async (req, res) => {
    try {
      if (!req.user?.admin) {
        res.status(403).json("May khong co quyen");
        return;
      }
      const user = await User.find();
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  deleteUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      res.status(200).json("Da xoa thanh cong");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = userController;
