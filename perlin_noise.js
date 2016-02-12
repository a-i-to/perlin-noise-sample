function PerlinNoise(random) {
    if (random) {
	this._random = random;
    } else {
	this._random = Math.random;
    }
    this._gradient = {};
}

PerlinNoise.prototype._randomGradient = function(x) {
    if (this._gradient[x] || this._gradient[x] === 0) {
	return this._gradient[x];
    }
    var g = this._random() * 2 - 1;
    this._gradient[x] = g;
    return g;
};

PerlinNoise.prototype.noise = function(x) {
    var x0 = Math.floor(x);
    var x1 = x0 + 1;
    var r0 = x - x0;
    var r1 = r0 - 1;

    var u = r0 * this._randomGradient(x0);
    var v = r1 * this._randomGradient(x1);

    var sx = r0 * r0 * (3 - 2 * r0);

    return 2 * (u + sx * (v - u));
};

this.PerlinNoise = PerlinNoise;
