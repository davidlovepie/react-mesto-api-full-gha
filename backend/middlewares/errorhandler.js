const { ValidationError, CastError, DocumentNotFoundError } = require('mongoose').Error;
const BadRequest = require('../errors/BadRequest');
const Conflict = require('../errors/Conflict');
const NotFoundError = require('../errors/NotFoundError');
const Unauthorized = require('../errors/Unauthorized');
const Forbidden = require('../errors/Forbidden');

module.exports = (err, req, res, next) => {
  console.log(err);
  if (err instanceof CastError || err instanceof ValidationError) {
    return res
      .status(400)
      .send({ message: `Переданы некорректные данные ${400}` });
  }
  if (err instanceof DocumentNotFoundError) {
    return res
      .status(404)
      .send({
        message: `Пользователь не найден ${404}`,
      });
  }
  if (err instanceof NotFoundError) {
    return res.status(404).send({ message: err.message });
  }
  if (err instanceof Unauthorized) {
    return res.status(401).send({ message: err.message });
  }
  if (err instanceof Conflict) {
    return res.status(409).send({ message: err.message });
  }
  if (err instanceof BadRequest) {
    return res.status(400).send({ message: err.message });
  }
  if (err instanceof Forbidden) {
    return res.status(403).send({ message: err.message });
  }
  if (err.code === 11000) {
    return res.status(409).send({ message: 'Почта уже зарегистрирована' });
  }
  res.status(500).send('Ошибка на сервере');

  return next();
};
