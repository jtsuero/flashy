import React, { Component } from 'react';
import './App.css';
import AppStore from './AppStore.js';

class Home extends Component {
  constructor() {
    super()
    this.state = {
      loginPage: null,
      registerPage: null,
      email: null,
      password: null,
      username: null,
    }
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  loginUser = (event) => {
    if(this.state.email === null || this.state.password === null) {
      alert('You must enter an email and password!');
    } else {
      event.preventDefault();
      AppStore.login(this.state.email, this.state.password);
    }
  }

  registerUser = (event) => {
    event.preventDefault();
    if(this.state.email === null || this.state.password === null) {
      alert('You must enter a username, email and password!');
    } else {
      AppStore.register(this.state.username, this.state.email, this.state.password);
    }
  }

  render() {
    if(this.state.registerPage) {
      return(
        <form onSubmit={this.registerUser}>
          Username:
          <input type='text' name='email' onChange={this.handleChange}/>
          Email:
          <input type='text' name='email' onChange={this.handleChange}/>
          Password:
          <input type='text' name='password' onChange={this.handleChange}/>
          <input type='submit' />
        </form>
      )
    } else if(this.state.loginPage) {
      return(
        <div>
          <form onSubmit={this.loginUser}>
            Email:
            <input type='text' name='email' onChange={this.handleChange}/>
            Password:
            <input type='text' name='password' onChange={this.handleChange}/>
            <input type='submit'/>
          </form>
        </div>
      );
    }
    return(
      <div>
        <button name='Register' onClick={() => {this.setState({registerPage: true})}}>Register</button>
        <button name='Login' onClick={() => {this.setState({loginPage: true})}}>Login</button>
      </div>
    )
  }
}

export default Home;
