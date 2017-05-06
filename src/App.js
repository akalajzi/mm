import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="zoneGroup-side">
          <div className="zone topLeft">top left</div>
          <div className="zone bottomLeft">bottom left</div>
        </div>
        <div className="zoneGroup-center">
          <div className="zone topCenter">
            <img src={logo} className="App-logo" alt="logo" />
          </div>
          <div className="zone center">center</div>
          <div className="zone bottomCenter">bottom center</div>
        </div>
        <div className="zoneGroup-side">
          <div className="zone topRight">top right</div>
          <div className="zone bottomRight">bottom right</div>
        </div>
      </div>
    );
  }
}

export default App;
