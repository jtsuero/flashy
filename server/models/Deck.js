const mongoose = require('mongoose');

const DeckSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  cardIds: [],
});

mongoose.Schema({
  username: String,
  password: String,
});

module.exports = mongoose.model('Deck', DeckSchema);
