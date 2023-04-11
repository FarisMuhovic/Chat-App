const {Router} = require("express");
const router = Router();

const crypto = require("crypto");
const {hashPassword, comparePassword} = require("../utils/passwordHasher");
const checkSessions = require("../server");
const User = require("../database/schemas/User");

router.post("/register", async (req, res) => {
  let {username, password} = req.body;
  if (await User.findOne({username})) {
    return res.status(401).json({message: "Unauthorized"});
  } else {
    password = hashPassword(password);
    const privateID = crypto.randomUUID();
    const createdUser = await User.create({username, password, privateID});
    req.session.userID = createdUser.id;
    req.session.privateID = createdUser.privateID;
    return res.status(201).json({message: "User created"});
  }
});
router.post("/login", async (req, res) => {
  let {username, password} = req.body;
  const potentialUser = await User.findOne({username});
  if (potentialUser) {
    password = comparePassword(password, potentialUser.password);
    if (password) {
      req.session.userID = potentialUser.id;
      req.session.privateID = potentialUser.privateID;
      return res.status(200).json({message: "User logged in"});
    } else {
      return res.status(401).json({message: "Unauthorized"});
    }
  } else {
    return res.status(401).json({message: "Unauthorized"});
  }
});
router.get("/login", checkSessions, async (req, res) => {
  // find the user data and send it back
  const user = await User.findOne({privateID: req.session.privateID});
  console.log(user.friends);
  return res
    .status(200)
    .json({
      message: "User logged in",
      username: user.username,
      privateID: req.session.privateID,
      userFriends: user.friends,
    });
});
router.get("/logout", checkSessions, async (req, res) => {
  req.session.destroy();
  return res.status(200).json({message: "User logged out"});
});

module.exports = router;
