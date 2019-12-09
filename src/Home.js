import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AppStore from './AppStore.js';

class Home extends Component {
  constructor() {
    super()
    this.state = {
      email: null,
      password: null,
    }
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  login = (event) => {
    event.preventDefault();
    AppStore.login(this.state.email, this.state.password);
    console.log('test');
  }


  render() {
    console.log(this.state);
    return(
      <div>
        <form onSubmit={this.login}>
          Email:
          <input type='text' name='email' value={this.state.email} onChange={this.handleChange}/>
          Password:
          <input type='text' name='password' value={this.state.password} onChange={this.handleChange}/>
          <input type='submit' />

        </form>
      </div>
    );
  }
}

export default Home;
