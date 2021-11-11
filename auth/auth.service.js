const User = require("../api/users/user.model");
const jwt = require("jsonwebtoken");

const logger = async (req, res, next) => {
  try {
    const { email, password } = req.query;
    const userAuth = await User.authenticate(email, password);
    let user = null;
    if (userAuth) {
      const token = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 15 * 24 * 60 * 60,
          userData: userAuth,
        },
        process.env.JWT_SECRET
      );
      req.token = token;
    } else {
      res.status(404).send("Not found");
      return;
    }
    next();
  } catch (error) {
    res.status(500).send("server error");
    next(error);
  }
};

const getData = async (req, res) => {
  try {
    let token;
    if(req.token) {
      token = req.token;
    } else {
      token = req.headers.authorization;
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userData._id);
    const data = {
      token,
      ...user
    };
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send("server error");
  }
};

const verifyAdmin = async (req, res, next) => {
  try {
    let token;
    if(req.token) {
      token = req.token;
    } else {
      token = req.headers.authorization;
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userData._id);
    if (user.isAdmin) {
      next();
    } else {
      res.status(401).send("unauthorized");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("server error");
  }
};

module.exports = { logger, getData, verifyAdmin };
