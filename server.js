// * DEPENDENCIES
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const http = require("http");

// * ENVIRONMENT VARIABLES
const ENV = "development";
const DOMAIN = ENV === "development" ? "localhost" : "";
const PORT = 6001;

// * EXPRESS SERVER
const app = express();
const server = http.createServer(app); // create a server using the express app
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

server.listen(PORT, DOMAIN, () => {
  // listen to incoming connections
  console.log(`Server listening on port ${PORT}`);
});

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
  })
);

// * Database
require("./database/db");
const MongoStore = require("connect-mongodb-session")(session);
const store = new MongoStore({
  uri: "mongodb://127.0.0.1:27017",
  collection: "sessions",
});

// * MiddleWare & Routes
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      maxAge: 1000 * 60 * 60 * 60, // 1 hour
    },
  })
);
const user = require("./database/schemas/User");
async function checkSessions(req, res, next) {
  if (req.session.userID) {
    if (await user.findById(req.session.userID)) {
      next();
    } else {
      res.status(401).json({message: "Unauthorized"});
    }
  } else {
    res.status(401).json({message: "Unauthorized"});
  }
}

module.exports = checkSessions;
const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);
const friendsRoutes = require("./routes/friends");
app.use("/friends", checkSessions, friendsRoutes);

// Socket.IO events
io.on("connection", socket => {
  console.log("User connected:", socket.id);
  socket.on("send-message", async (message, room) => {
    const {sentBy, receiver} = message;
    const msg = message.message;
    const messageSender = await user.findOne({privateID: sentBy});
    const senderUsername = messageSender.username;
    const messageReceiver = await user.findOne({privateID: receiver});
    const receiverUsername = messageReceiver.username;

    const roomtoUpdate = messageSender.friends.find(
      friend => friend.roomID === room
    );
    const roomtoUpdate2 = messageReceiver.friends.find(
      friend => friend.roomID === room
    );
    roomtoUpdate.messages.push({
      message: msg,
      sentBy: senderUsername,
      to: receiverUsername,
    });
    roomtoUpdate2.messages.push({
      message: msg,
      sentBy: senderUsername,
      to: receiverUsername,
    });
    await messageSender.save();
    await messageReceiver.save();

    const finalMessage = {
      message: msg,
      sentBy: senderUsername,
      receiver: receiverUsername,
    };
    io.to(room).emit("receive-message", finalMessage);
  });
  socket.on("join-room", async (room, client, friend) => {
    socket.join(room);
    const clientUser = await user.findOne({privateID: client});

    const getMessages = clientUser.friends.find(
      friend => friend.roomID === room
    ).messages;
    
    socket.emit("messages", getMessages);
  });
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});
