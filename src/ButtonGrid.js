import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './ButtonGrid.module.css';

const Button = ({ klass, children, value, onClick }) => {
  // console.log('klass', );
  return (
    <button
      styleName={classnames('button', klass, {
        operator: ['divide', 'multiply', 'add', 'subtract', 'equals'].includes(klass)
      })}
      onClick={onClick}
      value={value}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  klass: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onClick: PropTypes.func.isRequired,
};


const buttons = [
  {
    label: 'clear',
    klass: 'clear',
    value: 'clear'
  },
  {
    label: '÷',
    klass: 'divide',
    value: '/',
  },
  {
    label: '-',
    klass: 'subtract',
    value: '-',
  },
  {
    label: '+',
    klass: 'add',
    value: '+',
  },
  {
    label: 'x',
    klass: 'multiply',
    value: '*',
  },
  {
    label: '=',
    klass: 'equals',
    value: '=',
  },
  {
    label: '.',
    klass: 'decimal-point',
    value: '.',
  },
  ...['zero','one','two','three','four','five','six','seven','eight','nine']
    .map((klass, i) => ({ label: i, klass, value: i })),
];


const ButtonGrid = ({ onClick }) => {
  return (
    <div styleName="button-grid">
      {buttons.map((b, i) => (
        <Button
          key={i}
          value={b.value}
          onClick={onClick}
          klass={b.klass}
        >
          {b.label}
        </Button>
      ))}
    </div>
  );
};

ButtonGrid.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export { ButtonGrid as default, Button };
