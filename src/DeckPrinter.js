import React, { Component } from 'react';

class DeckPrinter extends Component {
  constructor(props) {
    super()
  }

  printDeck(deck) {
    return (
      <div key={deck.id}>
      <ul>
      <li onClick={() => this.props.chooseDeck(deck)} className='deck-links'>
        {deck.name}
      </li>
      </ul>
      </div>
    );
  }

  render() {
    let decks = this.props.decks.map(this.printDeck.bind(this))
    return (
      <div>
      Decks:
        {decks}
      </div>
    )
  }
}

export default DeckPrinter;
