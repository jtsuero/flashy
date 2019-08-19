const express = require('express');
const router = express.Router();
const Deck = require('../models/Deck');

router.get('/', async (req,res) => {
  try{
    const decks = await Deck.find();
    res.json(decks)
  } catch (err) {
    res.json({ message: err })
  }
});

router.get('/:id', async (req,res) => {
   try{
    const deck = await Deck.findById(req.params.id);
    res.json(deck);
   } catch(err) {
    res.json({ message: err })
   }
});

router.post('/', async (req,res) => {
  const deck = new Deck({
    deckName: req.body.deckName,
    cardIds: req.body.cardIds
  });
  try{
    const savedDeck = await deck.save()
    res.json(savedDeck);
  } catch (err) {
    res.json({ message: err });
  }
});

router.delete('/:id', async (req,res) => {
   try{
    const deletedDeck = Deck.remove({_id: req.paramas.id});
    res.json(deletedDeck);
   } catch(err) {
    res.json({ message: err })
   }
});


module.exports = router;
