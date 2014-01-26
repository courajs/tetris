Array.prototype.random_index = function(){
                var index = Math.floor( Math.random() * this.length);
                if (index === this.length)
                        index -= 1;
                return index;
        }


Array.prototype.random = function(){
        var index = this.random_index();
        return this[index];
}