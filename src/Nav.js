import React from 'react';
import './App.css';
import {Link} from 'react-router-dom';

function Nav() {
  return (
    <nav>
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
      </ul>
    </nav>
  );
}

export default Nav;
