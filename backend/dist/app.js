var _a;
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import authRouter from './routes/auth.js';
import contentRouter from './routes/content.js';
import connectMongo from "connect-mongo";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
mongoose.connect(process.env.DB_PATH, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})
    .then(function () {
    console.log("Mongoose connected to %s database", process.env.DB_PATH);
    app.listen(port, function () {
        console.log('Сервер запущен. Порт:', port);
    });
})
    .catch(function (err) {
    console.log("Database connection error", err.message);
});
var app = express();
var MongoStore = connectMongo(session);
var sessionStore = new MongoStore({
    mongooseConnection: mongoose.createConnection(process.env.SESSION_DB_PATH, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    }),
});
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
    name: 'sid',
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        //process.env.NODE_ENV === 'production'
        secure: process.env.NODE_ENV === 'development',
        maxAge: 1000 * 60 * 60 * 24 * 365,
    },
}));
app.use('/auth', authRouter);
app.use('/content', contentRouter);
var port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3100;
