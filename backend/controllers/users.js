// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require('bcryptjs');
// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const Unauthorized = require('../errors/Unauthorized');
const NotFoundError = require('../errors/NotFoundError');

const getUsers = (req, res, next) => {
  User.find({})
    .then((data) => {
      res.send({ data });
    })
    .catch((error) => {
      next(error);
    });
};

// const getUser = (req, res) => {
//   const { _id } = req.user;
//   User.findById({ _id })
//     .then((data) => {
//       if (!data) {
//         throw new Error('404');
//       }
//       res.send({ data });
//     })
//     .catch((error) => {
//       if (error.message === '404') {
//         res.status(404).send({ message: '404 — Пользователь с указанным _id не найден' });
//       } else if (error.name === 'Error' && _id.length === 24) {
//         res.status(404).send({ message: '404 — Пользователь с указанным _id не найден' });
//       } else if (error.name === 'CastError') {
//   res.status(400).send({ message: '400 — Переданы некорректные данные при обновлении профиля' });
//       } else {
//         res.status(500).send({ message: 'Ошибка на сервере' });
//       }
//     });
// };

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
      const token = jwt.sign({ _id: user._id }, 'super-strong-secret', { expiresIn: '7d' });
      res
        .cookie('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true })
        .status(200)
        .json({ token });
    // .end();
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
