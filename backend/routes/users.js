const usersRouter = require('express').Router();
const { getUsers } = require('../controllers/users');
const { getUser } = require('../controllers/users');
const { updateProfile } = require('../controllers/users');
const { updateAvatar } = require('../controllers/users');
const { getUserInfo } = require('../controllers/users');
const validation = require('../middlewares/validation');

usersRouter.get('/', getUsers);

usersRouter.get('/me', getUserInfo);

usersRouter.patch('/me', validation.validateProfile, updateProfile);

usersRouter.patch('/me/avatar', validation.validateAvatar, updateAvatar);

usersRouter.get('/:userId', validation.validateId, getUser);

module.exports = usersRouter;
