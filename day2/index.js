const fs = require('fs');

const fileContents = fs.readFileSync("input").toString();
const gameRows = fileContents.split("\n");

const wins = new Map([
  ["B", "Z"],
  ["C", "X"],
  ["A", "Y"]
]);

const losses = new Map([
  ["A", "Z"],
  ["B", "X"],
  ["C", "Y"]
]);

const moveTranslate = new Map([
  ["A", "X"],
  ["B", "Y"],
  ["C", "Z"]
]);

const movesScores = new Map([
  ["X", 1],
  ["Y", 2],
  ["Z", 3]
]);

let score = 0;
for(const row of gameRows) {
  const splitRow = row.split(" ");
  const opponentMove = splitRow[0];
  const myMove = splitRow[1];
  const winResponse = wins.get(opponentMove);
  const moveScore = movesScores.get(myMove);
  if(winResponse === myMove) {
    // win
    score += (moveScore + 6)
  } else if (myMove === moveTranslate.get(opponentMove)) {
    // draw
    score += (moveScore + 3)
  } else {
    // lost
    score += moveScore
  }
}

console.log("part1 = ", score);

let score2 = 0
for(const row of gameRows) {
  const splitRow = row.split(" ");
  const opponentMove = splitRow[0];
  const outcome = splitRow[1];
  if(outcome === "X") {
    // lost
    const myMove = losses.get(opponentMove);
    score2 += movesScores.get(myMove);
  } else if (outcome === "Y") {
    // draw
    const myMove = moveTranslate.get(opponentMove);
    score2 += (movesScores.get(myMove) + 3);
  } else {
    const myMove = wins.get(opponentMove);
    score2 += (movesScores.get(myMove) + 6);
  }
}

console.log("part2 = ", score2);
