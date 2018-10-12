import React from 'react';
import PropTypes from 'prop-types';
import styles from './ButtonGrid.module.css';

const Button = ({ value, children }) => {
  return (
    <button
      className={styles.button}
      style={{ gridArea: value }}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
};


const buttons = [
  {
    label: 'clear',
    value: 'clear'
  },
  {
    label: '÷',
    value: 'divide'
  },
  {
    label: '-',
    value: 'subtract'
  },
  {
    label: '+',
    value: 'add'
  },
  {
    label: 'x',
    value: 'multiply'
  },
  {
    label: '=',
    value: 'equals'
  },
  ...['zero','one','two','three','four','five','six','seven','eight','nine']
    .map((n, i) => ({ label: i, value: n })),
];


const ButtonGrid = () => {
  return (
    <div className={styles["button-grid"]}>
      {buttons.map(b => <Button value={b.value}>{b.label}</Button>)}
    </div>
  );
};

export default ButtonGrid;
