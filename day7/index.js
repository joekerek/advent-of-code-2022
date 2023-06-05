const fs = require("fs");

const fileContents = fs.readFileSync('input').toString();
const rows = fileContents.split('\n');
const stack = [];

const contentsMap = new Map();

const addToMap = (contentsMap, key, value) => {
  if(!contentsMap.has(key)) {
    contentsMap.set(key, [value])
  } else {
    contentsMap.set(key, [...contentsMap.get(key), value])
  }
}

for(const row of rows) {
  if(row.match(/\$ cd [a-z\/]+/)) {
    stack.push(row.split(' ')[2]);
  } else if(row === '$ cd ..') {
    stack.pop();
  } else if(row.startsWith('dir')) {
    addToMap(contentsMap, stack.join('-'), row);
  } else if(row.match(/^\d+/)) {
    addToMap(contentsMap, stack.join('-'), row.split(' ')[0]);
  }
}

const sizes = new Map();

const calcSize = (dir, contents) => {
  let contentSize = 0;
  for(const content of contents) {
    if(content.startsWith('dir')) {
      const d = `${dir}-${content.split(' ')[1]}`;
      contentSize += calcSize(d, contentsMap.get(d));
    } else {
      contentSize += Number(content);
    }
  }
  sizes.set(dir, contentSize)
  return contentSize;
}


// part1
for(const [dir, contents] of contentsMap.entries()) {
  calcSize(dir, contents);
}

// console.log([...sizes.values()].filter(val => Number(val) < 100000).reduce((a,b) => a + b, 0));

// part2
const sizesValues = [...sizes.values()].sort((a,b) => a - b);
const unused = 70000000 - sizesValues.at(-1);
const needed = 30000000 - unused

for(const siz of sizesValues) {
  if(siz >= needed) {
    console.log(siz);
    break;
  }
}
