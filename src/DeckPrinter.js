import React, { Component } from 'react';

class DeckPrinter extends Component {

  printDeck(deck) {
    return (
      <div key={deck.id} onClick={() => this.props.chooseDeck(deck)} className='deck-links'>
        {deck.deckName}
        <div className='deck-amount'>
          Cards in deck: {deck.cardIds.length}
        </div>
      </div>
    );
  }

  render() {
    let decks = this.props.decks.map(this.printDeck.bind(this))
    return (
      <div>
        {decks}
      </div>
    )
  }
}

export default DeckPrinter;
