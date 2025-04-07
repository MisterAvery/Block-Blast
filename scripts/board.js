/*

  Author: GlitchedGoose()

*/

class Board {
  constructor() {
    this.tileSize = tileSize;
    this.rowCount = rows;
    this.colCount = cols;
    
    // initalize the 2D array
    this.map = new Array(this.rowCount);
    for (let i = 0; i < this.rowCount; i++) {
      this.map[i] = new Array(this.colCount).fill(0);
    }
    
    this.blocks = [];
    
    this.reloadNextBlocks();
    this.nextBlock;
    this.nextBlockIndex;
    
    this.score = 0;
    this.combo = 0;
    this.comboCountdown = 3;
    this.totalLinesCleared = 0;
  }
  
  updateScore(val) {
    this.score += val;
    scoreBox.innerText = this.score;
  }
  
  addPeice(mouseX, mouseY, block) {
    // update the position of the block
    block.place(new Point(mouseX, mouseY));
    this.nextBlocks[this.nextBlockIndex] = 0;
    if (this.nextBlocks.every(x => x < 1)) {
      this.reloadNextBlocks();
    }
    else {
      this.setNextBlock(this.nextBlockIndex + 1);
    }
    
    // update the score variables
    this.updateScore(block.pointCount);
    this.comboCountdown--;
    
    // set the posiitons that the block takes in the map array as taken
    for (let point of block.points) {
      this.map[point.y][point.x] = this.blocks.length + 1;
    }
    
    // add the block to the block's array
    this.blocks.push(block);
  }
  
  update() {
    let spacesToClear = [];
    let linesCleared = 0;
    
    // add the points within completed rows to spacesToClear
    for (let y = 0; y < this.rowCount; y++) {
      if (this.map[y].every(val => val > 0)) {
        linesCleared++;
        
        for (let x = 0; x < this.colCount; x++) {
          let space = new Point(x, y);
          let valid = true;
          
          for (let other of spacesToClear) {
            if (spacesToClear.length < 1) break;
            if (space.equals(other)) valid = false;
          }
          
          if (valid) spacesToClear.push(space);
        }
      }
    }

    // add the points within completed columns to spacesToClear
    for (let x = 0; x < this.colCount; x++) {
      let col = [];
      
      this.map.forEach( row => col.push(row[x]) );
      
      if (col.every(val => val > 0)) {
        linesCleared++;
        
        for (let y = 0; y < this.rowCount; y++) {
          let space = new Point(x, y);
          let valid = true;
          
          for (let other of spacesToClear) {
            if (spacesToClear.length < 1) break;
            if (space.equals(other)) valid = false;
          }
          
          if (valid) spacesToClear.push(space);
        }
      }
    }
    
    // update the score
    if (linesCleared > 0) {
      this.totalLinesCleared += linesCleared;
      this.combo++;
      comboBox.innerText = this.combo;
      linesClearedBox.innerText = this.totalLinesCleared;
      
      this.comboCountdown = 3;
      this.updateScore(this.rowCount * linesCleared * this.combo);
    } else if (this.comboCountdown < 1) {
        this.combo = 0;
        comboBox.innerText = this.combo;
        this.comboCountdown = 3;
    }
    
    // clear the points in spacesToClear
    for (let space of spacesToClear) {
      let {x, y} = space;
      
      this.blocks[this.map[y][x] - 1].deletePoint( new Point(x, y) );
      this.map[y][x] = 0;
    }
  }
  
  reloadNextBlocks() {
    this.nextBlocks = Array.of(
      new Block(blockConstructor.getRandomPeiceType()),
      new Block(blockConstructor.getRandomPeiceType()),
      new Block(blockConstructor.getRandomPeiceType())
    );
    
    this.setNextBlock(0);
  }
  
  setNextBlock(i) {
    if (!this.nextBlocks[i]) return;
    this.nextBlock = this.nextBlocks[i];
    this.nextBlockIndex = i;
  }
  
  drawGridLines() {
    // draw the grid to the screen
    for (let col = 0; col < this.colCount; col++) {
      const x = this.tileSize * col;
      
      if (col > 0) {
        ctx.fillStyle = "#111";
        ctx.fillRect(x - 1, 0, 1, height);
      }
      
      for (let row = 0; row < this.rowCount; row++) {
        // calculate the coordinates on the screen
        const y = this.tileSize * row;
        
        // draw the vertical line for the row
        if (row > 0) {
          ctx.fillStyle = "#111";
          ctx.fillRect(x, y - 1, this.tileSize, 1);
        }
      }
    }
  }
  
  drawBlocks() {
    // draw the blocks to the screen
    for (let block of this.blocks) {
        ctx.fillStyle = block.color;
        // draw the tile to the screen
        for (let point of block.points) {
          ctx.fillRect(point.x * this.tileSize, point.y * this.tileSize, this.tileSize, this.tileSize);
        }
    }
  }
  
  drawNextBlock() {
    // draw the shadow of the nextPeice if the mouse has moved
    if (mouseData.hasMoved) {
      ctx.fillStyle = board.nextBlock.color;
      for (let point of board.nextBlock.points) {
        ctx.fillRect(
          point.x * board.tileSize + mouseData.x * board.tileSize,
          point.y * board.tileSize + mouseData.y * board.tileSize,
          board.tileSize,
          board.tileSize
        );
      }
    }
  }
}