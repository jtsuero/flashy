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
      quizReview: false,
      currentCardIndex: -1
    }
  }

  componentDidMount = () => {
    const { match: { params } } = this.props;
    const cards = AppStore.getCardsFromDeck(params.deckId);
    this.setState({cards});
    this.startQuiz();
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

  handleQuizAnswerUpdate = (event) => {
    this.setState({answerText: event.target.value});
  }

  handleAnswerSubmit = (event) => {
    event.preventDefault();
    if(this.state.answerText === "") {
      window.alert("You must give an answer!");
    } else {
      let correctAnswers = this.state.correctAnswers;
      if(this.getCurrentCard().answer === this.state.answerText) {
        correctAnswers += 1;
      }
        this.setState({correctAnswers, cardReview: true});
    }
  }

  startQuiz = () => {
    this.setState({ answerText: "", correctAnswers: 0, quizReview: false, currentCardIndex: 0})
  }

  reviewCard = () => {
    return(
      <div>
        <div>
          Correct Answer: {this.getCurrentCard().answer}
        </div>
        <div>
          Your Answer: {this.state.answerText}
        </div>
      </div>
    )
  }

  goToNextCard = () => {
    const currentCardIndex = this.state.currentCardIndex + 1;
    this.setState({currentCardIndex, answerText:"", cardReview: false});
  }

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
          <button onClick={() => {this.retakeQuiz()}}>Retake Quiz</button>
        </div>
        )
      }

      const card = this.getCurrentCard();
      if(this.state.cardReview) {
        return(
          <div>
            Question: {card.question}
            <input type='textarea' name='name' onChange={this.handleQuizAnswer} value={this.state.answerText} />
            {this.reviewCard()}
            <button onClick={this.goToNextCard}>Next Question</button>
          </div>
        )

      }
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
