import React from 'react';
import './Display.module.css';

const Display = ({ value }) => {
  return (
    <div styleName="display">
      {value}
    </div>
  );
};

export default Display;
