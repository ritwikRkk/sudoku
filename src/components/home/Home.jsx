import React, { useState, useContext } from 'react';
import "./home.css";
import gameContext from '../../context/game/gameContext';
import sudokuContext from '../../context/sudoku/sudokuContext';

const Home = ({ start }) => {
    const levelName = ["Easy", "Medium", "Hard", "Very Hard", "Insane", "Alien"];
    let [levelIndex, setLevelIndex] = useState(1);
    const [gameData, setGameData] = useState({ level: levelName[0] });

    const context = useContext(gameContext);
    const { getLevel } = context;

    const sudContext = useContext(sudokuContext);
    const { playerName, updatePlayerName } = sudContext;

    const handleOnChange = (event) => {
        // const { name, value } = event.target;
        // setGameData((prevVal) => {
        //     return {
        //         ...prevVal,
        //         [name]: value
        //     }
        // });
        const { value } = event.target;
        updatePlayerName(value);
    }

    const handleOnClick = () => {
        setGameData((prevVal) => {
            return {
                ...prevVal,
                level: levelName[levelIndex]
            }
        });
        if (levelIndex >= levelName.length - 1) {
            // console.log("reached last level");
            setLevelIndex(0);
        } else {
            setLevelIndex(levelIndex + 1);
        }
    }

    const handleStart = () => {
        if (playerName.length >= 3) {
            start(true);
            getLevel(gameData.level);
            // console.log(genGame());
        }
    }

    return (
        <div className="home">
            <div className="home_container">
                <div className="name_container">
                    <input name="name" type="text" value={playerName} onChange={handleOnChange} placeholder="Your Name" autoComplete='off' />
                    <small>Name must have atleast 3 characters</small>
                </div>
                <p onClick={handleOnClick}> {gameData.level} </p>
                <button disabled = {playerName.length <3} className="start_game" onClick={handleStart}>Start Game</button>
            </div>

        </div>
    )
}

export default Home