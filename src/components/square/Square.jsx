import "./square.css";
import React, { useContext, useEffect } from 'react'
import sudokuContext from "../../context/sudoku/sudokuContext";
import gameContext from "../../context/game/gameContext";

const Square = (props) => {
  const { index, mb, mr } = props;
  const context = useContext(sudokuContext);
  const { sudoku, getFocusCell, ptArray, getInputVal } = context;
  const gameContexts = useContext(gameContext);
  const { foundCell } = gameContexts;

  const showMatchingCells = () => {
    let removeBg = document.querySelectorAll(".bg-red");
    // console.log(typeof(removeBg));
    if (removeBg.length > 0) {
      removeBg.forEach((cell) => {
        cell.classList.remove("bg-red");
      })
    }
    if (foundCell.length > 0) {
      for (let i = 0; i < foundCell.length; i++) {
        let cells = document.querySelector(`.cell-${foundCell[i]}`);
        // cells.style.backgroundColor = "red !important";
        cells.classList.add("bg-red");
        // console.log(cells);
      }
      // console.log(foundCell);
    }
  }

  useEffect(() => {
    showMatchingCells();
    // eslint-disable-next-line
  }, [foundCell])

  // console.log(ptArray);

  const handleOnChange = (event) => {
    // const{name, value} = event.target;
    // let index = name.slice(5);
    // updateState(index, value);
  }

  const highlightCell = (event) => {
    let highlightedCell = document.getElementsByClassName("selected")[0];
    if (highlightedCell) {
      // console.log(highlightedCell);
      highlightedCell.classList.remove("selected");
    }
    event.target.classList.add("selected");

    const { name } = event.target;
    let index = name.slice(5);
    let row = Math.floor(index / 9);
    let column = (index % 9);
    let startRow = row - row % 3;
    let startcol = column - column % 3;
    // console.log("index " + index + " row " + row + " column " + column + " start row " + startRow + " start column " + startcol);

    // REMOVING BORDER HIGHLIGHT TO ROWS AND COLUMNS
    let removeCells = document.querySelectorAll(".input-border");
    if (removeCells.length > 0) {
      removeCells.forEach((element) => {
        element.classList.remove('input-border');
      });
    }
    // ADDING BORDER HIGHLIGHT TO ROWS AND COLUMNS
    for (let i = 0; i < 9; i++) {
      // highlight row cells
      let rowCellsNumber = (9 * row) + i;
      let rowCellsClass = `cell-${rowCellsNumber}`
      let rowCells = document.getElementsByName(rowCellsClass)[0];
      rowCells.classList.add("input-border");
      // console.log(rowCells);

      // highlight Column cells
      let colCellsNumber = column + (9 * i);
      let colCellsClass = `cell-${colCellsNumber}`
      let colCells = document.getElementsByName(colCellsClass)[0];
      colCells.classList.add("input-border");
      // console.log(colCells);
    }

    // ADDING BORDER HIGHLIGHT TO 3x3 GRTD ROWS AND COLUMNS
    // console.log(startRow);
    for (let i = 0; i < 3; i++) {
      let startCell = (9 * startRow) + startcol + (i * 9);
      for (let j = 0; j < 3; j++) {
        let cellNumber = startCell + j;
        let cellClass = `cell-${cellNumber}`;
        let cell = document.getElementsByClassName(cellClass)[0];
        cell.classList.add("input-border");
        // console.log(cell);
      }
    }

  }

  const handleFocus = (event) => {
    const { name } = event.target;
    let index = name.slice(5);
    index = Number(index);
    // highlightCell(index);
    getFocusCell(index);
    getInputVal(null);
  }


  return (
    <>
      <div className={`cells-container ${mb ? "mb" : ""}${mr ? "mr" : ""}`}  >
        <input type="text" inputMode="none" onClick={highlightCell} className={`cell-${index} ${ptArray[index] > 0 && "pt-none"}`} name={`cell-${index}`} value={sudoku[index] > 0 ? sudoku[index] : ""} onFocus={handleFocus} onChange={handleOnChange} autoComplete="off" />
      </div>
      {/* <div className={`cells-container`} style={{marginBottom: mb && "10px", marginRight: mr && "10px"}} >
        <input type="text" onClick={highlightCell} className={`cell-${index} ${ptArray[index] > 0 && "pt-none"}`} name={`cell-${index}`} value={sudoku[index] > 0 ? sudoku[index] : ""} onFocus={handleFocus} onChange={handleOnChange} />
    </div> */}
    </>
  )
}

export default Square;