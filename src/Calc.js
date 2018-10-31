import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Display from "./Display";
import ButtonGrid from './ButtonGrid';

const isNumber = (str) => Number.isInteger(parseInt(str));
const isOp = (str) => /[/*+-]/.test(str);
const state = {
  INIT: 'INIT',
  REPL_NUM: 'REPL_NUM',
  APPEND_NUM: 'APPEND_NUM',
  EVAL: 'EVAL',
  APPEND_EXPR: 'APPEND_EXPR',
  AMEND_EXPR: 'AMEND_EXPR',
  CLEAR: 'CLEAR',
  ADD_DOT: 'ADD_DOT',
};

class Calc extends Component {
  state = {
    value: '0',
    expr: '',
    state: state.INIT,
  };

  static defaultProps = {
    width: "100%",
    height: "100%"
  };

  static propTypes = {
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  };

  updateCalcState(nextState, val) {
    this.setState({
      [state.INIT]: this[state.REPL_NUM],
      [state.APPEND_NUM]: (curState) => ({
        value: String(parseFloat(curState.value + val)),
        expr: curState.expr + val,
        state: state.APPEND_NUM,
      }),
      [state.CLEAR]: {
        value: '0',
        expr: '',
        state: state.CLEAR,
      },
      [state.EVAL]: (curState) => ({
        /* round it to avoid floating point precision error
           eg. 0.1+0.2=0.2999999997
           Convert to number to remove trailing zeros
           Convert to string to make it a consistent type since the value can sometimes be '0.'
        */
        value: String(Number(eval(curState.expr).toFixed(16))), // eslint-disable-line
        expr: '',
        state: state.EVAL,
      }),
      [state.APPEND_EXPR]: (curState) => ({
        expr: curState.expr + val,
        state: state.APPEND_EXPR,
      }),
      [state.REPL_NUM]: (curState) => ({
        value: String(parseFloat(val)),
        expr: curState.expr + val,
        state: state.REPL_NUM,
      }),
      [state.AMEND_EXPR]: (curState) => ({
        expr: curState.expr.slice(0, -1) + val,
        state: state.AMEND_EXPR,
      }),
      [state.ADD_DOT]: (curState) => {
        if (/\d+\.\d*$/.test(String(curState.expr))) {
          return null;
        }

        let value;
        if (isNumber(curState.expr[curState.expr.length - 1])) {
          value = `${curState.value}.`;
        } else {
          value = '0.';
        }

        return {
          value,
          expr: `${curState.expr}.`,
          state: state.ADD_DOT,
        };
      },
    }[nextState]);
  }

  handleClick = evt => {
    const buttonVal = evt.target.value;
    this.setCalcState(buttonVal);
  };

  handleKeyDown = (evt) => {
    const { key } = evt;
    let buttonVal;

    if (key === 'Backspace' || key === 'Delete') {
      buttonVal = 'clear';
    } else if (key === 'Enter' || key === '=') {
      buttonVal = '=';
    } else if (isOp(key) || isNumber(key) || key === '.') {
      buttonVal = key;
    }

    if (buttonVal) {
      this.setCalcState(buttonVal);
    }
  }

  setCalcState = (buttonVal) => {
    let nextState;

    if (buttonVal === 'clear') {
      return this.updateCalcState(state.CLEAR);
    } else if (buttonVal === '.') {
      return this.updateCalcState(state.ADD_DOT);
    }

    switch (this.state.state) {
      case state.INIT:
      case state.EVAL:
      case state.CLEAR:
        if (isNumber(buttonVal)) {
          nextState = state.REPL_NUM;
        }
        break;
      case state.REPL_NUM:
        if (isNumber(buttonVal)) {
          nextState = state.APPEND_NUM;
        } else if (buttonVal === "=") {
          nextState = state.EVAL;
        } else if (isOp(buttonVal)) {
          nextState = state.APPEND_EXPR;
        }
        break;
      case state.APPEND_NUM:
        if (buttonVal === "=") {
          nextState = state.EVAL;
        } else if (isNumber(buttonVal)) {
          nextState = state.APPEND_NUM;
        } else if (isOp(buttonVal)) {
          nextState = state.APPEND_EXPR;
        }
        break;
      case state.APPEND_EXPR:
      case state.AMEND_EXPR:
        if (isNumber(buttonVal)) {
          nextState = state.REPL_NUM;
        } else if (isOp(buttonVal)) {
          nextState = state.AMEND_EXPR;
        }
        break;
      case state.ADD_DOT:
        if (isNumber(buttonVal)) {
          nextState = state.APPEND_NUM;
        }
        break;
      default:
    }

    this.updateCalcState(nextState, buttonVal);
  }

  render() {
    return (
      <div
        style={{
          display: "inline-flex",
          flexDirection: "column",
          width: this.props.width,
          height: this.props.height
        }}
        onKeyDown={this.handleKeyDown}
        tabIndex="0"
      >
        <Display value={this.state.value} />
        <ButtonGrid onClick={this.handleClick} />
      </div>
    );
  }
}

export { Calc as default, state };
