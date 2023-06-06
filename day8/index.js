const fs = require('fs');

const grid = fs
  .readFileSync('input')
  .toString()
  .split('\n')
  .filter(row => row); // filter out empty rows

const numRows = grid.length;
const numCols = grid[0].length;
const trees = grid.flatMap((row, i) => row.split('').map((val, j) => {
  const visible = // cell is visible if in permimeter
    [0, numRows - 1].includes(i) ||
    [0, numCols - 1].includes(j);

  return { i, j, val: Number(val), visible }
}))

const checkHidden = (treesToCompare, tree) => {
  return treesToCompare.find(t => t.val >= tree.val);
}

const getViewDistance = (treesToCompare, tree) => {
  let count = 0;
  for (const comp of treesToCompare) {
    count++;
    if (tree.val <= comp.val) {
      return count;
    }
  }
  return count;
}

trees.forEach((tree) => {
  if (!tree.visible) {
    const sameRow = trees.filter(t => t.i === tree.i);
    const before = sameRow.slice(0, tree.j).sort((a,b) => b.j - a.j);
    const after = sameRow.slice(tree.j + 1).sort((a, b) => a.j - b.j );

    const sameCol = trees.filter(t => t.j === tree.j);
    const above = sameCol.slice(0, tree.i).sort((a, b) => a.i - b.i);
    const below = sameCol.slice(tree.i + 1).sort((a, b) => b.i - a.i);
    let scenicScore = 1;
    [after, before, above, below].forEach(treesToCompare => {
      const isHidden = checkHidden(treesToCompare, tree);
      const viewDistance = getViewDistance(treesToCompare, tree);
      scenicScore *= viewDistance;
      if (!isHidden) {
        tree.visible = true
      }
    });
    tree.scenicScore = (scenicScore || 0);
  }
});

// part1
console.log("part1", trees.filter(tree => tree.visible).length);
const scenics = trees.filter(tree => tree.scenicScore).map(tree => tree.scenicScore)
console.log("part2", Math.max(...scenics));
