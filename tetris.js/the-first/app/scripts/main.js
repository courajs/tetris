var $tetris = $('#tetris');
var columns = 10;
var rows = 16;
var cell_size = 30;

var board = new Board($tetris, rows, columns, cell_size);


var handlers = {}

$(document).on('keydown', function(event){
    var key = vkey[event.keyCode];
    $('#current-key').text(key);
    if (handlers[key]) handlers[key]();
});

var center = Math.floor(columns / 2);

var new_piece = function(){
	var Piece_Subtype = pieces.random();
	var piece = new Piece_Subtype(center, 0);
	piece.stamp();
	if (! piece.is_valid()) {
		alert('you looooooooose!');
		handlers = {};
	}
	return piece;
}

var test_piece = new new_piece();

handlers['<right>'] = function(){
	test_piece = test_piece.try_right();
};
handlers['<left>'] = function(){
	test_piece = test_piece.try_left();
}
handlers['<down>'] = function(){
	test_piece = test_piece.fall();
	if (test_piece.is_stuck()) {
		test_piece = new_piece();
	}
}
handlers['<up>'] = function(){
	test_piece = test_piece.try_rotate();
}