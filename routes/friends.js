const {Router} = require("express");
const router = Router();
const User = require("../database/schemas/User");

router.get("/getFriends", async (req, res) => {
  const {privateID} = req.session;
  const user = await User.findOne({privateID});
  const friends = await Promise.all(
    user.friends.map(async friendID => {
      const user = await User.findOne({privateID: friendID});
      return {username: user.username, privateID: user.privateID};
    })
  );
  return res.status(200).json({message: "Friends found", friends: friends});
});

router.post("/addFriend", async (req, res) => {
  console.log(req.body);
  const {privateID} = req.session;
  const {friendID} = req.body;
  const user = await User.findOne({privateID});
  const friend = await User.findOne({privateID: friendID});
  if (!friend) {
    return res.status(404).json({message: "Not found"});
  }
  if (user.friends.includes(friend.privateID)) {
    return res.status(400).json({message: "Already a friend"});
  }
  user.friends.push(friend.privateID);
  friend.friends.push(user.privateID);
  await user.save();
  await friend.save();
  return res.status(200).json({message: "Friend added"});
});

module.exports = router;
