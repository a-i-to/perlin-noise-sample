var RADIUS = 1;
var COLOR = 'rgb(192,80,77)';
var WAVELENGTH = 480;

var $graph;

function drawBG(ctx) {
    ctx.clearRect(0, 0, $graph.width(), $graph.height());
    ctx.fillStyle = 'rgb(0,0,0)';
    ctx.fillRect(0, 0, $graph.width(), $graph.height());
}

function drawDots(ctx) {
    var graphWidth = $graph.width();
    var graphHeight = $graph.height();
    var perlinNoise = new PerlinNoise();
    var wavelength = $('#wavelengthField').val();    

    if (wavelength) {
	wavelength = Number(wavelength);
    } else {
	wavelength = WAVELENGTH;
    }

    ctx.strokeStyle = COLOR;
    ctx.fillStyle = COLOR;
    for (var x = 0;x < graphWidth;x += (RADIUS * 2)) {
	var y = (graphHeight / 2) + 
	 perlinNoise.noise(x / wavelength) * (graphHeight / 2);
	ctx.beginPath();
	ctx.arc(x + RADIUS, y, 2, 0, Math.PI*2, false);
	ctx.fill();
    }    
}

function draw() {
    var ctx = $graph[0].getContext('2d');
    drawBG(ctx);
    drawDots(ctx);
}

$(document).ready(function() {
    $graph = $('#graph');

    $('#updateButton').click(function() {
	draw();
    });

    draw();
});

