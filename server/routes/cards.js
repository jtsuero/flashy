const express = require('express');
const router = express.Router();
const Card = require('../models/Card');
const verify = require('./verifyToken');

router.get('/', verify, async (req,res) => {
  console.log('no cards yet!');
  try{
    const cards = await Card.find();
    res.json(cards)
  } catch (err) {
    res.json({ message: err })
  }
});

router.get('/:id', verify, async (req,res) => {
   try{
    const card = await Card.findById(req.params.id);
    res.json(card);
   } catch(err) {
    res.json({ message: err });
   }
});

router.post('/', verify, async (req,res) => {
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

router.delete('/:id', verify, async (req,res) => {
   try{
    const deletedCard =  await Card.remove({_id: req.params.id});
    res.json(deletedCard);
   } catch(err) {
    res.json({ message: err });
   }
});

module.exports = router;
