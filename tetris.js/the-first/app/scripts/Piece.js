function Piece(tiles, color){
	this.tiles = tiles;
	this.color = color;
	this.stuck = false;
}

Piece.prototype.copy = function(){
	var tiles = this.tiles.map(function(tile){
		return tile.copy();
	});
	return new this.constructor(tiles, this.color);
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
	console.assert(!this.stuck, 'Calling try_right on an already stuck piece');
	var righter = this.copy();
	righter.move_right();
	if (righter.is_valid()){
		this.clear();
		this.tiles = righter.tiles;
		this.stamp();
	}
}

Piece.prototype.try_left = function(){
	console.assert(!this.stuck, 'Calling try_left on an already stuck piece');
	var lefter = this.copy();
	lefter.move_left();
	if (lefter.is_valid()){
		this.clear();
		this.tiles = lefter.tiles;
		this.stamp();
	}
}

Piece.prototype.fall = function(){
	console.assert(!this.stuck, 'Calling fall on an already stuck piece');
	var downer = this.copy();
	downer.move_down();
	if (downer.is_valid()){
		this.clear();
		this.tiles = downer.tiles;
		this.stamp();
		return true;
	}
	else {
		this.stick();
		return false;
	}
}



Piece.prototype.stick = function(){
	console.assert(this.is_valid(), 'Trying to stick an invalid piece');
	console.assert(!this.stuck, 'You already stuck this piece!');
	var color = this.color;
	this.tiles.forEach(function(tile){
		tile.stick(color);
	});
	this.stuck = true;
};

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