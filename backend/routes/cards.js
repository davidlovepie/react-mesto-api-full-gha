const cardsRouter = require('express').Router();
const { getCards } = require('../controllers/cards');
const { createCard } = require('../controllers/cards');
const { deleteCard } = require('../controllers/cards');
const { addLike } = require('../controllers/cards');
const { deleteLike } = require('../controllers/cards');
const validation = require('../middlewares/validation');

cardsRouter.get('/', getCards);

cardsRouter.post('/', validation.validateCard, createCard);

cardsRouter.delete('/:cardId', validation.validateCardId, deleteCard);

cardsRouter.put('/:cardId/likes', validation.validateCardId, addLike);

cardsRouter.delete('/:cardId/likes', validation.validateCardId, deleteLike);

module.exports = cardsRouter;
