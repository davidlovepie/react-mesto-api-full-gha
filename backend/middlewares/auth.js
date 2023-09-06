// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/Unauthorized');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret');
    req.user = payload;
    next();
  } catch (e) {
    const err = new Unauthorized('Необходима авторизация');

    next(err);
  }
};

module.exports = {
  auth,
};
