import React, { useState } from 'react';
import './App.css';

function CalcButton({ label, onClick, buttonClassName = 'CalcButton' }) {
  return (
    <button className={buttonClassName} onClick={onClick}>
      {label}
    </button>
  );
}

function CalcDisplay({ display }) {
  return <div className="CalcDisplay">{display}</div>;
}

export default function App() {
  const [display, setDisplay] = useState('0');
  const [num1, setNum1] = useState(null);
  const [operator, setOperator] = useState(null);
  const [num2, setNum2] = useState(null);

  const numberClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    if (operator === null) {
      if (num1 !== null) {
        setNum1((prevNum) => prevNum === '0' ? value : prevNum + value);
      } else {
        setNum1(value);
      }
      setDisplay((prevDisplay) => prevDisplay === '0' ? value : prevDisplay + value);
    } else {
      if (num2 !== null) {
        setNum2((prevNum) => prevNum === '0' ? value : prevNum + value);
      } else {
        setNum2(value);
      }
      setDisplay((prevDisplay) => prevDisplay + value);
    }
  };

  const operatorClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    if (num1 !== null && num2 === null) {
      setOperator(value);
      setDisplay(value);
    }
  };

  const calculate = () => {
    const operand1 = parseFloat(num1);
    const operand2 = parseFloat(num2);

    switch (operator) {
      case '+':
        return operand1 + operand2;
      case '-':
        return operand1 - operand2;
      case '*':
        return operand1 * operand2;
      case '/':
        return operand1 / operand2;
      default:
        return 'ERROR';
    }
  };

  const equalClickHandler = (e) => {
    e.preventDefault();

    if (num1 !== null && operator !== null && num2 !== null) {
      const result = calculate();
      setDisplay(result.toString());
      setNum1(result.toString());
      setOperator(null);
      setNum2(null);
    }
  };

  const clearClickHandler = (e) => {
    e.preventDefault();

    setDisplay('0');
    setNum1(null);
    setOperator(null);
    setNum2(null);
  };

  return (
    <div className="App">
      <div className="CalcContainer">
        <CalcDisplay display={display} />
        <div className="ButtonContainer">
          <CalcButton label="1" onClick={numberClickHandler} buttonClassName="CalcButtonNum" />
          <CalcButton label="2" onClick={numberClickHandler} buttonClassName="CalcButtonNum" />
          <CalcButton label="C" onClick={clearClickHandler} />
          <CalcButton label="3" onClick={numberClickHandler} buttonClassName="CalcButtonNum" />
          <CalcButton label="4" onClick={numberClickHandler} buttonClassName="CalcButtonNum" />
          <CalcButton label="+" onClick={operatorClickHandler} />
          <CalcButton label="5" onClick={numberClickHandler} buttonClassName="CalcButtonNum" />
          <CalcButton label="6" onClick={numberClickHandler} buttonClassName="CalcButtonNum" />
          <CalcButton label="=" onClick={equalClickHandler} />
          <CalcButton label="7" onClick={numberClickHandler} buttonClassName="CalcButtonNum" />
          <CalcButton label="8" onClick={numberClickHandler} buttonClassName="CalcButtonNum" />
          <CalcButton label="9" onClick={numberClickHandler} buttonClassName="CalcButtonNum" />
          <CalcButton label="-" onClick={operatorClickHandler} />
          <CalcButton label="0" onClick={numberClickHandler} buttonClassName="CalcButtonNum" />
          <CalcButton label="*" onClick={operatorClickHandler} />
          <CalcButton label="/" onClick={operatorClickHandler} />
        </div>
      </div>
    </div>
  );
}
