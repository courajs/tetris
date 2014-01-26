function Tile(x,y){
	this.x = x;
	this.y = y;
}

Tile.prototype.copy = function(){
	return new Tile(this.x, this.y);
};

Tile.prototype.stick = function(color){
	var cell = board[this.x][this.y];
	cell.color = color;
	cell.solid = true;
}

Tile.prototype.stamp = function(color){
	board[this.x][this.y].color = color;
}

Tile.prototype.clear = function(){
	var cell = board[this.x][this.y];
	cell.color = none;
	cell.solid = false;
}