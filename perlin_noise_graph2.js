var RADIUS = 1;
var COLOR = 'rgb(192,80,77)';
var PERSISTENCE = 1 / 2;
var EXPONENT_OF_FREQ = 7;

var $graph;

function drawBG(ctx) {
    ctx.clearRect(0, 0, $graph.width(), $graph.height());
    ctx.fillStyle = 'rgb(0,0,0)';
    ctx.fillRect(0, 0, $graph.width(), $graph.height());
}

function drawDots(ctx) {
    var graphWidth = $graph.width();
    var graphHeight = $graph.height();
    var perlinNoises = [];

    for (var i = 0;i < EXPONENT_OF_FREQ;i++) {
	perlinNoises[i] = new PerlinNoise();
    }

    ctx.strokeStyle = COLOR;
    ctx.fillStyle = COLOR;
    for (var x = 0;x < graphWidth;x += (RADIUS * 2)) {
	var y = (graphHeight / 2) +
	 sumNoises(perlinNoises, x, graphWidth) * (graphHeight / 2);
	ctx.beginPath();
	ctx.arc(x + RADIUS, y, 2, 0, Math.PI*2, false);
	ctx.fill();
    }
}

function sumNoises(perlinNoises, x, baseWavelength) {
    var result = 0;

    for (var i = 0;i < EXPONENT_OF_FREQ;i++) {
	var amplitude = Math.pow(PERSISTENCE, i);
	var wavelength = baseWavelength / Math.pow(2, i);

	result += perlinNoises[i].noise(
	    x / wavelength) * amplitude;
    }
    return result;
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
