/*

  Author: GlitchedGoose()

*/

// DOM element handles
let canvas;
let scoreBox;
let comboBox;
let rowsClearedBox;

let ctx;

let width;
let height;

let board;
let rows = 8;
let cols = 8;
let tileSize = 53;

let mouseData = {
  x: 0,
  y: 0,
  hasMoved: false,
  
  update(event) {
    const canvasPosition = canvas.getBoundingClientRect();
    mouseData.x = bound(Math.floor((event.clientX - canvasPosition.left) / board.tileSize), 0, cols - board.nextBlock.width);
    mouseData.y = bound(Math.floor((event.clientY - canvasPosition.top) / board.tileSize), 0, rows - board.nextBlock.height);
    
    mouseData.hasMoved = true;
  }
};

// create a random function for the array class
Array.prototype.random = function() {
  return this[Math.floor((Math.random() * this.length))];
};

// gets a random integer between a min and max
function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// gets a random hsl color value
function getRandomColor() {
  return `hsl(${getRandomValue(0, 360)}, 73%, 58%)`;
}

// takes the given value and contrains it between a min and max
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