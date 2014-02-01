function extend_piece(Subtype, color){
	Subtype.prototype = Object.create(Piece.prototype);
	Subtype.prototype.constructor = Subtype;
	Subtype.prototype.color = color;
}



function I_Piece(x, y){
	var tiles, rotation;
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
extend_piece(I_Piece, cyan);
I_Piece.down = 'down';
I_Piece.up = 'up';
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
	var tiles;
	if (x instanceof Array){
		tiles = x;
	} else {
		var center = new Tile(x,y);
		tiles = [
			center,
			new Tile(x+1, y),
			new Tile(x, y + 1),
			new Tile(x+1, y+1)
		];
	}
	this.tiles = tiles;
}
extend_piece(O_Piece, yellow);






T_Piece = function(x, y){
	var tiles;
	if (x instanceof Array){
		tiles = x;
		rotation = y;
	} else {
		var center = new Tile(x,y);
		tiles = [
			center,
			new Tile(x-1, y),
			new Tile(x, y+1),
			new Tile(x+1, y)
		];
		var rotation = T_Piece.down;
	}
	this.tiles = tiles;
	this.rotation = rotation;
}
extend_piece(T_Piece, purple)
T_Piece.up = 'up';
T_Piece.down = 'down';
T_Piece.right = 'right';
T_Piece.left = 'left';
T_Piece.prototype.rotate = function(){
	var center = this.tiles[0];
	var x = center.x;
	var y = center.y;
	var top = new Tile(x, y -1);
	var right = new Tile(x+1, y);
	var bottom = new Tile(x, y+1);
	var left = new Tile(x-1, y);
	switch (this.rotation){
		case T_Piece.up:
			tiles = [center, top, right, bottom];
			rotation = T_Piece.right;
			break;
		case T_Piece.down:
			tiles = [center, top, bottom, left];
			rotation = T_Piece.left;
			break;
		case T_Piece.right:
			tiles = [center, right, bottom, left];
			rotation = T_Piece.down;
			break;
		case T_Piece.left:
			tiles = [center, top, right, left];
			rotation = T_Piece.up;
			break;
		default:
			console.log("didn't match");
	}
	this.tiles = tiles;
	this.rotation = rotation;
}




pieces = [I_Piece, O_Piece, T_Piece];