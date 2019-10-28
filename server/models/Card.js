const mongoose = require('mongoose');

const CardSchema = mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  },
});

mongoose.Schema({
  username: String,
  password: String,
});

module.exports = mongoose.model('Card', CardSchema);
