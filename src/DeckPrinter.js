import React, { Component } from 'react';

class DeckPrinter extends Component {

  printDeck(deck) {
    return (
      <div key={deck._id} onClick={() => this.props.chooseDeck(deck)} className='deck-links'>
        <div>
          {deck.name}
        </div>
        <div className='deck-amount'>
          Cards in deck: {deck.cardIds.length}
        </div>
      </div>
    );
  }

  render() {
    if(this.props.decks === null) {
      return null;
    }
    let decks = this.props.decks.map(this.printDeck.bind(this))
    // console.log(this.props.decks.cardIds);
    return (
      <div>
        {decks}
      </div>
    )
  }
}

export default DeckPrinter;
