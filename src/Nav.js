import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <nav>
      <ul className='nav-links-list'>
        <Link to='/' className='nav-links'>
          <li>Home</li>
        </Link>
        <Link to='/decks' className='nav-links'>
          <li>Decks</li>
        </Link>
      </ul>
    </nav>
  );
}

export default Nav;
