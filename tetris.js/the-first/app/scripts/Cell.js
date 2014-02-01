function Cell(div){
	this.el = div;
	this.solid = false;
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

Cell.prototype.clear = function(){
	this.color = none;
	this.solid = false;
}