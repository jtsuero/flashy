import Card from './Card.js';
import Deck from './Deck.js';

class AppStore {
  constructor() {
    this.decks = {};
    this.cards = {};
    this.nextCardId = 1;
    this.nextDeckId = 1;
  }

  createCard = (question, answer) => {
    let newCard = new Card(this.nextCardId, question, answer);
    this.cards[this.nextCardId] = newCard;
    this.nextCardId += 1;
    return newCard;
  }


  getCardsFromDeck = (deckId) => {
  console.log(deckId);
    let cardIds = this.getDeck(deckId).cardIds;
    let cards = [];
    for(let i = 0; i < cardIds.length; i++) {
      let cardId = cardIds[i];
      cards.push(this.getCard(cardId));
    }
    return cards;
  }

  getDeckName = (deckId) => {
    return this.decks[deckId].name;

  }

  getCard = (cardId) => {
    return this.cards[cardId];
  }

  getCards = () => {
    //get all keys of the object then iterate through the keys
    const keys = Object.keys(this.cards);
    let cardStack = [];
    for(let i = 0; i < keys.length; i++) {
      let card = this.getCard(keys[i]);
      cardStack.push(card);

    }
    return cardStack;
  }

  checkDeckName = (name) => {
    const keys = Object.keys(this.decks);
    for(let i = 0; i<keys.length; i++) {
      console.log(keys[i]);
      if(this.getDeckName(keys[i])=== name) {
        window.alert("That deck already exists!");
        return false;
      }
    }
    return true;
  }

  createDeck = (name) => {
      let newDeck = new Deck(this.nextDeckId, name);
      this.decks[this.nextDeckId] = newDeck;
      this.nextDeckId += 1;
      return newDeck;
  }

  addCardToDeck = (deckId, cardId) => {
    this.decks[deckId].cardIds.push(this.cards[cardId]);
    this.cards[cardId].decks.push(deckId);
  }

  deleteCard = (cardId) => {
    console.log("test delete!");
    console.log(this.cards[cardId]);
    return delete this.cards[cardId];
  }

  getDeck = (deckId) => {
    return this.decks[deckId];
  }

  getDeckNames = () => {
    const keys = Object.keys(this.decks);
    let deckNames = [];
    for(let i = 0; i < keys.length; i++) {
      let deckName = this.getDeck(keys[i]).name;
      deckNames.push(deckName);

    }
    return deckNames;
  }

  getDecks = () => {
    const keys = Object.keys(this.decks);
    let deckStack = [];
    for(let i = 0; i < keys.length; i++) {
      let deck = this.getDeck(keys[i]);
      deckStack.push(deck);

    }
    return deckStack;
  }

}

const sharedAppStore = new AppStore();
export default sharedAppStore;
