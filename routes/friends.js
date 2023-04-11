const {Router} = require("express");
const router = Router();
const User = require("../database/schemas/User");
const crypto = require("crypto");

router.get("/getFriends", async (req, res) => {
  const {privateID} = req.session;
  const user = await User.findOne({privateID});
  const friendInfo = await Promise.all(
    user.friends.map(async friend => {
      const friendUser = await User.findOne({privateID: friend.friendID});

      return {
        username: friendUser.username,
        roomID: friend.roomID,
        userID: friendUser.privateID,
        messages: friend.messages,

        // return the messages under this line
      };
    })
  );
  return res.status(200).json({
    message: "Friends found",
    friends: friendInfo,
    myMessages: "friend messages",
  });
  // also return the friends messages
});

router.post("/addFriend", async (req, res) => {
  const {privateID} = req.session;
  const {friendID} = req.body;
  const user = await User.findOne({privateID});
  const friend = await User.findOne({privateID: friendID});
  const roomID = crypto.randomUUID();
  if (!friend) {
    return res.status(404).json({message: "Not found"});
  }
  if (user.friends.find(friend => friend.friendID === friendID)) {
    return res.status(400).json({message: "Already friends"});
  }
  user.friends.push({roomID, friendID: friend.privateID});
  friend.friends.push({roomID, friendID: user.privateID});
  await user.save();
  await friend.save();
  return res.status(200).json({message: "Friend added"});
});

module.exports = router;
// now when the users want to chat they just grab the room id and thats it !
