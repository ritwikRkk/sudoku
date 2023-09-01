import "./numbers.css";
import React, { useContext } from 'react'
import sudokuContext from "../../context/sudoku/sudokuContext";

const Numbers = () => {

    const context = useContext(sudokuContext);
  const { getInputVal, gameOver } = context;

    const handleClick= (event) => {
        getInputVal(event.target.value);
    };
  return (
    <div className={`numbers-container ${gameOver ? "gameOver" : ""}`}>
        <input type="text" value="1" onClick={handleClick} readOnly="readOnly" />
        <input type="text" value="2" onClick={handleClick} readOnly="readOnly" />
        <input type="text" value="3" onClick={handleClick} readOnly="readOnly" />
        <input type="text" value="4" onClick={handleClick} readOnly="readOnly" />
        <input type="text" value="5" onClick={handleClick} readOnly="readOnly" />
        <input type="text" value="6" onClick={handleClick} readOnly="readOnly" />
        <input type="text" value="7" onClick={handleClick} readOnly="readOnly" />
        <input type="text" value="8" onClick={handleClick} readOnly="readOnly" />
        <input type="text" value="9" onClick={handleClick} readOnly="readOnly" />
        <input type="text" value="X" onClick={handleClick} readOnly="readOnly" />
    </div>
  )
}

export default Numbers;