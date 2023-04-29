const express = require("express");
const mongoose = require("mongoose");
const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
  SESSION_SECRET,
  REDIS_URL,
  REDIS_PORT,
} = require("./config/config");

const app = express();
const postRouter = require("./routes/postRoute");
const userRouter = require("./routes/userRoute");
const cors = require("cors");

// const session = require("express-session");
// const { createClient } = require("redis");
// const connectRedis = require("connect-redis");

// const RedisStore = connectRedis(session);

// const redisClient = createClient({
//   host: REDIS_URL,
//   port: REDIS_PORT,
// });

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/docker?authSource=admin`;

const connectWithRetry = () => {
  mongoose
    .connect(mongoURL)
    .then(() => console.log("successfully connected to DB"))
    .catch((e) => {
      console.log(e);
      setTimeout(() => {
        connectWithRetry;
      }, 5000);
    });
};
connectWithRetry();

app.use(express.json());
// app.use(
//   session({
//     store: new RedisStore({
//       client: redisClient,
//     }),
//     secret: SESSION_SECRET,
//     cookie: {
//       secure: false,
//       resave: false,
//       saveUninitialized: false,
//       httpOnly: true,
//       maxAge: 30000,
//     },
//   })
// );
app.use(cors({}));
app.enable("trust proxy");
app.get("/api/v1", (req, res) => {
  res.send("<h2>Hi There where are u</h2>");
  console.log("yea it ran");
});

app.use("/api/v1/posts", postRouter);
app.use("/api/v1/auth", userRouter);

const port = process.env.Port || 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
