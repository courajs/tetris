function Piece(tiles, color){
	if (tiles instanceof Piece) {
		var copy_target = tiles;
		color = copy_target.color;
		tiles = copy_target.tiles.map(function(tile){
			return tile.copy();
		});
		return new Piece(tiles, color);
	}
	this.tiles = tiles;
	this.color = color;
	this.stuck = false;
}

Piece.prototype.copy = function(){
	return new this.constructor(this);
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

Piece.prototype.try_right = function(){
	if(this.stuck) throw 'Calling right on an already stuck piece'
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
	if (this.stuck) throw 'Calling left on an already stuck piece';
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
	if (this.stuck) throw 'Calling rotate on an already stuck piece';
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
	if (this.stuck) throw 'Calling fall on an already stuck piece';
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
