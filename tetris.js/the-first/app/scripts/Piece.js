function Piece(tiles){
	this.tiles = tiles;
	this.stuck = false;
}

Piece.prototype.copy = function(){
	var tiles = this.tiles.map(function(tile){return tile.copy();});
	var rotation = this.rotation
	return new this.constructor(tiles, rotation);
}

Piece.prototype.is_valid = function(){
	return this.tiles.every(function(tile){
		var valid_x = tile.x in board;
		if (!valid_x) return false;

		var valid_y = tile.y in board[0];
		if(!valid_y) return false;

		var spot_occupied = board[tile.x][tile.y].solid;
		return !spot_occupied;
	});
}

Piece.prototype.move_down = function(){
	this.tiles.forEach(function(tile){
		tile.y += 1;
	});
}

Piece.prototype.move_right = function(){
	this.tiles.forEach(function(tile){
		tile.x += 1;
	});
}

Piece.prototype.move_left = function(){
	this.tiles.forEach(function(tile){
		tile.x -= 1;
	});
}

Piece.prototype.rotate = function(){};

Piece.prototype.try_right = function(){
	var right = this.copy();
	right.move_right();
	if (right.is_valid()){
		this.clear();
		right.stamp();
		return right;
	}
	return this;
}

Piece.prototype.try_left = function(){
	var lefter = this.copy();
	lefter.move_left();
	if (lefter.is_valid()){
		this.clear();
		lefter.stamp();
		return lefter;
	}
	return this;
}

Piece.prototype.try_rotate = function(){
	var rotated = this.copy();
	rotated.rotate();
	if (rotated.is_valid()){
		this.clear();
		rotated.stamp();
		return rotated;
	}
	return this;
}

Piece.prototype.fall = function(){
	var down = this.copy();
	down.move_down();
	if (down.is_valid()){
		this.clear();
		down.stamp();
		return down;
	}
	else {
		return this.stick();
	}
}


Piece.prototype.stamp = function(){
	var color = this.color;
	this.tiles.forEach(function(tile){
		tile.stamp(color);
	})
}

Piece.prototype.clear = function(){
	this.tiles.forEach(function(tile){
		tile.clear();
	});
}

Piece.prototype.stick = function(){
	if (!this.is_valid()) throw 'Trying to stick an invalid piece';
	var color = this.color;
	this.tiles.forEach(function(tile){
		tile.stick(color);
	});
	return new Stuck();
};

Piece.prototype.is_stuck = function(){
	return false;
}


function Stuck(){}

function sorry(){
	throw "You can't act on a stuck piece!";
}

Object.keys(Piece.prototype).forEach(function(method_name){
	Stuck.prototype[method_name] = sorry;
});

Stuck.prototype.is_stuck = function(){
	return true;
}
