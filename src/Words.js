import wordBank from "./wordle-bank.txt";

export const boardDefault = [
  ["", "", "", "", "", ""],
  ["", "", "", "", "", ""],
  ["", "", "", "", "", ""],
  ["", "", "", "", "", ""],
  ["", "", "", "", "", ""],
  ["", "", "", "", "", ""],
];

export const generateWordSet = async () => {
  let todaysWord;
  const response = await fetch(wordBank);
  const data = await response.text();
  const wordArr = data.split("\n");
  const trimmredWordArr = wordArr.map((word) => word.trim());
  //   console.log(trimmredWordArr);
  todaysWord =
    trimmredWordArr[Math.floor(Math.random() * trimmredWordArr.length)];
  const wordSet = new Set(trimmredWordArr);
  // console.log({ todaysWord });
  return { wordSet, todaysWord };
};
