function Board($el, rows, columns, cell_size){
	var width = columns * cell_size + 2;
	var height = rows * cell_size + 2;
	$el.height(height).width(width);
	
	for (var i = 0; i < columns; i++){
		this.push([]);
	}

	for(var i = 0; i < rows; i++){
		for (var j = 0; j < columns; j++){
			var div = document.createElement('div');
			div.className = 'cell';
			$el.append(div);
			var cell = new Cell(div);
			this[j][i] = cell;
		}
	}
}

Board.prototype = Object.create(Array.prototype);
Board.prototype.constructor = Board;


Board.prototype.clear = function(){
	this.forEach(function(column){
		column.forEach(function(cell){
			cell.clear();
		})
	})
}