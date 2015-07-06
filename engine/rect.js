/*	Rect Type
	by Mark Diehr
*/

// Rectangle type
function Rect(l, t, r, b) {
	this.l = l;
	this.t = t;
	this.r = r;
	this.b = b;
}
// Returns true if the rectangles overlap
Rect.prototype.overlap = function(other) {
	return !(other.l > this.r || other.r < this.l || other.t > this.b || other.b < this.t);
}
// Returns a rectangle that is the intersection of two rectangles (the section where they overlap)
Rect.prototype.intersection = function(other) {
	var l = Math.max(this.l, other.l);
	var t = Math.max(this.t, other.t);
	var r = Math.min(this.r, other.r);
	var b = Math.min(this.b, other.b);
	return new Rect(l, t, r, b);
}
// Are two rectangles equivalent?
Rect.prototype.isEqualTo = function(other) {
	return (this.l == other.l && this.r == other.r && this.t == other.t && this.b == other.b);
}
// Convert to string for printouts
Rect.prototype.toString = function() {
	return "(" + this.l + "," + this.t + "," + this.r + "," + this.b + ")";
}
Rect.prototype.width = function() {
	return this.l - this.r + 1;
}
Rect.prototype.height = function() {
	return this.t - this.b + 1;
}
Rect.prototype.slide = function(point) {
	return new Rect(this.l + point.x,  this.t + point.y, this.r + point.x, this.b + point.y);
}