import React, { Component } from 'react';
import Calc from './Calc';
import './App.module.css';

class App extends Component {
  render() {
    return (
      <div styleName="app">
        <Calc width={400} height={600} />
      </div>
    );
  }
}

export default App;
