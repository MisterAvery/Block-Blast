/*

  Author: GlitchedGoose()

*/

function setup() {
  // initialize globals variables
  width = canvas.width = cols * tileSize;
  height = canvas.height = rows * tileSize;
  board = new Board();

  // listeners
  document.addEventListener("mousemove", event => mouseData.update(event));
  canvas.addEventListener("mouseup", event => {
    // check if the block placement is a valid position
    for (let point of board.nextBlock.points) {
      
      let y = mouseData.y + point.y;
      let x = mouseData.x + point.x;
      
      if (board.map[y][x] > 0) return;
    }
    
    // add the block if it is valid
    board.addPeice( mouseData.x, mouseData.y, board.nextBlock );

    // select a new peice to be added next
    for (let i = 0; i < 3; i++) {
      if (board.nextBlocks[i]) board.setNextBlock(i);
    }
  });
}

function loop() {
  // clear the screen
  ctx.clearRect(0, 0, width, height);
  
  board.nextBlocks.forEach((block, i) => {
    let context = pieceSelectorCtxs[i];
    
    if (!block) {
      context.clearRect(0, 0, 99, 99);
      return;
    }
    
    context.fillStyle = block.color;
    // draw the tile to the screen
    for (let point of block.points) {
      let tileSize = Math.min(
        20,
        80/Math.max(block.bluePrint.length, block.bluePrint[0].length)
      );
      let yOffset = (99 - block.bluePrint.length * tileSize) / 2;
      let xOffset = (99 - block.bluePrint[0].length * tileSize) / 2;
      
      context.fillRect(point.x * tileSize + xOffset, point.y * tileSize + yOffset, tileSize, tileSize);
      context.lineWidth = 0.5;
      context.strokeRect(point.x * tileSize + xOffset, point.y * tileSize + yOffset, tileSize, tileSize);
    }
  });
  
  board.update();
  board.drawBlocks();
  board.drawNextBlock();
  board.drawGridLines();
  
  requestAnimationFrame(loop);
}