const HOST_URL = 'http://localhost:8000';

class AppStore {
  register = (userName, email, password) => {
    return fetch(`${HOST_URL}/api/user/register`,
      {method: 'post',
       body: JSON.stringify({userName, email, password}),
       mode: 'cors',
       headers: {"Content-Type": "application/json"}})
        .then((res) => res.json())
  }

  login = (email, password) => {
    return fetch(`${HOST_URL}/api/user/login`,
      {method: 'post',
       body: JSON.stringify({email, password}),
       mode: 'cors',
       headers: {"Content-Type": "application/json"},
       credentials: 'include',
      })
        .then((res) => res)
  }

  createCard = (question, answer) => {
    return fetch(`${HOST_URL}/cards`,
      {method: 'post',
       body: JSON.stringify({question, answer}),
       mode: 'cors',
       headers: {"Content-Type": "application/json"}})
        .then((res) => res.json())
  }

  createDeck = (name) => {
    return fetch(`${HOST_URL}/decks`,
      {method: 'post',
       body: JSON.stringify({name}),
       mode: 'cors',
       headers: {"Content-Type": "application/json"}})
        .then((res) => res.json())
  }

  getCard = (cardId) => {
    return fetch(`${HOST_URL}/cards/${cardId}`,
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
    return fetch(`${HOST_URL}/decks/${deckId}`,
      {method: 'put',
       body: JSON.stringify({cardId}),
       mode: 'cors',
       headers: {"Content-Type": "application/json"}})
        .then((res) => res.json())
  }

  getCardsFromDeck = (currentDeckId) => {
    return this.getDeck(currentDeckId).then(deck => {return Promise.all(deck.cardIds.map(this.getCard))
    });
  }

  removeCardFromDeck = (deckId, cardId) => {
    return fetch(`${HOST_URL}/decks/remove/${deckId}`,
      {method: 'put',
       body: JSON.stringify({cardId}),
       mode: 'cors',
       headers: {"Content-Type": "application/json"}})
        .then((res) => res.json())
        .then(this.deleteCard(cardId))
  }

  deleteCard = (cardId) => {
    return fetch(`${HOST_URL}/cards/${cardId}`,
      {method: 'delete',
       mode: 'cors',
       headers: {"Content-Type": "application/json"}})
        .then((res) => res.json())
  }

  deleteDeck = (deckId) => {
    return fetch(`${HOST_URL}/decks/${deckId}`,
      {method: 'delete',
       mode: 'cors',
       headers: {"Content-Type": "application/json"}})
        .then((res) => res.json())
  }

  getDeck = (deckId) => {
    return fetch(`${HOST_URL}/decks/${deckId}`,
      {method: 'get',
       mode: 'cors',
       headers: {"Content-Type": "application/json"}})
        .then((res) => res.json())
  }

  getDecks = () => {
    return fetch(`${HOST_URL}/decks`,
      {method: 'get',
       mode: 'cors',
       headers: {"Content-Type": "application/json"}})
        .then((res) => res.json())
  }
}

const sharedAppStore = new AppStore();
export default sharedAppStore;
