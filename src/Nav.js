import React from 'react';
import './App.css';
import {Link} from 'react-router-dom';

function Nav() {
  return (
    <nav>
      <div className="triangle"></div>
      <div className="logo">Flashy</div>
      <ul className="nav-links-list">
        <li>
          <Link to="/" className="nav-links">
            Home
          </Link>
        </li>
        <li>
          <Link to="/decks" className="nav-links">
            Decks
          </Link>
        </li>
        <li className="nav-links">Cards</li>
      </ul>
    </nav>
  );
}

export default Nav;
