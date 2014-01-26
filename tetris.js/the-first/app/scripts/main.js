function Cell(div){
	this.el = div;
}

Cell.prototype = Object.create(null, {
	color: {
		get: function(){
			return this.el.style.backgroundColor;
		},
		set: function(color){
			this.el.style.backgroundColor = color;
		}
	}
});



$(document).on('keydown', function(event){
    var key = vkey[event.keyCode];
    $('#current-key').text(key);
    if(key == 'J'){
    	setSomeGuy();
    }
});

var $tetris = $('#tetris');

var cells_wide = 300 / 50;
var cells_tall = 400 / 50;

var board = [];


for(var i = 0; i < cells_tall; i++){
	var col = [];
	board.push(col);
	for (var j = 0; j < cells_wide; j++){
		var div = document.createElement('div');
		div.className = 'cell';
		$tetris.append(div);
		var cell = new Cell(div);
		col.push(cell);
	}
}

function setSomeGuy(){
	board.random().random().color = colors.random();
}




$tetris.on('click', '.cell', function(event){
	console.log('click');
	$(this).toggleClass('clicked');
})