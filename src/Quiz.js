import React, { Component } from 'react';
import AppStore from './AppStore.js';
import { Link } from 'react-router-dom';

class Quiz extends Component {
  constructor() {
    super()
    this.state = {
      cards: null,
      answerText: "",
      correctAnswers: 0,
      currentCardIndex: -1
    }
  }

  componentDidMount = () => {
    const { match: { params } } = this.props;
    const cards = AppStore.getCardsFromDeck(params.deckId);
    this.setState({cards, currentCardIndex: 0});
  }

  getCurrentCard = () => {
    if(this.state.currentCardIndex === -1) {
      return null;
    }
   return this.state.cards[this.state.currentCardIndex];
  }

  isQuizFinished = () => {
    return (this.state.currentCardIndex >= this.state.cards.length)
  }

  handleAnswerSubmit = (event) => {
    event.preventDefault();
    if(this.state.answerText === "") {
      window.alert("You must give an answer!");
    } else {
      if(this.getCurrentCard().answer === (this.state.answerText)) {
        const correctAnswers = this.state.correctAnswers + 1;
        this.setState({correctAnswers});
      }
    const currentCardIndex = this.state.currentCardIndex + 1;
    this.setState({currentCardIndex, answerText:""});
    }
  }

  handleQuizAnswer = (event) => {
    this.setState({answerText: event.target.value});
  }

//create quiz by having question show, blank input where you enter the supposed answer
//hit a submit button
//show answer if correct, then button for next card
//once iterated through all the cards, at random, show percentage of what was correct


  render() {
      if(this.state.cards === null) {
        return null;
      }
      if(this.isQuizFinished()) {
        return (
        <div>
          <div>
            You got {this.state.correctAnswers} out of {this.state.cards.length} correct!
          </div>
          <Link to={'/decks'}>
            <button>Back to Decks</button>
          </Link>
          <Link to={`/quiz/${1}`}>
            <button>Retake Quiz</button>
          </Link>
        </div>
        )
      }
      const card = this.getCurrentCard();
      return(
        <div>
          <form onSubmit = {this.handleAnswerSubmit}>
            Question: {card.question}
            <input type='textarea' name='name' onChange={this.handleQuizAnswer} value={this.state.answerText} />
            <input type='submit' name='submit' value='Check Answer' />
          </form>
        </div>
      )
  }
}

export default Quiz;
