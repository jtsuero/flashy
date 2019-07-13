import React, { Component } from 'react';
import AppStore from './AppStore.js';
import CardPrinter from './CardPrinter.js';

class CardPage extends Component {
  render() {
    return (
      <div className='card-page'>
        <CardPrinter cards={AppStore.getCards()} />
      </div>
    )
  }
}

export default CardPage;
