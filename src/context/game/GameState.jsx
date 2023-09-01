// import React, { useEffect } from 'react';
import { useState } from "react";
import GameContext from "./gameContext";
import { useEffect } from "react";
// import React, { useContext } from 'react'
// import sudokuContext from "../../context/sudoku/sudokuContext";

const GameState = (props) => {

    // <--------------------------------- GENERATE SUDOKU (START) --------------------------------------->

    const CONSTANT = {
        UNASSIGNED: 0,
        GRID_SIZE: 9,
        BOX_SIZE: 3,
        FILLER_NUMBERS: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        LEVEL_NAME: [
            'Easy',
            'Medium',
            'Hard',
            'Very Hard',
            'Insane',
            'Alien'
        ],
        LEVEL: [10, 29, 38, 47, 56, 74]
    }
    // let count = 1;
    // <--------- GENERATE BASE SUDOKU WITH VALUE "0" --------->
    const baseSudoku = (size) => {
        let Arr = new Array(size);
        for (let i = 0; i < Arr.length; i++) {
            Arr[i] = new Array(size);
        }
        for (let i = 0; i < Arr.length; i++) {
            for (let j = 0; j < Arr.length; j++) {
                Arr[i][j] = CONSTANT.UNASSIGNED;

                // Arr[i][j] = j;
                // Arr[i][j] = count;
                // count++;
            }
        }
        return Arr;
    }

    // let Arr = baseSudoku(CONSTANT.GRID_SIZE);
    // console.log(Arr);

    // <--------- SHUFFLE THE FILLER ARRAY TO GET NEW RANDOM NUMBERS AT EACH CELL EVERYTIME --------->
    const shuffleArray = (arr) => {
        // Number of times loop runs to shuffle the array
        let current_index = arr.length;
        while (current_index !== 0) {
            let random_index = Math.floor(Math.random() * current_index);
            current_index -= 1;

            let tempVal = arr[current_index];
            arr[current_index] = arr[random_index];
            arr[random_index] = tempVal;
        }
        // console.log(arr);
        return arr;

    }
    // const newArray = shuffleArray(CONSTANT.FILLER_NUMBERS);
    // console.log(newArray);


    // <--------- FIND THE UNASSIGNED POSITION IN GRID HAVING VALUE = "0", WHERE NEW VALUE WILL BE PLACED --------->
    const findUnassignedPosition = (grid, pos) => {
        for (let row = 0; row < CONSTANT.GRID_SIZE; row++) {
            for (let col = 0; col < CONSTANT.GRID_SIZE; col++) {
                if (grid[row][col] === CONSTANT.UNASSIGNED) {
                    pos.row = row;
                    pos.col = col;
                    return true;
                }
            }
        }
        return false;
    }
    // const unassignedPos = {
    //     row: -1,
    //     col: -1
    // }
    // console.log(unassignedPos);
    // findUnassignedPosition(Arr, unassignedPos);
    // console.log(unassignedPos);



    // <--------- CHECKING IF THE SUDOKU GRID IS COMPLETE --------->
    const isGridFull = (grid) => {
        return grid.every((row, i) => {
            return row.every((value, j) => {
                return value !== CONSTANT.UNASSIGNED;
            });
        });
    }
    // const bool = isGridFull(Arr);
    // console.log(bool);


    // <--------- SUDOKU LOGIC STARTS HERE --------->

    // <--------- CHECK DUPLICATE NUMBERS IN ROWS --------->
    const isRowSafe = (grid, row, value) => {
        for (let col = 0; col < CONSTANT.GRID_SIZE; col++) {
            if (grid[row][col] === value) return false;
        }
        return true;
    }
    // <--------- CHECK DUPLICATE NUMBERS IN COLUMNS --------->
    const isColumnSafe = (grid, col, value) => {
        for (let row = 0; row < CONSTANT.GRID_SIZE; row++) {
            if (grid[row][col] === value) return false;
        }
        return true;
    }
    // <--------- CHECK DUPLICATE NUMBERS IN 3*3 GRID --------->
    const isSquareSafe = (grid, sqr_row, sqr_col, value) => {
        for (let row = 0; row < CONSTANT.BOX_SIZE; row++) {
            for (let col = 0; col < CONSTANT.BOX_SIZE; col++) {
                if (grid[row + sqr_row][col + sqr_col] === value) return false;
            }
        }
        return true;
    }
    // <--------- CHECK DUPLICATE NUMBERS IN ALL ROWS, COLUMNS, 3*3 GRID AT ONCE --------->
    const isSafe = (grid, row, col, value) => {
        return isColumnSafe(grid, col, value) && isRowSafe(grid, row, value) && isSquareSafe(grid, row - row % 3, col - col % 3, value) && value !== CONSTANT.UNASSIGNED;
    }

    // <--------- GENERATE FINAL SUDOKU GRID --------->
    // let call = 1;
    const createSudoku = (grid) => {
        // console.log("creating suudoku ", call);
        // call++;
        let unassignedPos = {
            row: -1,
            col: -1
        }
        // FIND NEW UNASSIGNED POSTION TO PUT THE NEXT VALUE ON THIS CELL
        if (!findUnassignedPosition(grid, unassignedPos)) {
            // IF THERE IS NO CELL WITH VALUE "0"
            return true;
        }

        let filler_numbers = shuffleArray(CONSTANT.FILLER_NUMBERS);
        let row = unassignedPos.row;
        let col = unassignedPos.col;

        filler_numbers.forEach((number, index) => {
            if (isSafe(grid, row, col, number)) {
                grid[row][col] = number;

                // CHECK IF GRID IS FULL
                if (isGridFull(grid)) {
                    // console.log("Grid is full 1");
                    return true;
                } else {
                    if (createSudoku(grid)) {
                        return true;
                    }
                }
                grid[row][col] = CONSTANT.UNASSIGNED;

            }
        });
        return isGridFull(grid);

    }

    const random = () => Math.floor(Math.random() * CONSTANT.GRID_SIZE);
    // <--------- GENERATE SUDOKU QUESTION BASED ON LEVEL --------->
    const genSudokuQuestion = (grid, level) => {
        let questionSudoku = [...grid];
        let removeCells = level;
        while (removeCells > 0) {
            let row = random();
            let col = random();
            while (questionSudoku[row][col] === 0) {
                row = random();
                col = random();
            }
            questionSudoku[row][col] = CONSTANT.UNASSIGNED;
            removeCells--;
        }
        return questionSudoku;

    }

    // <--------- GENERATE SUDOKU AND RUN ALL ABOVE FUNCTIONS --------->
    let genSudoku = (level) => {
        let sudokuBase = baseSudoku(CONSTANT.GRID_SIZE);
        let newSudoku = createSudoku(sudokuBase);
        // return sudokuBase;


        if (newSudoku) {
            // let questionSud = genSudokuQuestion(sudokuBase, level);
            return {
                original: sudokuBase,
                question: genSudokuQuestion(sudokuBase, level)
            }
        }
        return undefined;
    }


    // let sudGenerator = genSudoku(9);
    // sudGenerator = sudGenerator.question;
    const initialSudoku = (size) => {
        let Arr = new Array(size);
        for (let i = 0; i < Arr.length; i++) {
            Arr[i] = new Array(size);
        }
        for (let i = 0; i < Arr.length; i++) {
            for (let j = 0; j < Arr.length; j++) {
                Arr[i][j] = "";

                // Arr[i][j] = j;
                // Arr[i][j] = count;
                // count++;
            }
        }
        return Arr;
    }

    let newSudoku = initialSudoku(CONSTANT.GRID_SIZE);
    const [sudGenerator, setSudokuGenerator] = useState(newSudoku);
    // console.log(sudGenerator);
    // console.log(sudGenerator);

    const [level, setLevel] = useState(null);
    const getLevel = (levelName) => {
        // console.log(levelName);
        const getIndex = (element) => element === levelName;
        let levelIndex = CONSTANT.LEVEL_NAME.findIndex(getIndex);
        // console.log(levelIndex);
        setLevel(levelIndex);
        return levelIndex;
    }
    const resetLevel = () => {
        setLevel(null);
    }

    const genGame = () => {
        let sudokuLevel = CONSTANT.LEVEL[level];
        let sudGen = genSudoku(sudokuLevel);
        sudGen = sudGen.question;
        // setSudokuGenerator(sudGen); //
        // console.log(sudGen);
        return sudGen;
    }

    useEffect(() => {
        if (level !== null) {
            let sud = genGame();
            // console.log(sud);
            setSudokuGenerator(sud); //
        }
        // eslint-disable-next-line
    }, [level])



    // console.log("original ",sudGenerator.original);
    // console.log(sudGenerator.question);
    // console.log("original ",sudGenerator);

    // <--------- PLACING THE ARRAY ELEMENTS TO DOM INPUT CELLS --------->
    // let cells = document.querySelectorAll(".cell input");
    // let start = 0;
    // for (let i = 0; i < sudGenerator.length; i++) {
    //     for (let j = 0; j < sudGenerator.length; j++) {
    //         if(sudGenerator[i][j] !== 0){

    //             cells[start].setAttribute("value", sudGenerator[i][j]);
    //         }
    //         start++;
    //     }
    // }

    // <--------------------------------- GENERATE SUDOKU (END) --------------------------------------->


    // <--------------------------------- CHECK SUDOKU (START) --------------------------------------->

    const [foundCell, setFoundCell] = useState([]);
    const checkRowSafe = (grid, row, value) => {
        // console.log("rowSafe ", grid, row, value);
        // console.log("rowSafe ");
        for (let col = 0; col < CONSTANT.GRID_SIZE; col++) {
            if (grid[row][col] === value) {
                let cell = (9 * row) + col;
                setFoundCell((prevValue) => {
                    return [...prevValue, cell]
                });
                // console.log("matched rowSafe ", cell);
                return false;
            }
        }
        return true;
    }
    // <--------- CHECK DUPLICATE NUMBERS IN COLUMNS --------->
    const checkColumnSafe = (grid, col, value) => {
        // console.log("columnSafe ", grid, col, value);
        // console.log("columnSafe ");
        for (let row = 0; row < CONSTANT.GRID_SIZE; row++) {
            // console.log("running ", grid[row][col], value);
            if (grid[row][col] === value) {
                let cell = (9 * row) + col;
                setFoundCell((prevValue) => {
                    return [...prevValue, cell]
                });
                // console.log("matched columnSafe ", cell);
                return false;
            }
        }
        return true;
    }
    // <--------- CHECK DUPLICATE NUMBERS IN 3*3 GRID --------->
    const checkSquareSafe = (grid, sqr_row, sqr_col, value) => {
        // console.log("squareSafe ", grid, sqr_row, sqr_col, value);
        // console.log("squareSafe ");
        for (let row = 0; row < CONSTANT.BOX_SIZE; row++) {
            for (let col = 0; col < CONSTANT.BOX_SIZE; col++) {
                if (grid[row + sqr_row][col + sqr_col] === value) {
                    let cell = (9 * (row + sqr_row)) + (col + sqr_col);
                    setFoundCell((prevValue) => {
                        return [...prevValue, cell]
                    });
                    // console.log("matched boxSafe ", cell);
                    return false;
                }
            }
        }
        return true;
    }
    // <--------- CHECK DUPLICATE NUMBERS IN ALL ROWS, COLUMNS, 3*3 GRID AT ONCE --------->
    const checkSafe = (grid, index, value, full = false) => {
        setFoundCell([]);
        // let cell = "";
        // console.log(grid, index, value);
        let row = Math.floor(index / 9);
        let col = index % 9;
        let cSafe = checkColumnSafe(grid, col, Number(value));
        let rSafe = checkRowSafe(grid, row, Number(value));
        let sqSafe = checkSquareSafe(grid, row - row % 3, col - col % 3, Number(value));
        // console.log("csafe " + cSafe + " rSafe " + rSafe + " sqSafe " + sqSafe);
        if (full) {
            let cell = (9 * row) + col;
            setFoundCell((prevValue) => {
                return [...prevValue, cell]
            });
        }
        if (cSafe && rSafe && sqSafe) {
            // console.log("foundCell: " + foundCell);
            return true;
        } else {
            // console.log("foundCell: " + foundCell);
            return false;
        }

    }

    // <--------------------------------- CHECK SUDOKU (START) --------------------------------------->

    return (
        <GameContext.Provider value={{ resetLevel, sudGenerator, checkSafe, foundCell, setFoundCell, getLevel, genGame }}>
            {props.children}
        </GameContext.Provider>

        // <GameContext.Provider value={{ sudGenerator, checkSafe, foundCell, setFoundCell }}>
        //     {props.children}
        // </GameContext.Provider>
    )
}

export default GameState;