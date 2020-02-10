var rows, cols;
var w = 20;
var grid = []

function setup() {
  createCanvas(400,400);
  rows = floor(height / w);
  cols = floor(width  / w);
  //background(51);
  console.log(width);
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      grid.push(new Cell(i,j));
    }
  }
}

function draw(){
  background(51);
    for (var i = 0; i < grid.length; i++) {
      grid[i].show();
    }
}

function Cell(i,j){
  this.i = i;
  this.j = j;
  this.border = [true, true, true, true];
}

Cell.prototype.show = function () {
  var x = this.i * w;
  var y = this.j * w;
  noFill();
  stroke(255);
  //rect(x, y, w, w);
  if(this.border[0]){
    line(x      , y    , x + w, y    ); // TOP
  }
  if(this.border[1]){
    line(x + w  , y    , x + w, y + w); // RIGHT
  }
  if(this.border[2]){
    line(x + w  , y + w, x    , y + w); // BOTTOM
  }
  if(this.border[3]){
    line(x      , y + w, x    , y    ); // LEFT
  }
};
