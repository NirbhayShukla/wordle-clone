import "./App.css";
import React, { useState, createContext, useEffect } from "react";
import { boardDefault, generateWordSet } from "./Words";

import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import Gameover from "./components/Gameover";

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currentAttempt, setCurrentAttempt] = useState({
    attempt: 0,
    letterPos: 0,
  });
  const [wordSet, setWordSet] = useState(new Set());
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [gameOver, setGameOver] = useState({ gameOver: false, win: false });
  const [correctWord, setCorrectWord] = useState("");
  const [warning, setWarning] = useState(false);

  useEffect(() => {
    generateWordSet().then((words) => {
      // console.log(words);
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysWord.toUpperCase());
      // console.log({ correctWord });
      // console.log(words.todaysWord);
    });
  }, []);

  function onSelectLetter(keyVal) {
    if (currentAttempt.letterPos > 4) return;
    const newBoard = [...board];
    newBoard[currentAttempt.attempt][currentAttempt.letterPos] = keyVal;
    setBoard(newBoard);
    setCurrentAttempt({
      ...currentAttempt,
      letterPos: currentAttempt.letterPos + 1,
    });
  }

  function onDelete() {
    const newBoard = [...board];
    newBoard[currentAttempt.attempt][currentAttempt.letterPos - 1] = "";
    setBoard(newBoard);
    if (currentAttempt.letterPos === 0) return;
    setCurrentAttempt({
      ...currentAttempt,
      letterPos: currentAttempt.letterPos - 1,
    });
  }

  function onEnter() {
    if (currentAttempt.letterPos !== 5) {
      return;
    }

    let currWord = "";
    for (let i = 0; i < 5; i++) {
      currWord += board[currentAttempt.attempt][i];
    }
    // console.log(currWord.toLowerCase());
    if (wordSet.has(currWord.toLowerCase())) {
      setCurrentAttempt({
        attempt: currentAttempt.attempt + 1,
        letterPos: 0,
      });
      setWarning(false);
    } else {
      setWarning(true);
    }

    if (currWord === correctWord) {
      setGameOver({ gameOver: true, win: true });
    }
    console.log(currentAttempt.attempt);
    if (currentAttempt.attempt === 5) {
      setGameOver({ gameOver: true, win: false });
    }
  }

  return (
    <div className="App">
      <nav>
        <h1>Wordle</h1>
      </nav>
      <AppContext.Provider
        value={{
          board,
          setBoard,
          currentAttempt,
          setCurrentAttempt,
          onDelete,
          onEnter,
          onSelectLetter,
          correctWord,
          disabledLetters,
          setDisabledLetters,
          gameOver,
          setGameOver,
        }}
      >
        <div className="game">
          <Board />
          {warning && <h4>No word found</h4>}
          {gameOver.gameOver ? <Gameover /> : <Keyboard />}
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
