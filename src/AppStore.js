class AppStore {

  createCard = (question, answer) => {
    return fetch('http://localhost:8000/cards',
      {method: 'post',
       body: JSON.stringify({question, answer}),
       mode: 'cors',
       headers: {"Content-Type": "application/json"}})
        .then((res) => res.json())
  }

  createDeck = (deckName) => {
    return fetch('http://localhost:8000/decks',
      {method: 'post',
       body: JSON.stringify({deckName}),
       mode: 'cors',
       headers: {"Content-Type": "application/json"}})
        .then((res) => res.json())
  }

  getCardsFromDeck = (deckId) => {
    let deck = this.getDeck(deckId);
    deck.then(data => data.cardIds);
  }

  getCard = (cardId) => {
    return fetch(`http://localhost:8000/cards/${cardId}`,
      {method: 'get',
       mode: 'cors',
       headers: {"Content-Type": "application/json"}})
        .then((res) => res.json())
  }

  checkDeckName = (name) => {
    const keys = Object.keys(this.deckIds);
    for(let i = 0; i<keys.length; i++) {
      if(this.getDeckName(keys[i])=== name) {
        window.alert("That deck already exists!");
        return false;
      }
    }
    return true;
  }

  addCardToDeck = (deckId, cardId) => {
    return fetch(`http://localhost:8000/decks/${deckId}`,
      {method: 'put',
       body: JSON.stringify({cardId}),
       mode: 'cors',
       headers: {"Content-Type": "application/json"}})
        .then((res) => res.json())
  }

  getCardsFromDeck = (currentDeckId) => {
    return this.getDeck(currentDeckId)
    .then(data => {return Promise.all(data.cardIds.map(this.getCard))
    });
  }

  removeCardFromDeck = (deckId, cardId) => {
    this.deleteCard(cardId);
    return fetch(`http://localhost:8000/decks/remove/${deckId}`,
      {method: 'put',
       body: JSON.stringify({cardId}),
       mode: 'cors',
       headers: {"Content-Type": "application/json"}})
        .then((res) => res.json())
  }

  deleteCard = (cardId) => {
    return fetch(`http://localhost:8000/cards/${cardId}`,
      {method: 'delete',
       mode: 'cors',
       headers: {"Content-Type": "application/json"}})
        .then((res) => res.json())
  }

  deleteDeck = (deckId) => {
    return fetch(`http://localhost:8000/decks/${deckId}`,
      {method: 'delete',
       mode: 'cors',
       headers: {"Content-Type": "application/json"}})
        .then((res) => res.json())
  }

  getDeck = (deckId) => {
    return fetch(`http://localhost:8000/decks/${deckId}`,
      {method: 'get',
       mode: 'cors',
       headers: {"Content-Type": "application/json"}})
        .then((res) => res.json())
  }

  getDeckNames = () => {
    const keys = Object.keys(this.deckIds);
    let deckNames = [];
    for(let i = 0; i < keys.length; i++) {
      let deckName = this.getDeck(keys[i]).name;
      deckNames.push(deckName);

    }
    return deckNames;
  }

  getDecks = () => {
    return fetch('http://localhost:8000/decks',
      {method: 'get',
       mode: 'cors',
       headers: {"Content-Type": "application/json"}})
        .then((res) => res.json())
  }

}

const sharedAppStore = new AppStore();
export default sharedAppStore;
