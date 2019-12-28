import React, { Component } from 'react';
import '@fortawesome/fontawesome-free/css/all.css'

class CardPrinter extends Component {
  constructor() {
    super()
    this.state = {
      front: true,
    }
  }

  renderCard = (card) => {
    if(card._id === null) return null;
    return(
      <div key={card._id} className='card'>
        <div>
          Question: {card.question}
        </div>
        <div className='delete-button'>
          <i className="fas fa-trash-alt" onClick={() => this.props.deleteCard(card._id)}></i>
        </div>
        <div className='card-answer'>Answer: {card.answer}</div>
      </div>
    );
  }


  render() {
    let cards = this.props.cards;
    let displayCards = [];
    if(cards !== null) {
      displayCards = cards.map(this.renderCard);
    }
    return(
      <div>
        {displayCards}
      </div>
    );
  }


}

export default CardPrinter;
