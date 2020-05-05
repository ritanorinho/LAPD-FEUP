require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");

const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const userRouter = require("./api/routes/user");
const categoryRouter = require("./api/routes/category");
const emotionRouter = require("./api/routes/emotion");
const genreRouter = require("./api/routes/genre");
const uegRouter = require("./api/routes/userEmotionGenre");
const eventRouter = require("./api/routes/event");
const detectRouter = require("./api/routes/detect");


const init = require('./config/passport/init');

const seed = require("./seed/seeder");


mongoose.connect("mongodb+srv://ADMIN:ADMIN@cluster0-gi0qi.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => {
    console.log('connected to database')
    //seed.seedDB();
})
app.use(bodyParser.json({ limit: "2mb" }))
app.use(bodyParser.urlencoded({ limit: "2mb", extended: true, parameterLimit: 2000 }))

app.use(cookieParser());

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: false },
  })
);

app.use(passport.initialize());
app.use(passport.session());


init(passport);

app.use("/api/user", userRouter);
app.use("/api/category", categoryRouter);
app.use("/api/emotion", emotionRouter);
app.use("/api/genre", genreRouter);
app.use("/api/userEmotionGenre", uegRouter);
app.use("/api/event", eventRouter);
app.use("/api/detect", detectRouter);




app.listen(4000, () => console.log("server started"));
