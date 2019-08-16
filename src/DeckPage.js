import React, { Component } from 'react';
import './App.css';
import AppStore from './AppStore.js';
import DeckPrinter from './DeckPrinter.js';
import CardPrinter from './CardPrinter.js';
import { Link } from 'react-router-dom';

class DeckPage extends Component {
  constructor() {
    super()
    this.state = {
      question: null,
      answer: null,
      deckName: null,
      allCards: null,
      allDecks: null,
      addingCards: false,
      currentDeckId: null,
      currentDeckName: null,
      viewDeck: false,
      viewCards: false,
      newDeck: false,
      existingDeck: false,
      cardsDisplayed: true, //check if needed when fully functional
      newCard: false,
      quiz: false,
      deck: []
    };
  }

  createCard = (event) => {
    event.preventDefault();
    if(this.state.question === null) {
      window.alert("You must add a question!");
    } else if (this.state.answer === null) {
      window.alert("You must add an answer!");
    } else {
    const newCard = AppStore.createCard(this.state.question, this.state.answer);
    AppStore.addCardToDeck(this.state.currentDeckId, newCard.id);
    let allCards = AppStore.getCards();
    this.setState({allCards, newCard: true})
    }
  }

  handleDeckSubmit = (event) => {
    event.preventDefault();
    if(this.state.deckName === null) {
      window.alert("You must name your deck!");
    } else {
      if(AppStore.checkDeckName(this.state.deckName)) {
        const deckId = AppStore.createDeck(this.state.deckName);
        deckId.then(data => this.setState({currentDeckId: data._id, currentDeckName: data.deckName, addingCards: true}));
        // let allDecks = AppStore.getDecks();
      }
    }
  }

  getDecks = () => {
    let decks = AppStore.getDecks();
    return decks;
  }

  getCards = () => {
    let cards = AppStore.getCardsFromDeck(this.state.currentDeckId)
    return cards;

  }

  chooseDeck = (currentDeck) => {
    console.log(this.state);
    this.setState({currentDeckId: currentDeck._id, currentDeckName: currentDeck.deckName, viewDeck: true})
  }

  handleQuestion = (event) => {
    this.setState({question: event.target.value});
  }

  handleAnswer = (event) => {
    this.setState({answer: event.target.value});
  }

  handleDeckName = (event) => {
    this.setState({deckName: event.target.value});
  }

  deleteCard = (cardId) => {
    AppStore.deleteCard(cardId);
    this.setState(AppStore.getCards());
  }

  renderDeckPage = () => {
    if(this.state.addingCards) {
      return(
      <div>
        Adding Cards to:
        {this.state.currentDeckName}
        {this.renderCardInput()}
        <CardPrinter cards={AppStore.getCardsFromDeck(this.state.currentDeckId)} deleteCard={this.deleteCard} />
      </div>
      )
    // } else if(this.state.viewCards) {
    // is this even used?
    //   return(
    //     <CardPrinter cards={AppStore.getCards()} deleteCard={this.deleteCard} />
    //   )
    } else if(this.state.viewDeck) {
      return(
      <div>
        <input type='button' value='Add Cards' onClick={() => {this.setState({addingCards: true})}} />
        <Link to={`quiz/${this.state.currentDeckId}`}>
          <button>Quiz!</button>
        </Link>
        <CardPrinter cards={AppStore.getCardsFromDeck(this.state.currentDeckId)} deleteCard={this.deleteCard} />
      </div>
      )
    } else if(this.state.newDeck) {
      return (
        <div>
          <form onSubmit = {this.handleDeckSubmit}>
            <input type='textarea' name='name' onChange={this.handleDeckName} />
            <input type='submit' name='submit' value='Create Deck' />
          </form>
        </div>
      )
    } else {
      return (
        <div>
          <input type="submit" name="submit" value="Create New Deck" onClick={() => {this.setState({newDeck: true})}} />
          <DeckPrinter decks={this.getDecks()} chooseDeck={this.chooseDeck} />
        </div>
      )
    }
  }

  cardInput = () => {
    return (
      <div>
        Question:
        <input type="textarea" name="question" onChange={this.handleQuestion} />
        Answer:
        <input type="textarea" name="answer" onChange={this.handleAnswer}/>
      </div>
    );
  }

  finishDeck = () => {
    this.setState({addingCards: false, newDeck: false})
  }

  renderCardInput = () => {
    return(
      <div>
        <form onSubmit={this.createCard}>
          {this.cardInput()}
          <input type='submit' name='submit' />
        </form>
        <input type='button' value='Done' onClick={this.finishDeck} />
        <br />
      </div>

    );
  }

  render() {
    return (
      <div className="App">
        <div>
          {this.renderDeckPage()}
        </div>
      </div>

    );
  }
}

export default DeckPage;
