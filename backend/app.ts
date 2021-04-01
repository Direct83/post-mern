import express from 'express';
import session from 'express-session'
import cors from 'cors';
import authRouter from './routes/auth.js'
import contentRouter from './routes/content.js'
import connectMongo from "connect-mongo";

import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.DB_PATH as string, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})
  .then(() => {
    console.log("Mongoose connected to %s database", process.env.DB_PATH);
    app.listen(port, () => {
      console.log('Сервер запущен. Порт:', port);
    });
  })
  .catch((err) => {
    console.log("Database connection error", err.message);
  });

const app = express();
const MongoStore = connectMongo(session);
const sessionStore = new MongoStore({
  mongooseConnection: mongoose.createConnection(process.env.SESSION_DB_PATH as string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }),
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

interface UserSession {
  userId: string,
  userName: string,
  role: string,
  bannedTime: string,
}
declare module 'express-session' {
  interface SessionData {
    user: UserSession;
  }
}
app.use(
  session({
    name: 'sid',
    secret: process.env.SESSION_SECRET as string,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      //process.env.NODE_ENV === 'production'
      secure: process.env.NODE_ENV === 'development',
      maxAge: 1000 * 60 * 60 * 24 * 365,
    },
  }),
);

app.use('/auth', authRouter);
app.use('/content', contentRouter);

const port = process.env.PORT as string ?? 3100;

