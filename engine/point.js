/*	Point type
	by Mark Diehr
*/

// Point type
function Point(x, y) {
	this.x = x;
	this.y = y;
}
Point.prototype.add = function (other) {
	return new Point(this.x + other.x, this.y + other.y);
};
Point.prototype.round = function () {
	return new Point(Math.round(this.x), Math.round(this.y));
};
Point.prototype.isEqualTo = function (other) {
	return this.x == other.x && this.y == other.y;
};
Point.prototype.toString = function () {
	return "(" + this.x + "," + this.y + ")";
}
Point.prototype.scale = function(other) {
	return new Point(this.x * other.x, this.y * other.y);
}

// Point constants
var PointLeft  = new Point(-1,  0);
var PointRight = new Point( 1,  0);
var PointUp    = new Point( 0, -1);
var PointDown  = new Point( 0,  1);
