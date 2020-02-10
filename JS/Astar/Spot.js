function Spot(i, j) {
  
  this.i = i;
  this.j = j;

  this.f = 0; // f(n) = hesaplama yapan sezgisel (heuristic) fonksiyon.
  this.h = 0; // h(n) = Mevcut düğümden hedef düğüme varmak için tahmin edilen mesafe.
  this.g = 0; // g(n) = Başlangıç düğümünden mevcut düğüme kadar gelmenin maliyeti
  this.neighbors = [];
  this.parent = undefined;
  this.wall = false;

  //if (random() < random()){
  if (random() < 0.4) {
    this.wall = true;
  }

  this.show = function (color) {
    i = this.i;
    j = this.j
    fill(color);
    if (this.wall == true) {
      fill(0);
    }
    noStroke();
    rect(i*w, j*h, w-1, h-1);
    fill(0);
    var formattedNumber = ("0" + this.f).slice(-2);
    //console.log("this.G : " + this.g);
    textSize(w/2);
    text(formattedNumber, (i*w) + floor(w/3), (j*h) + floor(h/2));
  }



  this.addNeighbors = function (grid, diagonal=false) {
    this.i = i;
    this.j = j;
    if (i < cols - 1) {
      this.neighbors.push(grid[i+1][j]);
    } else{
      //console.log('1',i+1, j, "eklenemedi!");
    }
    if (i > 0) {
      this.neighbors.push(grid[i-1][j]);
    } else {
      // /console.log('2',i-1, j, "eklenemedi!");
    }
    if (j < rows - 1) {
      this.neighbors.push(grid[i][j+1]);
    } else {
      //console.log('3',i, j +1, "eklenemedi!");
    }
    if (j > 0) {
      this.neighbors.push(grid[i][j-1]);
    } else{
      //console.log('4',i, j -1, "eklenemedi!");
    }

	
    // Köşelerde de çözüm ara
    if (diagonal === true) {
      if(i > 0 && j > 0){
        this.neighbors.push(grid[i-1][j-1]); // Sol-Üst Köşe [col-1][row-1]
      }
      if(i > 0 && j < rows - 1){
        this.neighbors.push(grid[i-1][j+1]); // Sol-Alt Köşe [col-1][row+1]
      }
      if(i < cols -1 && j > 0){
        this.neighbors.push(grid[i+1][j-1]); // Sağ-Üst Köşe [col+1][row-1]
      }
      if(i < cols -1 && j < rows - 1){
        this.neighbors.push(grid[i+1][j+1]); // Sağ-Alt Köşe [col+1][row-1]
      }
    }
	


  }
}

Spot.prototype.showNeighbors = function () {
  for(var i=0; i<this.neighbors.length; i++) {
    if(this.neighbors[i]) {
      this.neighbors[i].show(color(255,255,0));
    }
  }
};
