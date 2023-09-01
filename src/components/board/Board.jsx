import "./board.css";
import Square from "../square/Square";
import React, { useContext, useRef, useState, useEffect } from 'react'
import sudokuContext from "../../context/sudoku/sudokuContext";
import Numbers from "../numbers/Numbers";
import Modal from "../modal/Modal";

const Board = ({ start }) => {
    const context = useContext(sudokuContext);
    const { sudoku, attempts, updateTime, gameOver, resetAttempts, resetGameOver, resetGame } = context;

    let [time, setTime] = useState({
        counter: 0,
        hour: 0,
        min: 0,
        sec: 0,
    });
    const [pause, setPause] = useState(false);

    const renderCells = (cells, index) => {
        let row = Math.floor(index / 9);
        let col = index % 9;
        if (row === 2 || row === 5) {
            return <Square key={index} index={index} mb={true} />
        }
        if (col === 2 || col === 5) {
            return <Square key={index} index={index} mr={true} />
        }
        return <Square key={index} index={index} />
    }

    let timerId = useRef();
    const timer = () => {
        timerId.current = setInterval(() => {
            let hour = Math.floor(time.counter++ / 3600);
            let min = Math.floor((time.counter % 3600) / 60);
            // let sec = time.counter % 60;
            let sec = ((time.counter % 3600) % 60);
            // console.log(min,sec);
            setTime((prevVal) => {
                return {
                    ...prevVal,
                    counter: time.counter,
                    hour: hour,
                    min: min,
                    sec: sec
                }
            });
            updateTime({ hour: hour, min: min, sec: sec });
            // console.log(time.counter, min, sec);

        }, 1000);
    }

    useEffect(() => {
        if (start) {

            timer();
        }
        // return () => clearInterval(timerId.current);
        // setInterval(timer, 1000);
        // eslint-disable-next-line
    }, [start])

    useEffect(() => {
        if (gameOver) {
            clearInterval(timerId.current);
            // document.body.style.pointerEvents = 'none';
            // document.querySelector(".main-board").style.opacity = 0.5;
        }
        // eslint-disable-next-line
    }, [gameOver])

    const handlePauseResume = (type) => {
        if (type === 'pause') {
            setPause(true);
            clearInterval(timerId.current);
        } else {
            setPause(false);
            timer();
        }

    }

    const redirectHome = () => {
        start(false);
        resetAttempts();
        resetGameOver();
        resetGame();
    }



    return (
        <div className="board-container">
            <div className="main-board">
                <div className={`board ${gameOver ? "gameOver" : ""}`}>
                    {/* {sudoku.map((cell, index) => {
                    return <Square key={index} index={index} />
                })} */}
                    {sudoku.map(renderCells)}
                </div>
                <div className={`leader-board ${gameOver ? "gameOver" : ""}`}>
                    <div className="attempts">Attempts: <span>{attempts}</span> </div>
                    <div className="time-container">
                        <div className="time">
                            <span>Time: </span>
                            <span>{time.hour.toString().length === 1 ? `0${time.hour.toString()}` : time.hour.toString()}</span>
                            :
                            <span>{time.min.toString().length === 1 ? `0${time.min.toString()}` : time.min.toString()}</span>
                            :
                            <span>{time.sec.toString().length === 1 ? `0${time.sec.toString()}` : time.sec.toString()}</span>
                        </div>
                        <div className="timer-pause">
                            {pause === false && <span onClick={() => handlePauseResume("pause")}> <span className="material-icons">pause_circle_filled</span> </span>}
                            {pause === true && <span onClick={() => handlePauseResume("resume")}> <span className="material-icons">play_circle_filled</span> </span>}
                        </div>
                    </div>
                </div>
                <Numbers />
                <div className={`gameOverMsg ${gameOver ? "showMsg" : ""}`} onClick={redirectHome} > Start a new Game </div>
            </div>
            {pause && <Modal handleGame={handlePauseResume} start={start} />}
        </div>
    )
}

export default Board