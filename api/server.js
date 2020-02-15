const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const knexSessionStore = require('connect-session-knex')(session); //adding to our actual session.

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');

const server = express();

const sessionConfig = {
  name: 'Monkey',
  secret: 'ohdopecookies',
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false, //false in production...
    httpOnly: true, //access to cookie can only be thorugh http, not JS or anything else.
  },
  resave: false, 
  saveUninitialized: true, //IS DA LAAAAWWW you have to get permission to save cookies

  store: new knexSessionStore({
    knex: require('../database/dbConfig.js'),
    tablename: 'sessions',
    sidfieldname: 'sid',
    createable: true,
    clearInterval: 1000 * 60 * 60
  })
};

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
  res.json({ api: 'up' });
});

module.exports = server;
