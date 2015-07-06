//======================================================================
// Basic sprite type

var Sprite = GameObject.extend({
	// Base type constructor
	construct: function(point) {
		// Construct base class
		GameObject.construct.call(this);

		this.palette = GAME.palette;
		this.point = new Point(point.x, point.y);
		this.velocity = new Point(0, 0);
		this._setupPicture();
		this._calcRect();
	},

	///////////////////////////
	// Public properties

	name: "SpriteBaseType",
	type: "Sprite",

	// Palette to use for the image
	palette: undefined,
	// This is the image that displays on the screen
	pattern: ["F"],

	point: undefined,
	velocity: undefined,
	center: new Point(0, 0),
	rect: undefined,

	// Is this object allowed to collide with things?
	collisionType: CollisionTypes.none,

	// Move this sprite
	Translate: function(vector) {
		this.velocity.x += vector.x;
		this.velocity.y += vector.y;
	},

	// Reset the velocity and then update the game object
	Update: function(time) {
		// Accumulate the fractional portion
		this.velocity.x = FractionPart(this.velocity.x);
		this.velocity.y = FractionPart(this.velocity.y);
		GameObject.Update.call(this, time);
	},

	// Apply the velocity to the sprite's point location
	PhysicsUpdate: function(time) {
		// Apply only the whole number portion of the velocity
		this.point.x += WholePart(this.velocity.x);
		this.point.y += WholePart(this.velocity.y);

		this._calcRect();
	},

	/////////////////////////////
	// Events that you can override

	// Calculate a rectangle that encloses this sprite
	_calcRect: function() {
		if( this.rect === undefined )
			this.rect = new Rect(0,0,0,0);
		var roundedPoint = this.point.round();
		this.rect.l = roundedPoint.x - this.center.x;
		this.rect.t = roundedPoint.y - this.center.y;
		this.rect.r = this.rect.l + this.w-1;
		this.rect.b = this.rect.t + this.h-1;
	},

	Rect: function() {
		return this.rect;
	},
	
	///////////////////////////
	// Private functions

	_setupPicture: function() {
		this.picture = new Array();
		this.h = this.pattern.length;
		this.w = this.pattern[0].length;
		// Convert to array
		for(var y = 0; y < this.h; y++) {
			for(var x = 0; x < this.w; x++) {
				var letter = this.pattern[y][x];
				var styleIndex = undefined;
				if( letter !== ' ')
					styleIndex = LetterToNumber(letter);
				this.picture.push(styleIndex)
			}
		}
	},
	
	_render: function() {
		this._draw(this.point);
		if(this.PostRender)
			this.PostRender();
	},
	
	_draw: function(point) {
		var point = point.round();
		for(var y = 0; y < this.h; y++) {
			for(var x = 0; x < this.w; x++) {
				var px = point.x+x-this.center.x;
				var py = point.y+y-this.center.y;
				// Boundary check
				if( px >= 0 && px < GAME.w && py >= 0 && py < GAME.h) {
					var style = this.picture[x + y * this.w];
					if( style !== undefined)
						PS.style(px, py, this.palette[style]);
				}
			}
		}
	},
});

