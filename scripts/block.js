/*

  Author: GlitchedGoose()

*/

let temp = {
  "right-flank": function() {
    return [
      new Point(0, 0),
      new Point(0, 1),
      new Point(1, 1),
      new Point(2, 1)
    ]},
    
  "left-flank": function() {
    return [
      new Point(2, 0),
      new Point(2, 1),
      new Point(1, 1),
      new Point(0, 1)
    ]},
    
  "horizontal-line": function() {
    return [
      new Point(0, 0),
      new Point(1, 0),
      new Point(2, 0),
      new Point(3, 0),
      new Point(4, 0)
    ]},
    
  "vertical-line": function() {
    return [
      new Point(0, 0),
      new Point(0, 1),
      new Point(0, 2),
      new Point(0, 3),
      new Point(0, 4)
    ]},
};

class Block {
  constructor(type) {
    this.points = temp[type]();
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
        // console.log(this.points);
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