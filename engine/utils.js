/*
Terrarium program from http://eloquentjavascript.net/chapter8.html
Ported to Perlenspiel by Mark Diehr
*/

function clone(object) {
	function OneShotConstructor() {}
	OneShotConstructor.prototype = object;
	return new OneShotConstructor();
}

function randBetween(lo, hi) {
	range = hi - lo + 1;
	var value = Math.floor(Math.random() * range);
	return value + lo;
}

PS.style = function(x, y, style) {
	if( typeof style !== "object" )
		throw new Error( "Style was invalid: " + style );
	ApplyStyle(x, y, style);
};

// Bead Style
function ApplyStyle(x, y, style) {
	if( typeof style.color !== "undefined" )
		PS.color(x, y, style.color);
	if( typeof style.alpha !== "undefined" )
		PS.alpha(x, y, style.alpha);
	if( typeof style.fade !== "undefined" )
		PS.fade(x, y, style.fade);
	if( typeof style.scale !== "undefined" )
		PS.scale(x, y, style.scale);
	if( typeof style.radius !== "undefined" )
		PS.radius(x, y, style.radius);
	if( typeof style.data !== "undefined" )
		PS.data(x, y, style.data);
	if( typeof typeof style.exec === "function" )
		PS.exec(x, y, style.exec);
	if( typeof style.visible !== "undefined" )
		PS.visible(x, y, style.visible);
	if( typeof style.active !== "undefined" )
		PS.active(x, y, style.active);
	
	if( typeof style.border !== "undefined" )
		PS.border(x, y, style.border);
	if( typeof style.borderColor !== "undefined" )
		PS.borderColor(x, y, style.borderColor);
	if( typeof style.borderAlpha !== "undefined" )
		PS.borderAlpha(x, y, style.borderAlpha);
	if( typeof style.borderFade !== "undefined" )
		PS.borderFade(x, y, style.borderFade);
	
	if( typeof style.glyph !== "undefined" )
		PS.glyph(x, y, style.glyph);
	if( typeof style.glyphColor !== "undefined" )
		PS.glyphColor(x, y, style.glyphColor);
	if( typeof style.glyphAlpha !== "undefined" )
		PS.glyphAlpha(x, y, style.glyphAlpha);
	if( typeof style.glyphScale !== "undefined" )
		PS.glyphScale(x, y, style.glyphScale);
	if( typeof style.glyphFade !== "undefined" )
		PS.glyphFade(x, y, style.glyphFade);
}

// Runs a function for each item inside of an array
function forEach(array, action) {
	for (var i = 0; i < array.length; i++)
		action(array[i]);
}

// Runs a function for each item inside of an object
function forEachIn(object, action) {
	for (var property in object) {
		if (Object.prototype.hasOwnProperty.call(object, property))
			action(property, object[property]);
	}
}

function randomElement(array) {
	if (array.length == 0)
		throw new Error("The array is empty.");
	return array[Math.floor(Math.random() * array.length)];
}

// Dictionary type
function Dictionary(startValues) {
	this.values = startValues || {};
}
Dictionary.prototype.store = function (name, value) {
	this.values[name] = value;
};
Dictionary.prototype.lookup = function (name) {
	return this.values[name];
};
Dictionary.prototype.contains = function (name) {
	return Object.prototype.hasOwnProperty.call(this.values, name) &&
		Object.prototype.propertyIsEnumerable.call(this.values, name);
};
Dictionary.prototype.each = function (action) {
	forEachIn(this.values, action);
};
Dictionary.prototype.names = function () {
	var names = [];
	this.each(function (name, value) {
		names.push(name);
	});
	return names;
};

// Object inheritance
Object.prototype.create = function() {
  var object = clone(this);
  if (typeof object.construct == "function")
    object.construct.apply(object, arguments);
  return object;
};

Object.prototype.extend = function(properties) {
  var result = clone(this);
  forEachIn(properties, function(name, value) {
    result[name] = value;
  });
  return result;
};

// Bind a function to an object
function bind(func, object) {
	return function () {
		return func.apply(object, arguments);
	};
}

// Another way to bind that uses a string
function method(object, name) {
	return function () {
		return object[name].apply(object, arguments);
	};
}

// Converts a letter to the corresponding number (use hex)
var LetterToNumber = function (letter) {
    return parseInt('0x' + letter);
}

var WholePart = function (number) {
	if( number > 0 )
		return Math.floor(number);
	else
		return Math.ceil(number);
}

var FractionPart = function (number) {
	return number - WholePart(number);
}