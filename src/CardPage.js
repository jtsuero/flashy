import React, { Component } from 'react';
import AppStore from './AppStore.js';
import CardPrinter from './CardPrinter.js'

class CardPage extends Component {

  getDeckIds = (cardId) => {
    for (let key in AppStore.decks) {
      const decks = AppStore.getCardsFromDeck(key);
      console.log(decks);
      for(let i=0; i<decks.length; i++) {
        if(cardId.id === decks[i]) {
        }
      }
    }
  }

  getCards = () => {
    let cards = AppStore.getCards();
    return cards;
  }

  render() {

    return (
      <div>
        <CardPrinter cards={this.getCards()} />
      </div>
    )
  }
}

export default CardPage;
