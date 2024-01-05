import React, { Component } from "react";

const NumberSelector = ({ number, onChangeNumber }) => {
  const incrementNumber = (e) => {
    e.preventDefault();
    onChangeNumber(number + 1);
  };

  const decrementNumber = (e) => {
    e.preventDefault();
    if (number > 0) {
      onChangeNumber(number - 1);
    }
  };

  return (
    <div className="number-selector">
      <button className="decrement" onClick={decrementNumber}>-</button>
      <span>{number}</span>
      <button className="increment" onClick={incrementNumber}>+</button>
    </div>
  );
};

export default NumberSelector;
