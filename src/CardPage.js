import React, { Component } from 'react';
import AppStore from './AppStore.js';
import CardPrinter from './CardPrinter.js'

class CardPage extends Component {
  constructor() {
    super()
    this.state = {
      cards: null,
    }

  }

  getDeckIds = (card) => {
  console.log(card, "from CardPage");
    for (let key in AppStore.decks) {
      const decks = AppStore.getCardsFromDeck(1);
      console.log(decks);
      for(let i=0; i<decks.length; i++) {
        if(card.id === decks[i]) {
          console.log(card.id);
          console.log(decks[i]);
        }
      }
    }
  }

  getCards = () => {
    let cards = AppStore.getCards();
    this.setState({cards});
  }

  render() {
  console.log(AppStore.decks.name);
    return (
      <div>
        <CardPrinter cards={AppStore.getCards()} deckId={this.getDeckIds} />
      </div>
    )
  }
}

export default CardPage;
