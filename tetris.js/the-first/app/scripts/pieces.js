function I_Piece(x, y){
	var copy_target, tiles, rotation;
	if(x instanceof I_Piece){
		copy_target = x;
		tiles = copy_target.tiles.map(function(tile){
			return tile.copy();
		});
		rotation = copy_target.rotation;
		return new I_Piece(tiles, rotation);
	}
	if (x instanceof Array){
		tiles = x;
		rotation = y;
	}
	else {
		var center = new Tile(x,y);
		tiles = [center, new Tile(x-2, y), new Tile(x-1, y), new Tile(x+1, y)];
		rotation = I_Piece.down;
	}
	this.tiles = tiles;
	this.rotation = rotation;
}
I_Piece.prototype = Object.create(Piece.prototype);
I_Piece.prototype.constructor = I_Piece;
I_Piece.down = 'down';
I_Piece.up = 'up';
I_Piece.prototype.color = cyan;
I_Piece.prototype.rotate = function(){
	var center = this.tiles[0];
	var x = center.x;
	var y = center.y;
	if (this.rotation === I_Piece.down){
		this.tiles = [center, new Tile(x, y - 1), new Tile(x, y - 2), new Tile(x, y - 3)];
		this.rotation = I_Piece.up;
		return;
	}
	if (this.rotation === I_Piece.up){
		this.tiles = [center, new Tile(x-2, y), new Tile(x-1, y), new Tile(x+1, y)];
		this.rotation = I_Piece.down;
		return;
	}
}

O_Piece = function(x, y){
	var copy_target, tiles, rotation;
	if (x instanceof O_Piece){
		copy_target = x;
		tiles = copy_target.tiles.map(function(tile){
			return tile.copy();
		});
		return new O_Piece(tiles);
	}
	if (x instanceof Array)
		tiles = x;
	else {
		var center = new Tile(x,y);
		tiles = [center, new Tile(x+1, y), new Tile(x, y + 1), new Tile(x+1, y+1)];
	}
	this.tiles = tiles;
}
O_Piece.prototype = Object.create(Piece.prototype);
O_Piece.prototype.constructor = O_Piece;
O_Piece.prototype.color = yellow;

pieces = [I_Piece, O_Piece];