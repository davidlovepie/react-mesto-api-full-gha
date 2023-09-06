// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();
const express = require('express');
const errorCelebrate = require('celebrate').errors;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const { auth } = require('./middlewares/auth');
const validation = require('./middlewares/validation');
const errorhandler = require('./middlewares/errorhandler');
const NotFoundError = require('./errors/NotFoundError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(requestLogger); // подключаем логгер запросов

app.use(cors);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use('/users', auth, usersRouter);

app.use('/cards', auth, cardsRouter);

app.post('/signin', validation.validateSignin, login);

app.post('/signup', validation.validateSignup, createUser);

app.use('/:404', () => {
  throw new NotFoundError('страница не найдена');
});

app.use(errorLogger);

app.use(errorCelebrate());

app.use(errorhandler);

app.listen(3000, () => {
  console.log('apple');
});
