import React, { Component } from 'react';
import Display from "./Display";
import ButtonGrid from './ButtonGrid';
import styles from "./Calc.module.css";

class Calc extends Component {
  render() {
    return (
      <div
        style={{
          display: 'inline-block',
          width: this.props.width || '100%',
          height: this.props.height || '100vh'
        }}
      >
        <Display value="12" />
        <ButtonGrid />
      </div>
    );
  }
}

export default Calc;
