import React, { Component } from 'react';
import './App.css';
import Nav from './Nav.js';
import Home from './Home.js';
import DeckPage from './DeckPage.js';
import Quiz from './Quiz.js';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class App extends Component {
  constructor() {
    super()
    this.state = {
    };
  }


  render() {

    return (
      <Router>
        <div className="App">
          <Nav />
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/decks' component={DeckPage} />
            <Route path='/quiz/:deckId' component={Quiz} />
          </Switch>
        </div>
      </Router>
      );
     }
}

export default App;
