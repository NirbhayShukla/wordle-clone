import React, { useContext, useEffect } from "react";

import { AppContext } from "../App";

function Letter({ letterPos, attemptValue }) {
  const { board, correctWord, currentAttempt, setDisabledLetters } =
    useContext(AppContext);

  const letter = board[attemptValue][letterPos];

  const correct = correctWord.toUpperCase()[letterPos] === letter;
  //   console.log(correct);
  const almost = !correct && letter !== "" && correctWord.includes(letter);
  const letterstate =
    currentAttempt.attempt > attemptValue &&
    (correct ? "correct" : almost ? "almost" : "error");

  useEffect(() => {
    if (letter !== "" && !correct && !almost) {
      setDisabledLetters((prev) => [...prev, letter]);
    }
  }, [currentAttempt.attempt]);

  return <div className={`letter ${letterstate}`}>{letter}</div>;
}

export default Letter;
