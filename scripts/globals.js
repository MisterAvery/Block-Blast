/*

  Author: GlitchedGoose()

*/

let canvas;
let ctx;

let width;
let height;

let board;

/*
1x1
1x2
1x3
1x4
1x5
All of those are vertical and horizontal
2x2
3x3
2x3 in both orientations
3x1 with an extra block sticking up on one end (all orientations)
3x1 with an extra block sticking out in the middle (all orientations)
3 blocks in a corner
5 blocks in a corner
z shape in all orientations
*/

let mouseData = {
  x: 0,
  y: 0,
  hasMoved: false,
  
  update(event) {
    const canvasPosition = canvas.getBoundingClientRect();
    mouseData.x = Math.floor((event.clientX - canvasPosition.left) / board.tileSize);
    mouseData.y = Math.floor((event.clientY - canvasPosition.top) / board.tileSize);
    
    mouseData.hasMoved = true;
  }
};

// create a random function for the array class
Array.prototype.random = function() {
  return this[Math.floor((Math.random() * this.length))];
};

function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomColor() {
  return `hsl(${getRandomValue(0, 360)}, 73%, 58%)`;
}

function bound(value, min, max) {
  if (value > max) return max;
  if (value < min) return min;
  return value;
}

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  
  equals(other) {
    if (!(other instanceof Point)) return false;
    
    return this.x === other.x && this.y === other.y;
  }
}