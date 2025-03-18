/*

  Author: GlitchedGoose()

*/

function setup() {
  // initialize globals variables
  width = canvas.width = 15 * 35;
  height = canvas.height= 15 * 35;
  board = new Board();
  board.nextBlock = new Block( temp.getRandomPeiceType() );

  // listeners
  canvas.addEventListener("mousemove", event => mouseData.update(event));
  canvas.addEventListener("mouseup", event => {
    // check if the attempted block placement is a valid position
    for (let point of board.nextBlock.points) {
      
      let y = mouseData.y + point.y;
      let x = mouseData.x + point.x;
      
      if (y < 0 || y >= board.colCount || x < 0 || x >= board.rowCount || board.map[y][x] > 0) return;
    }
    
    // add the block if it is valid
    board.addPeice( mouseData.x, mouseData.y, board.nextBlock );
    
    // select a new peice to be added next
    board.nextBlock = new Block( temp.getRandomPeiceType() );
  });
}

function loop() {
  // clear the screen
  ctx.clearRect(0, 0, width, height);
  
  // draw the next shape shadow
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
  
  board.update();
  board.draw();
  
  requestAnimationFrame(loop);
}