/*

  Author: GlitchedGoose()

*/

let temp = {
  peiceMaps: {
    "right-flank": [
      [1,0,0],
      [1,1,1],
    ],
    
    "left-flank": [
      [0,0,1],
      [1,1,1],
    ],
    
    "1x1": [
      [1]
    ],
    
    "1x2": [
      [1,1]
    ],
    
    "1x3": [
      [1,1,1]
    ],
    
    "1x4": [
      [1,1,1,1]
    ],
    
    "1x5": [
      [1,1,1,1]
    ],
    
    "2x2": [
      [1,1],
      [1,1]
    ],
    
    "3x3": [
      [1,1,1],
      [1,1,1],
      [1,1,1]
    ],
    
    "2x3": [
      [1,1,1],
      [1,1,1]
    ],
    
    "T-shape": [
      [1,1,1],
      [0,1,0]
    ],
    
    "3-stair": [
      [1,1],
      [1,0]
    ],
    
    "5-stair": [
      [1,1,1],
      [1,1,0],
      [1,0,0]
    ],
    
    "z-shape": [
      [1,1,0],
      [0,1,1],
    ]
  },
  
  getRandomPeiceType() {
    return Object.keys(temp.peiceMaps).random();
  },
  
  getTranspose(map) {
    let output = [];
    for (let i = 0; i < map[0].length; i++) {
      output.push(new Array(map.length).fill(0));
    }
    
    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[0].length; x++) {
        output[x][y] = map[y][x];
      }
    }
    
    return output;
  },
  
  getRandomMapOrientation(map) {
    let output = map;
    
    for (let r = 0; r < getRandomValue(0, 3); r++) {
      output = temp.getTranspose(output);
      
      for(let i = 0; i < output.length; i++) {
        output[i] = output[i].reverse();
      }
    }

    return output;
  },
  
  getPointArray(type) {
    let points = [];
    let bluePrint = temp.getRandomMapOrientation(temp.peiceMaps[type]);
    
    for (let y = 0; y < bluePrint.length; y++) {
      let row = bluePrint[y];
      
      for (let x = 0; x < row.length; x++) {
        if (row[x] > 0) points.push( new Point(x, y) );
      }
    }
    
    return points;
  }
};

class Block {
  constructor(type) {
    this.points = temp.getPointArray(type);
    this.pointCount = this.points.length;
    this.color;
    this.type = type;
    this.color = getRandomColor();
  }
  
  deletePoint(x, y) {
    for (let i = 0; i < this.points.length; i++) {
      let point = this.points[i];
      if (point.x == x && point.y == y) {
        this.points.splice(i, 1);
      }
    }
  }
  
  place(position) {
    // update the position of the block based on the mouse postition
    for (let point of this.points) {
      point.x += position.x;
      point.y += position.y;
    }
  }
}