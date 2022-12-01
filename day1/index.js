const fs = require('fs')
const contents = fs.readFileSync('input').toString();
const list = contents.split('\n');

const scores =
  contents
    .split("\n\n")
    .map(val => val.split('\n').map(score => Number(score)));

const sumList = (list) => list.reduce((prev, curr) => prev + curr, 0)
const max = scores.reduce((acc, curr) => {
  const sum = sumList(curr);
  if(sum > acc) {
    return sum
  }
  return acc;
}, 0)

// del1
console.log(max);


let l2 = [...scores];
let sum2 = 0;
let i = 0;
while(i < 3) {
  const v = l2.reduce((acc, curr, index) => {
    const sum = sumList(curr);
    if(sum > acc[0]) {
      return [sum, index]
    }
    return acc;
  }, [0,0])
  l2.splice(v[1], 1);
  sum2 += v[0]
  i++
}

console.log(sum2);
