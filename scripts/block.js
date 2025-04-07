/*

  Author: GlitchedGoose()

*/

let blockConstructor = {
  peiceMaps: {
    "right-flank": [
      [1,0,0],
      [1,2,1],
    ],
    
    "left-flank": [
      [0,0,1],
      [1,2,1],
    ],
    
    "1x1": [
      [2]
    ],
    
    "1x2": [
      [2,1]
    ],
    
    "1x3": [
      [1,2,1]
    ],
    
    "1x4": [
      [1,2,1,1]
    ],
    
    "1x5": [
      [1,1,2,1,1]
    ],
    
    "2x2": [
      [2,1],
      [1,1]
    ],
    
    "3x3": [
      [1,1,1],
      [1,2,1],
      [1,1,1]
    ],
    
    "2x3": [
      [1,2,1],
      [1,1,1]
    ],
    
    "T-shape": [
      [1,2,1],
      [0,1,0]
    ],
    
    "3-stair": [
      [2,1],
      [1,0]
    ],
    
    "5-stair": [
      [2,1,1],
      [1,0,0],
      [1,0,0]
    ],
    
    "z-shape": [
      [1,2,0],
      [0,1,1],
    ]
  },
  
  getRandomPeiceType() {
    return Object.keys(blockConstructor.peiceMaps).random();
  },
  
  getTranspose(map) {
    let output = Array.from(map[0], i => new Array(map.length).fill(0));
    
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
      // rote the map by 90 degrees clockwise
      output = blockConstructor.getTranspose(output);
      
      for(let i = 0; i < output.length; i++) {
        output[i] = output[i].reverse();
      }
    }

    return output;
  },
  
  getPointArray(type) {
    let points = [];
    let bluePrint = blockConstructor.getRandomMapOrientation(blockConstructor.peiceMaps[type]);
    
    // covert the blueprint into a 1 dimensional array of point objects
    for (let y = 0; y < bluePrint.length; y++) {
      let row = bluePrint[y];
      
      for (let x = 0; x < row.length; x++) {
        if (row[x] > 0) points.push( new Point(x, y) );
      }
    }
    
    return {points, bluePrint};
  }
};

class Block {
  constructor(type) {
    this.blockData = blockConstructor.getPointArray(type);
    this.points = this.blockData.points;
    this.bluePrint = this.blockData.bluePrint;
    this.pointCount = this.points.length;
    
    this.width = this.bluePrint[0].length;
    this.height = this.bluePrint.length;
    
    this.color;
    this.type = type;
    this.color = getRandomColor();
  }
  
  deletePoint(other) {
    for (let i = 0; i < this.points.length; i++) {
      let point = this.points[i];
      if (point.equals(other)) {
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