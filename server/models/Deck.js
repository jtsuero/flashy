const mongoose = require('mongoose');

const DeckSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  cardIds: [],
});

module.exports = mongoose.model('Deck', DeckSchema);
