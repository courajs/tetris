var $tetris = $('#tetris');

var columns = 300 / 50;
var rows = 400 / 50;

var board = [];
for (var i = 0; i < columns; i++){
	board.push([]);
}

for(var i = 0; i < rows; i++){
	for (var j = 0; j < columns; j++){
		var div = document.createElement('div');
		div.className = 'cell';
		$tetris.append(div);
		var cell = new Cell(div);
		board[j][i] = cell;
	}
}

var handlers = {}

$(document).on('keydown', function(event){
    var key = vkey[event.keyCode];
    $('#current-key').text(key);
    if (handlers[key]) handlers[key]();
});


var test_piece = new Piece([new Tile(1,1), new Tile(2,1), new Tile(2,2), new Tile(2,3)], blue);
test_piece.stamp();
handlers['<right>'] = function(){
	test_piece.try_right();
};
handlers['<left>'] = function(){
	test_piece.try_left();
}
handlers['<down>'] = function(){
	test_piece.fall();
}