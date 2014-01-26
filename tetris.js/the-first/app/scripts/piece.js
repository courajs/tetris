function Piece(tiles, color){
	this.tiles = tiles;
	this.color = color;
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

Piece.prototype.stick = function(){
	console.assert(this.is_valid(), 'Trying to stick an invalid piece');
	var color = this.color;
	this.tiles.forEach(function(tile){
		tile.stick(color);
	});
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