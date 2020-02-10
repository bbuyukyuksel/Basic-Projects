
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function removeFromArray(element, list) {
  for(var i = list.length - 1; i >= 0; i--){
    if(element === list[i]){
      list.splice(i,1);
    }
  }
}

function heuristic(a, b) {
  var d = dist(a.i, a.j, b.i, b.j);
  return d;
}

var cols = 30;
var rows = 30;
var grid = new Array(cols);

let w;
let h;

let openSet = [];
let closedSet = [];
let start = undefined;
let end = undefined;
let current;

let solutionPath = undefined;

function setup() {
  createCanvas(400, 400);
  console.log('A*');
  w = width / cols;
  h = height / rows;



  // i : column iterasyonu
  // j : rows   iterasyonu

  // 2 boyutlu array oluştur.
  for (var i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
  }


  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j] = new Spot(i,j);
    }
  }
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].addNeighbors(grid, diagonal=true);
    }
  }



  start = grid[0][0];
  end = grid[cols-1][rows-1];

  start.wall = false;
  end.wall = false;
  openSet.push(start);


}
function draw() {
  background(128);
  //if(mouseIsPressed){
  //  console.log("Pressed: ", mouseEvent, "MouseX: ", mouseX, "MouseY: ", mouseY);
  //}
  if (openSet.length > 0){
    // we can keep going
    let winner = 0;
    // Open List içerisinde en düşük maliyet değerine sahip elemanı bul.
    for(var i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[winner].f) {
        winner = i;
      }
    }
    current = openSet[winner];

    if (current === end){
      // Eğer ki kazanan eleman end değeriyse arama tamamlanmıştır.
      console.log("Solution is done!");
      noLoop();
    }
    //openSet.remove(current); //JS'de bu fonksiyon olmadığından elle yazılacaktır.
    removeFromArray(current, openSet);
    closedSet.push(current);

    var neighbors = current.neighbors;
    for(var i = 0; i < neighbors.length; i++) {
      var neighbor = neighbors[i];
      neighbor.show(color(0,255,255,50));

      if(!closedSet.includes(neighbor) && !neighbor.wall) {
        // Eğer ki şuanki komşu closed set içerisinde yer almıyorsa maliyet fonksiyonunu yeniden hesapla
        //var tempG = current.g + 1;
        var distanceCurrentNeighbor = dist(current.i, current.j, neighbor.i, neighbor.j);
        var tempG = current.g + distanceCurrentNeighbor;
        //console.log("tempG distance : " + distanceCurrentNeighbor);

        var newPath = false;
        if (openSet.includes(neighbor)) {
          // Komşu openSet içerisinde ise ve yeni hesaplanan maliyet değeri, var olana göre daha düşükse güncelle.
          if (tempG < neighbor.g) {
            neighbor.g = tempG;
            newPath = true;
          }
        } else {
          // Eğer ki openSet'te bu komşu yer almıyorsa, hesaplanan maliyet fonksiyonunu ata ve openSet içerisinde al
          neighbor.g = tempG;
          newPath = true;
          openSet.push(neighbor);
        }

        if(newPath === true){
          neighbor.h = heuristic(neighbor, end);
          neighbor.f = neighbor.h + neighbor.g;
          neighbor.parent = current;
        }
      }
    }

  } else{
    // no solution
    console.log("There is no solution!");
    noLoop();

  }

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].show(color(255,255,255));
    }
  }

  for(var i= 0; i < closedSet.length; i++) {
    closedSet[i].show(color(255,0,0));
  }

  for(var i= 0; i < openSet.length; i++) {
    openSet[i].show(color(0,255,0));
  }


  end.show(color(0,255,0,40));
  current.show(color(0,0,0,70));

  // Şuanki solution path'i hesapla.
  solutionPath = [];
  var temp = current;
  solutionPath.push(current);
  while(temp.parent){
    solutionPath.push(temp.parent);
    temp = temp.parent;
  }

  // Solution Path'i çizdir
  if(solutionPath) {
    for(var i = solutionPath.length -1; i >= 0; i--) {
      solutionPath[i].show(color(0,0,255));
    }
  }
  //frameRate(1);



}
