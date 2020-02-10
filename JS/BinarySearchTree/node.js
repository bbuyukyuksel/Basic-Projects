function Node(val) {
  this.left = null;
  this.value = val;
  this.right = null;
  this.x = null;
  this.y = null;
}

Node.prototype.addNode = function (n, parent, iter) {

  if(n.value < this.value){
      if(this.left == null){
        this.left = n;
        this.left.x = this.x - 70;
        this.left.y = this.y + 30;
        //console.log("Value:", this.value, this.x, this.y, iter);
      } else {
        this.left.addNode(n, this, ++iter);
      }
  }
  else if(n.value > this.value) {
    if(this.right == null){
      this.right = n;
      this.right.x = this.x + 70;
      this.right.y = this.y + 30;
      //console.log("Value:", this.value, this.x, this.y, iter);
    }
    else{
      this.right.addNode(n, this, ++iter);
    }
  }
};
var iter = 0;
Node.prototype.visit = function (parent) {
  if(this.left != null){
    this.left.visit(this);
  }

  console.log(this.value);
  fill(255);
  noStroke();
  textAlign(CENTER);
  text(this.value, this.x, this.y+3);
  stroke(128);
  line(parent.x, parent.y-16, this.x, this.y-16);
  noFill();
  ellipse(this.x, this.y, 30, 30);
  if(this.right != null){
    this.right.visit(this);
  }
};

Node.prototype.search = function (val) {
  if(val == this.value){
    return val;
  }
  else if(val < this.value && this.left != null){
    return this.left.search(val);
  }
  else if(val > this.value && this.right != null){
    return this.right.search(val);
  }
  return null;
};
