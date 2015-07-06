//======================================================================
// Entities for testing

var Blinker = Component.extend({
	name: "Blinker",
	rate : 3,
	on : false,
	blinkColor : 0xFFFFFF,

	// Called once per frame
	Update: function(time) {
		if( time % this.rate == 0 ) {
			this.on = !this.on;
		}
	},

	// Draw glyphs over this sprite to show which colors were used
	PostRender: function() {
		if( this.on ) {
			var point = this.parent.point.round();
			var center = this.parent.center;
			var w = this.parent.w;
			var h = this.parent.h;
			var picture = this.parent.picture;

			for(var y = 0; y < h; y++) {
				for(var x = 0; x < w; x++) {
					var dx = point.x+x-center.x;
					var dy = point.y+y-center.y;
					// Boundary check
					if( dx >= 0 && dx < GAME.w && dy >= 0 && dy < GAME.h) {
						var style = picture[x + y * w];
						if( style !== undefined)
							PS.style(dx, dy, {color: this.blinkColor});
					}
				}
			}
		}
	},
});

var TestComponent = Component.extend({
	name: "TestComponent",
	
	// Called once per frame
	Update: function(time) { },

	// When the component is initialized
	Spawn: function(parent) {
		//PS.debug(parent.name + " spawned with a test component.\n");
	},

	// After the component (or parent object) is destroyed
	Deconstruct: function() { },

	// When the parent object touches another object
	Collide: function(other) { },

	// When the component is triggered (say, by a player)
	Trigger: function(other) { },

	// Draw glyphs over this sprite to show which colors were used
	PostRender: function() {
		var point = this.parent.point.round();
		var center = this.parent.center;
		var w = this.parent.w;
		var h = this.parent.h;
		var pattern = this.parent.pattern;

		for(var y = 0; y < h; y++) {
			for(var x = 0; x < w; x++) {
				var dx = point.x+x-center.x;
				var dy = point.y+y-center.y;
				// Boundary check
				if( dx >= 0 && dx < GAME.w && dy >= 0 && dy < GAME.h) {
					var letter = pattern[y][x];
					PS.glyph(dx, dy, letter)
				}
			}
		}
	},
});

//======================================================================
// TestSprite
var TestSprite = Sprite.extend({
	construct: function(point) {
		this.RegisterComponent(TestComponent);
		this.RegisterComponent(HP, {hp:100});
		this.RegisterComponent(WASDKeyMover, {vel:new Point(0.5, 0.5)});
		Sprite.construct.call(this, point);
	},

	name: "TestSprite",
	owner: "Test",
	collisionType: CollisionTypes.solid,
	pattern:
		["0123",
		 "4567",
		 "89AB",
		 "CDEF"],
});
