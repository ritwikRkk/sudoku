import React, { useContext } from 'react';
import "./modal.css";
import gameContext from '../../context/game/gameContext';
import sudokuContext from '../../context/sudoku/sudokuContext';

const Modal = ({ handleGame, start }) => {
    const context = useContext(gameContext);
    const { resetLevel } = context;

    const sudContext = useContext(sudokuContext);
    const { resetGame } = sudContext;

    const handleResume = () => {
        handleGame("resume");
    }
    const handleNewGame = () => {
        start(false);
        resetLevel();
        resetGame();
    }

    return (
        <>
            <div className="modal_wrapper"></div>
            <div className="modal_container">
                <div className="resume_game">
                    <p>Resume Your Game </p>
                    <div className="modal_btn_container">
                        <button className="modal_btn_submit" onClick={() => handleResume()}> <span> Resume </span>  </button>
                    </div>

                </div>
                <div className="new_game">

                    <p>Start New Game </p>
                    <div className="modal_btn_container">
                        <button className="modal_btn_submit" onClick={() => handleNewGame()}> <span> New Game </span>  </button>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Modal