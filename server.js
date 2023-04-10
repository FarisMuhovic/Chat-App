// * DEPENDENCIES
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// * ENVIRONMENT VARIABLES
const ENV = "development";
const DOMAIN = ENV === "development" ? "localhost" : "";
const PORT = 6001;

// * EXPRESS SERVER
const app = express();
app.listen(PORT, `${DOMAIN}`, () => {
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
      maxAge: 1000 * 60 * 60, // 1 hour
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
