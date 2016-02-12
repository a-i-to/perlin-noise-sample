var RADIUS = 1;
var COLOR = 'rgb(192,80,77)';
var PERSISTENCE = 1 / 2;
var EXPONENT_OF_FREQ = 7;

function drawBG(graph, ctx) {
    ctx.clearRect(0, 0, graph.offsetWidth, graph.offsetHeight);
    ctx.fillStyle = 'rgb(0,0,0)';
    ctx.fillRect(0, 0, graph.offsetWidth, graph.offsetHeight);
}

function drawDots(graph, ctx) {
    var graphWidth = graph.offsetWidth;
    var graphHeight = graph.offsetHeight;
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

function draw(graph) {
    var ctx = graph.getContext('2d');
    drawBG(graph, ctx);
    drawDots(graph, ctx);
}

function main() {
    var graph = document.getElementById('graph');
    var button = document.getElementById('updateButton');

    button.addEventListener('click', function() {
        draw(graph);
    });
    draw(graph);
}

if (document.readyState != 'loading') {
    main();
} else {
    document.addEventListener('DOMContentLoaded', main);
}
