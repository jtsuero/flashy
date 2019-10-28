const express = require('express');
const router = express.Router();
const Deck = require('../models/Deck');
const Card = require('../models/Card');

router.get('/', async (req,res) => {
  try{
    const decks = await Deck.find();
    res.json(decks);
  } catch (err) {
    res.json({ message: err });
  }
});


router.get('/', async (req,res) => {
  try{
    const decks = await Deck.find();
    res.json(decks);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get('/:id', async (req,res) => {
   try{
    const deck = await Deck.findById(req.params.id);
    res.json(deck);
   } catch(err) {
    res.json({ message: err });
   }
});

router.post('/card', async (req,res) => {
  const card = new Card({
    question: req.body.question,
    answer: req.body.answer
  });
  try{
    const savedCard = await card.save();
    res.json(savedCard);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get('/card/:id', async (req,res) => {
   try{
    const card = await Card.findById(req.params.id);
    res.json(card);
   } catch(err) {
    res.json({ message: err });
   }
});

router.put('/:id', async (req,res) => {
  try{
    //need to get all ids already in deck
    const updatedDeck = await Deck.updateOne({_id: req.params.id},
    { $push: {cardIds: req.body.cardId} });
    res.json(updatedDeck);
  } catch (err) {
    res.json({ message: err });
  }
});

router.put('/remove/:id', async (req,res) => {
  try{
    //need to get all ids already in deck
    const updatedDeck = await Deck.updateOne({_id: req.params.id},
    { $pull: {cardIds: req.body.cardId} });
    res.json(updatedDeck);
  } catch (err) {
    res.json({ message: err });
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
    const deletedDeck = await Deck.remove({_id: req.params.id});
    res.json(deletedDeck);
   } catch(err) {
    res.json({ message: err });
   }
});

router.delete('/card/:id', async (req,res) => {
   try{
    const deletedCard =  await Card.remove({_id: req.params.id});
    res.json(deletedCard);
   } catch(err) {
    res.json({ message: err });
   }
});


module.exports = router;
