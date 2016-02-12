var RADIUS = 1;
var COLOR = 'rgb(192,80,77)';
var WAVELENGTH = 480;

function drawBG(graph, ctx) {
    ctx.clearRect(0, 0, graph.offsetWidth, graph.offsetHeight);
    ctx.fillStyle = 'rgb(0,0,0)';
    ctx.fillRect(0, 0, graph.offsetWidth, graph.offsetHeight);
}

function drawDots(graph, ctx) {
    var graphWidth = graph.offsetWidth;
    var graphHeight = graph.offsetHeight;
    var perlinNoise = new PerlinNoise();
    var wavelengthField = document.getElementById('wavelengthField');
    var wavelength = wavelengthField.value

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
	ctx.arc(x + RADIUS, y, 2, 0, Math.PI * 2, false);
	ctx.fill();
    }
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
