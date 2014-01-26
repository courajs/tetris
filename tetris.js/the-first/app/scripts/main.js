




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

function setSomeGuy(){
	board.random().random().color = colors.random();
}


$tetris.on('click', '.cell', function(event){
	console.log('click');
	$(this).toggleClass('clicked');
})


var handlers = {
	'J': setSomeGuy
}

$(document).on('keydown', function(event){
    var key = vkey[event.keyCode];
    $('#current-key').text(key);
    if (handlers[key]) handlers[key]();
});


var testPiece = new Piece([new Tile(1,1), new Tile(2,1), new Tile(2,2), new Tile(2,3)], blue);
testPiece.stamp();
handlers['<right>'] = function(){
	testPiece.try_right();
};
handlers['<left>'] = function(){
	testPiece.try_left();
}