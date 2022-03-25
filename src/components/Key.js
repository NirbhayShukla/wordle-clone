import React, { useContext } from "react";
import { AppContext } from "../App";

function Key({ keyVal, bigKey, disabled }) {
  const {
    currentAttempt,

    onDelete,
    onEnter,
    onSelectLetter,
  } = useContext(AppContext);
  function selectLetter() {
    if (keyVal === "ENTER") {
      console.log(currentAttempt);
      onEnter();
    } else if (keyVal === "DELETE") {
      if (currentAttempt.letterPos === 0) return;
      onDelete();
    } else {
      if (!disabled) onSelectLetter(keyVal);
    }
  }

  return (
    <div
      className={`key ${bigKey ? "big" : disabled ? "disabled" : ""}`}
      onClick={selectLetter}
    >
      {keyVal}
    </div>
  );
}

export default Key;
