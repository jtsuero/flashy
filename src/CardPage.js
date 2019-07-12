import React, { Component } from 'react';
import AppStore from './AppStore.js';
import CardPrinter from './CardPrinter.js';
import DeckPrinter from './DeckPrinter.js';

class CardPage extends Component {
  constructor() {
    super()
    this.state = {
      showDecks: false,

    }
  }


  getCards = () => {
    let cards = AppStore.getCards();
    return cards;
  }

  displayDecks = () => {
    this.setState({showDecks: true})
  }

  render() {

  if(this.state.showDecks) {
    return(
      <DeckPrinter decks={AppStore.getDecks()} /> //fix method send to deckPrinter, might have to add new one
    )

  } else {
    return (
      <div className='card-page'>
        <CardPrinter cards={AppStore.getCards()} displayDecks={this.displayDecks} /> {/* or does this need to be this.getCards?*/}
        <div>
          test {/*add inline style, hidden until clicked,*/}
        </div>
      </div>
    )
  }
  }
}

export default CardPage;
