/*

  Author: GlitchedGoose()

*/

function setup() {
  // initialize globals variables
  width = canvas.width = cols * tileSize;
  height = canvas.height = rows * tileSize;
  board = new Board();
  board.nextBlock = new Block( blockConstructor.getRandomPeiceType() );

  // listeners
  document.addEventListener("mousemove", event => mouseData.update(event));
  canvas.addEventListener("mouseup", event => {
    // check if the atblockConstructorted block placement is a valid position
    for (let point of board.nextBlock.points) {
      
      let y = mouseData.y + point.y;
      let x = mouseData.x + point.x;
      
      if (board.map[y][x] > 0) return;
    }
    
    // add the block if it is valid
    board.addPeice( mouseData.x, mouseData.y, board.nextBlock );
    
    // select a new peice to be added next
    board.nextBlock = new Block( blockConstructor.getRandomPeiceType() );
  });
}

function loop() {
  // clear the screen
  ctx.clearRect(0, 0, width, height);
  
  board.update();
  board.drawBlocks();
  board.drawNextPiece();
  board.drawGridLines();
  
  requestAnimationFrame(loop);
}