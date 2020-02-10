function Tree(){
  this.root = null;
}

Tree.prototype.addValue = function (val, parent, iter = 1) {
  var n = new Node(val);
  if(this.root == null){
    this.root = n;
    this.root.x = width /2;
    this.root.y = 40;
  }
  else{
    if(parent != null){
      this.root.addNode(n, parent, ++iter);
    }
    else{
      this.root.addNode(n, null, ++iter);
    }
  }
};

Tree.prototype.visit = function () {
  if(this.root != null){
    this.root.visit(this);
  }
};

Tree.prototype.search = function (val) {
  return this.root.search(val);
};
