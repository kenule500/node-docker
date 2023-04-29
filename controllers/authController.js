const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

exports.signUp = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const hashPass = await bcrypt.hash(password, 12);
    const user = await User.create({
      username,
      password: hashPass,
    });
    // req.session.user = user;
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "failed",
      error,
    });
  }
};

exports.login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({
        status: "failed",
        message: "user not found",
      });
    }
    const isCorrect = await bcrypt.compare(password, user.password);

    if (isCorrect) {
      // req.session.user = user;
      res.status(200).json({
        status: "success",
      });
    }
    if (!isCorrect) {
      return res.status(404).json({
        status: "failed",
        message: "invalid credentials",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "failed",
    });
  }
};
