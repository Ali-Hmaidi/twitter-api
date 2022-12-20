require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();

const authRouter = require("./routes/auth");
const tweetsRouter = require("./routes/tweets");
const usersRouter = require("./routes/users");
const followersRouter = require("./routes/followers");
const savedTweets = require("./routes/savedTweets");
const hiddenTweets = require("./routes/HiddenTweets");
const comments = require("./routes/comments");
const likes = require("./routes/likes");

//connect DB
const connectDB = require("./db/connect");

const authenticateUser = require("./middleware/authentication");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// middleware
app.use(express.json());

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/tweets", authenticateUser, tweetsRouter);
app.use("/api/v1/users", authenticateUser, usersRouter);
app.use("/api/v1/followers", authenticateUser, followersRouter);
app.use("/api/v1/savedTweets", authenticateUser, savedTweets);
app.use("/api/v1/hiddenTweets", authenticateUser, hiddenTweets);
app.use("/api/v1/comments", authenticateUser, comments);
app.use("/api/v1/likes", authenticateUser, likes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

var port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
