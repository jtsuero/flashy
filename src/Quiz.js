import React, { Component } from 'react';
import AppStore from './AppStore.js';

class Quiz extends Component {
  constructor() {
    super()
    this.state = {
      cards: null,
      quizAnswer: null,
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
    if(this.state.quizAnswer === null) {
      window.alert("You must give an answer!");
    } else {
      if(this.getCurrentCard().answer === (this.state.quizAnswer)) {
        console.log("correct!");
      } else {
        console.log("false...");
      }
    const currentCardIndex = this.state.currentCardIndex + 1;
    this.setState({currentCardIndex, quizAnswer:""});
    //change to answerText
    }
  }

  handleQuizAnswer = (event) => {
    this.setState({quizAnswer: event.target.value});
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
          Done! You suck
        </div>
        )
      }
//add percentage method
      const card = this.getCurrentCard();
      return(
        <div>
          <form onSubmit = {this.handleAnswerSubmit}>
            Question: {card.question}
            <input type='textarea' name='name' onChange={this.handleQuizAnswer} value={this.state.quizAnswer} />
            <input type='submit' name='submit' value='Check Answer' />
          </form>
        </div>
      )
  }
}

export default Quiz;
