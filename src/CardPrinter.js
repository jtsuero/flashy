import React, { Component } from 'react';
import '@fortawesome/fontawesome-free/css/all.css'

class CardPrinter extends Component {
  constructor() {
    super()
    this.state = {
      front: true,
    }
  }

  renderCards = (card) => {
    return(
      <div key={card.id} className='card'>
        Question: {card.question}
        <div className='card-answer'>Answer:{card.answer}</div>
        <div>{this.renderDeckNames(card.decks)}</div>
        <i className="fa fa-plus" onClick={this.props.displayDecks}></i>
      </div>
    );
  }

  renderDeckNames = (deckName) => {
    return(
      <div>#{deckName}</div>
    )

  }


  render() {
    let cards = this.props.cards;
    let displayCards = [];
    if(cards !== null) {
      displayCards = cards.map(this.renderCards);
    }
    return(
      <div>
        {displayCards}
      </div>
    );
  }


}

export default CardPrinter;
