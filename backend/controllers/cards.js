const Forbidden = require('../errors/Forbidden');
const NotFoundError = require('../errors/NotFoundError');

const Card = require('../models/card');

const getCards = (req, res, next) => {
  Card.find({})
    .then((data) => {
      res.send({ data });
    })
    .catch((error) => {
      next(error);
    });
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((data) => {
      res.status(201).send({ data });
    })
    .catch((error) => {
      next(error);
    });
};

const deleteCard = (req, res, next) => {
  const _id = req.params.cardId;
  const userId = req.user._id;
  Card.findOne({ _id })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }
      if (userId !== card.owner._id.toString()) {
        throw new Forbidden('Это не твоя карточка. Пока');
      }
      Card.findByIdAndRemove(_id)
        .then((data) => {
          if (!data) {
            throw new NotFoundError('Карточка не найдена');
          }
          res.send({ data });
        })
        .catch((error) => {
          next(error);
        });
    })
    .catch((error) => {
      next(error);
    });
};

const addLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  ).then((data) => {
    if (!data) {
      throw new NotFoundError('Карточка не найдена');
    }
    res.send({ data });
  })
    .catch((error) => {
      next(error);
    });
};

const deleteLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  ).then((data) => {
    if (!data) {
      throw new NotFoundError('Карточка не найдена');
    }
    res.send({ data });
  })
    .catch((error) => {
      next(error);
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  addLike,
  deleteLike,
};
