const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },

  link: {
    type: String,
    required: true,
    validate: {
      validator: (v) => /(https?:\/\/)(www)?([a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=])*#?$/.test(v),
      message: 'некорректная ссылка',
    },
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },

  likes: [{
    type: mongoose.Schema.Types.ObjectId,
  }],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
