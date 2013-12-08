var canvas = document.getElementById('tetris');
var ctx = canvas.getContext('2d');
ctx.fillStyle = 'rgb(200,0,0)';
ctx.fillRect(10, 10, 55, 50);
 
ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
ctx.fillRect(30, 30, 55, 50);

$(document).on('keydown', function(event){
    var key = vkey[event.keyCode];
    $('#current-key').text(key);
});