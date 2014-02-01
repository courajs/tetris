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
	if (x instanceof Array)
		tiles = x;
	else {
		var center = new Tile(x,y);
		tiles = [center, new Tile(x+1, y), new Tile(x, y + 1), new Tile(x+1, y+1)];
	}
	this.tiles = tiles;
}
extend_piece(O_Piece, yellow);






T_Piece = function(){

}






pieces = [I_Piece, O_Piece];