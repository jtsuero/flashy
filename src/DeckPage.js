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
      addingCards: false,
      currentDeckId: null,
      currentDeckName: null,
      viewDeck: false,
      viewCards: false,
      newDeck: false,
      existingDeck: false,
      newCard: false,
      quiz: false,
      decks: [],
      deck: [],
      cards: []
    };
  }

  componentDidMount() {
    this.getDecks();
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.currentDeckId !== prevState.currentDeckId) {
      this.getCardsFromDeck();
    }
  }

  createCard = (event) => {
    event.preventDefault();
    if(this.state.question === null) {
      window.alert("You must add a question!");
    } else if (this.state.answer === null) {
      window.alert("You must add an answer!");
    } else {
      AppStore.createCard(this.state.question, this.state.answer).then(card => {
      AppStore.addCardToDeck(this.state.currentDeckId, card._id).then(() => {this.getCardsFromDeck()});
      });
    }
  }

  handleDeckSubmit = (event) => {
    event.preventDefault();
    if(this.state.deckName === null) {
      window.alert("You must name your deck!");
    } else {
        const deckId = AppStore.createDeck(this.state.deckName);
        deckId.then(data => this.setState({currentDeckId: data._id, currentDeckName: data.deckName, addingCards: true}));
    }
  }

  getDecks = () => {
    let decks = AppStore.getDecks();
    decks.then(data => this.setState({decks: data}));
  }

  chooseDeck = (currentDeck) => {
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

  deleteCard = (cardId, deckId) => {
    AppStore.removeCardFromDeck(this.state.currentDeckId, cardId);
    AppStore.deleteCard(cardId).then(() => this.getCardsFromDeck());
  }

  deleteDeck = () => {
    AppStore.deleteDeck(this.state.currentDeckId);
    this.getDecks();
    this.setState({viewDeck: false})
  }

  getCardsFromDeck = () => {
    AppStore.getCardsFromDeck(this.state.currentDeckId).then(cards => {
    this.setState({cards});
    });
  }

  renderDeckPage = () => {
    if(this.state.addingCards) {
      return(
      <div>
        Adding Cards to:
        {this.state.currentDeckName}
        {this.renderCardInput()}
        <CardPrinter cards={this.state.cards} deleteCard={this.deleteCard} />
      </div>
      )
    } else if(this.state.viewDeck) {
      return(
      <div>
        <input type='button' value='Add Cards' onClick={() => {this.setState({addingCards: true})}} />
        <Link to={`quiz/${this.state.currentDeckId}`}>
          <button>Quiz!</button>
        </Link>
        <input type='button' value='Delete Deck' onClick={ () => {this.deleteDeck()}} />
        <input type='button' value='Back to Decks' onClick={ () => {this.setState({viewDeck: false})}} />
        <CardPrinter cards={this.state.cards} deleteCard={this.deleteCard} />
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
          <DeckPrinter decks={this.state.decks} chooseDeck={this.chooseDeck} deleteDeck={this.deleteDeck} />
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
    this.getDecks();
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
