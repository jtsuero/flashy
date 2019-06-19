import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Home() {

  return(
  <Router>
    <div>
        <Link to={'/decks'}>Decks</Link>
    </div>
  </Router>
  );
}

export default Home;
