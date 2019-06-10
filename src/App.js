import React, { Component } from 'react';
import './App.css';
import Nav from './Nav.js';
import Home from './Home.js';
import DeckPage from './DeckPage.js';
import CardPage from './CardPage.js';
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
            <Route path='/cards' component={CardPage} />
          </Switch>
        </div>
      </Router>

      );

     }
}

export default App;
