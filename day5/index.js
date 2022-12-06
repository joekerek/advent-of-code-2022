const fs = require('fs');

const fileContents = fs.readFileSync('input', 'utf-8').split("\n");
const inputSeparator = fileContents.indexOf('');
const stacksGroup =
  fileContents
    .slice(0, inputSeparator - 1)
    .map(val => val.replace(/[\[\]]/g, ''))
    .map(val => val.replace(/\s/g, '-'))
    .map(val => val.replace(/\s/g, '-'))
    .map(val => val.replace(/[-]{4}/g, '.'))
    .map(val => val.replace(/-/g, ''))

const num_stacks = fileContents[inputSeparator - 1].replaceAll(' ', '').length;
let stacks = [];
for (let i = 0; i < num_stacks; i++) {
  stacks.push([])
}
stacksGroup.forEach(
  (group) => {
    const contents = group.split('');
    contents.forEach((val, index) => {
      if (val !== '.') stacks[index].push(val)
    })
  }
);

const moves =
  fileContents.slice(inputSeparator + 1)
    .filter(val => val != '')

const part1 = () => {
  moves
    .forEach(movesRow => {
      const moveContent = movesRow.split(' ');
      const numMoves = Number(moveContent[1]);
      const from = Number(moveContent[3]);
      const to = Number(moveContent[5]);
      for (let i = 0; i < numMoves; i++) {
        stacks[to - 1].unshift(stacks[from - 1].shift());
      }
    })
  let result = '';
  stacks.forEach(stack => result += stack[0]);
  console.log(result);
}

const part2 = () => {
  moves
    .forEach(movesRow => {
      const moveContent = movesRow.split(' ');
      const numMoves = Number(moveContent[1]);
      const from = Number(moveContent[3]);
      const to = Number(moveContent[5]);
      const deleted = stacks[from - 1].splice(0, numMoves);
      stacks[to - 1].unshift(...deleted)
    })
  let result = '';
  console.log(stacks);
  stacks.forEach(stack => result += stack[0]);
  console.log(result);
}

// part1()
part2()
