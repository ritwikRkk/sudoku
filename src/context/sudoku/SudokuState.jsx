import React, { useEffect } from 'react';
import { useState, useContext } from "react";
import SudokuContext from "./sudokuContext";
import gameContext from '../game/gameContext';

const SudokuState = (props) => {
  let arr = new Array(81).fill("");
  const [sudoku, setSudoku] = useState(arr);
  const [focusCell, setFocusCell] = useState(null);
  const [inputVal, setInputVal] = useState(null);
  // WHWETHER TO CREATE SUDOKU GAME OR NOT
  const [isSudoku, setIsSudoku] = useState(true);

  // CREATE AN ARRAY TO SET "pt-none" CLASS IN "square.css"
  const [ptArray, setPtArray] = useState(arr);

  const context = useContext(gameContext);
  const { sudGenerator, checkSafe, setFoundCell, resetLevel } = context;
  const [emptyPos, setEmptyPos] = useState([]);

  // TRACK THE NUMBER OF ATTEMPTS TAKEN TO COMPLETE THE GAME
  const [attempts, setAttempts] = useState(0);
  const resetAttempts = () => {
    setAttempts(0);
  }

  const [playerName, setPlayerName] = useState("");
  const updatePlayerName = (name) => {
    setPlayerName(name);
  }

  const [gameOver, setGameOver] = useState(false);
  const resetGameOver = (name) => {
    setGameOver(false);
  }

  let [time, setTime] = useState({
    hour: 0,
    min: 0,
    sec: 0,
  });
  // console.log(time);
  const updateTime = (time) => {
    setTime({ hour: time.hour, min: time.min, sec: time.sec })
  }

  // PLACING THE GAME ARRAY IN SETSUDOKU STATE
  const createTempArr = () => {
    let tempArr = [...sudoku];
    // let newArray = genGame("Medium");
    // console.log(newArray);
    let index = 0;
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        tempArr[index++] = sudGenerator[i][j];
      }
    }
    setSudoku(tempArr);
    setPtArray(tempArr);
    // setPtArray(()=> tempArr);

    // STORING THE EMPTY POSTION(VALUE "0") IN AN ARRAY
    // console.log(tempArr);
    setEmptyPos([]);
    tempArr.forEach((value, index) => {
      if (value === 0) {
        setEmptyPos((prevValue) => {
          return [...prevValue, index];
        });
      }
    });
    // console.log(emptyPos);

  }

  useEffect(() => {
    // console.log(inputVal, focusCell);
    if (inputVal && focusCell !== null) {
      updateState(focusCell, inputVal);
    }
    if (isSudoku) {
      // console.log(sudoku);
      // createTempArr();
      // setIsSudoku(false);

    }
    // eslint-disable-next-line
  }, [inputVal])

  useEffect(() => {
    // sudGenerator will only run, when user clicks on the start game button for one time only 
    if(isSudoku && sudGenerator[0][0].length !== 0){
      createTempArr();
      setIsSudoku(false);
    }
    // eslint-disable-next-line
  }, [sudGenerator])



  const getFocusCell = (index) => {
    setFocusCell(index);
  }
  const getInputVal = (value) => {
    setInputVal(value);
  }
  const updateState = (index, value) => {
    if (value === "X") {
      let copySudoku = [...sudoku];
      copySudoku[index] = "";
      setSudoku(copySudoku);
      setFoundCell([]);
      return;
    }
    let copySudoku = [...sudoku];
    copySudoku[index] = Number(value);
    setSudoku(copySudoku);

    // UPDATE THE NUMBER OF ATTEMPTS
    setAttempts((prevVal) => {
      return prevVal + 1;
    });
    // console.log(attempts);
    let sudGrid = genGrid(sudoku);
    let safe = checkSafe(sudGrid, index, value);
    // console.log(safe);
    if (safe) {
      const isFull = copySudoku.filter((element) => { return element === 0 });
      // console.log(isFull);
      if (isFull.length === 0) {

        // VALIDATION ARRAY TO VALITDATE ALL THE EMPTY VALUES(0) HAS BEEN REPLACED WITH THEIR CORRECT VALUES
        let validateArr = new Array(emptyPos.length);
        let safe = true;
        // console.log("emptyPos " + emptyPos + emptyPos.length);
        for (let i = 0; i < emptyPos.length; i++) {
          // console.log(sudGrid, emptyPos[i], copySudoku[emptyPos[i]]);
          safe = checkSafe(genGrid(ptArray), emptyPos[i], copySudoku[emptyPos[i]], true);
          validateArr[i] = safe;
          // console.log("safe " + safe);
          if (!safe) {
            break;
            // return safe;
          }

        }
        if (safe) {
          console.log("validateArr " + validateArr + validateArr.length);
          setGameOver(true);
          setTimeout(() => {
            let winnerMsg = `You won ${playerName}, and you took: ${time.hour} hours, ${time.min} minutes, and ${time.sec} seconds to finish the game.`
            resetLevel();
            setTime({ hour: 0, min: 0, sec: 0 })
            // updateGameOver();
            alert(winnerMsg);
            // setSudoku(arr);
          }, 500);
        } else {
          console.log("validateArr " + validateArr + validateArr.length);
          console.log("error");
        }
      }

    }
    // setInputVal(null);
  }

  const genGrid = (array) => {
    let index = 0;
    let Arr = new Array(9);
    for (let i = 0; i < Arr.length; i++) {
      Arr[i] = new Array(9);
    }
    for (let i = 0; i < Arr.length; i++) {
      for (let j = 0; j < Arr.length; j++) {
        Arr[i][j] = array[index++];
      }
    }
    return Arr;
  }

  const resetGame = () => {
    setSudoku(arr);
    setFocusCell(null);
    setInputVal(null);
    setIsSudoku(true);
    setPtArray(arr);

    setEmptyPos([]);
    setAttempts(0);
    setPlayerName("");
    setGameOver(false);
    setTime({ hour: 0, min: 0, sec: 0 })

    // console.log(arr);
  }



  return (
    <SudokuContext.Provider value={{ gameOver, setGameOver, resetGameOver, time, updateTime, playerName, updatePlayerName, sudoku, focusCell, inputVal, updateState, getFocusCell, getInputVal, ptArray, attempts, resetAttempts, resetGame }}>
      {props.children}
    </SudokuContext.Provider>
  )
}

export default SudokuState;