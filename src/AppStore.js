import Card from './Card.js';
import Deck from './Deck.js';

class AppStore {
  constructor() {
    this.deckIds = {};
    this.cards = {};
    this.nextCardId = 1;
    this.nextDeckId = 1;
    this.createDeck('Random Trivia');
    this.createCard('How many championships did Michael Jordan win?', '6');
    this.createCard('Who is the founder of Linux?', 'Linus Torvalds');
    this.createCard('Who was the first programmer ever?', 'Ada Lovelace');
    this.createCard('What candy does E.T.?', "Reese's Pieces");
    this.createCard(
      'What is the top speed a freefalling object can reach called?',
      'Terminal velocity',
    );
    this.createCard(
      'What is the name of the hero in most Tom Clancy novels?',
      'Jack Ryan',
    );
    this.createCard('What is a somnambulist?', 'A sleepwalker');
    this.addCardToDeck(1, 1);
    this.addCardToDeck(1, 2);
    this.addCardToDeck(1, 3);
    this.addCardToDeck(1, 4);
    this.addCardToDeck(1, 5);
    this.addCardToDeck(1, 6);
    this.addCardToDeck(1, 7);
  }

  createCard = (question, answer) => {
    let newCard = new Card(this.nextCardId, question, answer);
    this.cards[this.nextCardId] = newCard;
    this.nextCardId += 1;
    return newCard;
  };

  getCardsFromDeck = deckId => {
    let cardIds = this.getDeck(deckId).cardIds;
    let cards = [];
    for (let i = 0; i < cardIds.length; i++) {
      let cardId = cardIds[i];
      cards.push(this.getCard(cardId));
    }
    return cards;
  };

  getDeckName = deckId => {
    return this.deckIds[deckId].name;
  };

  getCard = cardId => {
    return this.cards[cardId];
  };

  getCards = () => {
    //get all keys of the object then iterate through the keys
    const keys = Object.keys(this.cards);
    let cardStack = [];
    for (let i = 0; i < keys.length; i++) {
      let card = this.getCard(keys[i]);
      cardStack.push(card);
    }
    return cardStack;
  };

  checkDeckName = name => {
    const keys = Object.keys(this.deckIds);
    for (let i = 0; i < keys.length; i++) {
      if (this.getDeckName(keys[i]) === name) {
        window.alert('That deck already exists!');
        return false;
      }
    }
    return true;
  };

  createDeck = name => {
    let newDeck = new Deck(this.nextDeckId, name);
    this.deckIds[this.nextDeckId] = newDeck;
    this.nextDeckId += 1;
    return newDeck;
  };

  addCardToDeck = (deckId, cardId) => {
    this.deckIds[deckId].cardIds.push(cardId);
    this.cards[cardId].deckIds.push(deckId);
  };

  deleteCard = cardId => {
    delete this.cards[cardId];
  };

  getDeck = deckId => {
    return this.deckIds[deckId];
  };

  getDeckNames = () => {
    const keys = Object.keys(this.deckIds);
    let deckNames = [];
    for (let i = 0; i < keys.length; i++) {
      let deckName = this.getDeck(keys[i]).name;
      deckNames.push(deckName);
    }
    return deckNames;
  };

  getDecks = () => {
    const keys = Object.keys(this.deckIds);
    let deckStack = [];
    for (let i = 0; i < keys.length; i++) {
      let deck = this.getDeck(keys[i]);
      deckStack.push(deck);
    }
    return deckStack;
  };
}

const sharedAppStore = new AppStore();
export default sharedAppStore;
