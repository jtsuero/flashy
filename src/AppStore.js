class AppStore {

  createCard = (question, answer) => {
    return fetch('http://localhost:8000/cards',
      {method: 'post',
       body: JSON.stringify({question, answer}),
       mode: 'cors',
       headers: {"Content-Type": "application/json"}})
        .then((res) => {return res.json()})
        .then(data => {
          return data})
  }

  createDeck = (deckName) => {
    return fetch('http://localhost:8000/decks',
      {method: 'post',
       body: JSON.stringify({deckName}),
       mode: 'cors',
       headers: {"Content-Type": "application/json"}})
        .then((res) => {return res.json()})
        .then(data => {return data})
  }

  getCardsFromDeck = (deckId) => {
    let deck = this.getDeck(deckId);
    deck.then(data => {return data.cardIds});
  }

  getDeckName = (deckId) => {
    return deckId.deckName;
  }

  getCard = (cardId) => {
    return fetch(`http://localhost:8000/cards/${cardId}`,
      {method: 'get',
       mode: 'cors',
       headers: {"Content-Type": "application/json"}})
        .then((res) => {return res.json()})
        .then(data => {return data})
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
        .then((res) => {return res.json()})
        .then(data => {
          return data})
  }

  removeCardFromDeck = (deckId, cardId) => {
    return fetch(`http://localhost:8000/decks/remove/${deckId}`,
      {method: 'put',
       body: JSON.stringify({cardId}),
       mode: 'cors',
       headers: {"Content-Type": "application/json"}})
        .then((res) => {return res.json()})
        .then(data => {
          return data})
  }

  deleteCard = (cardId) => {
    return fetch(`http://localhost:8000/card/${cardId}`,
      {method: 'delete',
       mode: 'cors',
       headers: {"Content-Type": "application/json"}})
        .then((res) => {return res.json()})
        .then(data => {return data})
  }

  deleteDeck = (deckId) => {
    return fetch(`http://localhost:8000/decks/${deckId}`,
      {method: 'delete',
       mode: 'cors',
       headers: {"Content-Type": "application/json"}})
        .then((res) => {return res.json()})
        .then(data => {return data})
  }

  getDeck = (deckId) => {
    return fetch(`http://localhost:8000/decks/${deckId}`,
      {method: 'get',
       mode: 'cors',
       headers: {"Content-Type": "application/json"}})
        .then((res) => {return res.json()})
        .then(data => {return data})
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
        .then((res) => {return res.json()})
        .then(data => {
          return data})
  }

}

const sharedAppStore = new AppStore();
export default sharedAppStore;
