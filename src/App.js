import './App.css';
import Board from './components/board/Board';
import SudokuState from './context/sudoku/SudokuState';
import GameState from './context/game/GameState';
import Home from './components/home/Home';
import { useState } from 'react';
import Nav from './components/Navbar/Nav';
import Footer from './components/footer/Footer';

function App() {

  const [start, setStart] = useState(false);

  return (
    <div className="App">
    <Nav />
      <GameState>
        <SudokuState>
          {start === false && <Home start={setStart} />}
          {start === true && <Board start={setStart} />}
        </SudokuState>
      </GameState>
      {/* <Footer /> */}
    </div>
  );
}

export default App;

