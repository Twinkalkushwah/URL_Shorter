const jwt = require('jsonwebtoken');
const { User } = require('../models/user.model');
require("dotenv").config();

const auth = async (req, res, next) => {
  try {
    const tokenHeader = req.header('Authorization');
    if (!tokenHeader) {
      return res.status(401).json({ message: 'No token provided', isOk: false });
    }

    const token = tokenHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findOne({ _id: decoded.userId });

    if (!user) {
      return res.status(401).json({ message: 'Authentication failed', isOk: false });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed', isOk: false });
  }
};

module.exports = { auth };
