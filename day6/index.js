const fs = require('fs');

const fileContents = fs
  .readFileSync('input.txt', 'utf-8')
  .split('\n')
  .filter(val => val)
  .map(val => val.split(''))[0];

const windowSiz = 4; // change to 14 for part2
const calculateMarker = (_, indx) => {
  if (indx < fileContents.length - windowSiz) {
    const s = new Set();
    for (let i = 0; i < windowSiz; i++) {
      s.add(fileContents[indx + i]);
    }
    if (s.size === windowSiz) {
      return indx + windowSiz
    } else {
      return 0;
    }
  } else {
    return 0;
  }
}
const res = fileContents
  .map(calculateMarker)
  .find(val => val)
 
console.log(res);
