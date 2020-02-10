var tree;

function setup() {
  createCanvas(1280,740);
  background(51);
  fill(0,255,0);
  text("Binary Search Tree", width /2 - 50, 16);
  var r = floor(random(0,255));
  var g = floor(random(0,255));
  var b = floor(random(0,255));
  console.log(r,g,b);
  fill(r,g,b);
  textAlign(CENTER);
  text("Burak BÜYÜKYÜKSEL", width -100, 18);
  tree = new Tree();
  for(var i=0; i< 10; i++){
    //tree.addValue(Math.floor(Math.random(0,100)));
    var value = Math.floor(Math.random()*100);
    tree.addValue(value);
  }
  tree.visit(tree);
  var result = tree.search(15);
  if(result == null){
    console.log('Not Found!');
  } else{
    console.log(result);
  }
}
