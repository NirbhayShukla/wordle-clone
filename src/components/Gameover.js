import React, { useContext } from "react";
import { AppContext } from "../App";

function Gameover() {
  const { gameOver, currentAttempt, correctWord } = useContext(AppContext);

  return (
    <div className="gameOver">
      {gameOver.gameOver && (
        <>
          <h3>
            {gameOver.win
              ? "You Won!!!"
              : "Oops, Looks like you need to try again."}
          </h3>
          <h1>Correct word: {correctWord}</h1>
          {gameOver.win && (
            <h3>You gussed in {currentAttempt.attempt} attempts</h3>
          )}
        </>
      )}
    </div>
  );
}

export default Gameover;
