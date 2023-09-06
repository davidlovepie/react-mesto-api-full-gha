// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require('bcryptjs');
// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const Unauthorized = require('../errors/Unauthorized');
const NotFoundError = require('../errors/NotFoundError');

const { NODE_ENV, JWT_SECRET } = process.env;

const getUsers = (req, res, next) => {
  User.find({})
    .then((data) => {
      res.send({ data });
    })
    .catch((error) => {
      next(error);
    });
};

const createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((data) => {
      const user = User.findById(data._id).select('-password');
      return user;
    })
    .then((data) => {
      res.status(201).send({ data });
    })
    .catch((error) => {
      next(error);
    });
};

const updateProfile = (req, res, next) => {
  const { _id } = req.user;
  const { name, about } = req.body;
  User.findByIdAndUpdate(_id, { name, about }, { new: true, runValidators: true })
    .then((data) => {
      if (!data) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.send({ data });
    })
    .catch((error) => {
      next(error);
    });
};

const updateAvatar = (req, res, next) => {
  const { _id } = req.user;
  const { avatar } = req.body;
  User.findByIdAndUpdate(_id, { avatar }, { new: true })
    .then((data) => {
      if (!data) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.send({ data });
    })
    .catch((error) => {
      next(error);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Unauthorized('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
      // eslint-disable-next-line consistent-return
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Unauthorized('Неправильные почта или пароль'));
          }
          return user;
        });
    })
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret',
        { expiresIn: '7d' },
      );
      res
        .cookie('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true })
        .status(200)
        .json({ token });
    })
    .catch((error) => {
      next(error);
    });
};

const getUserInfo = (req, res, next) => {
  const { _id } = req.user;
  User.findById({ _id })
    .then((data) => {
      if (!data) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.send({ data });
    })
    .catch((error) => {
      next(error);
    });
};

const getUser = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((data) => {
      if (!data) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.send({ data });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateProfile,
  updateAvatar,
  login,
  getUserInfo,
};
