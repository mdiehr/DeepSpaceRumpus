//======================================================================
// Behavioral components

var Mover = Component.extend({
	name: "Mover",
	vel: new Point(0, 0),
	Update: function(time) {
		this.parent.Translate(this.vel);
	},
});

var TimedDestructor = Component.extend({
	name: "TimedDestructor",
	fuse: 10,
	Update: function(time) {
		if( this.fuse-- <= 0 )
			this.parent.Destroy();
	},
});

var Exploder = Component.extend({
	name: "Exploder",
	Deconstruct: function() {
		GAME.sounds.play("Explode");
		GAME.Spawn(Explosion, this.parent.point);
	}
})

var ShooterRandom = Component.extend({
	name: "ShooterRandom",
	vel: new Point(0, 1),
	rate: 10,
	chance: 10,
	obj: undefined,
	Update: function(time) {
		if( this.obj && time % this.rate === 0 && randBetween(1,this.chance) == 1 )
			GAME.Spawn(this.obj, this.parent.point, this.vel);
	}
})

var SpawnerRandom = Component.extend({
	name: "SpawnerRandom",
	rate: 30,
	chance: 2,
	obj: undefined,
	spawnArea: new Rect(0, 0, 0, 0),
	Update: function(time) {
		if( this.obj && time % this.rate === 0 && randBetween(1,this.chance) == 1 ) {
			var a = this.spawnArea;
			var spawnPoint = new Point(randBetween(a.l, a.r), randBetween(a.t, a.b));
			GAME.Spawn(this.obj, spawnPoint);
		}
	}
})

var ContainsObject = Component.extend({
	name: "ContainsObject",
	chance: 1,	// 1 in X chance
	obj: undefined,
	Deconstruct: function() {
		if( this.obj && randBetween(1, this.chance) == 1 ) {
			GAME.Spawn(this.obj, this.parent.point);
		}
	}
})

var SoundOnSpawn = Component.extend({
	name: "SoundOnSpawn",
	sound: "Spawning",
	Spawn: function(owner) {
		GAME.sounds.play(this.sound);
	},
});

var RemoveOffBottomEdge = Component.extend({
	name: "RemoveOffBottomEdge",
	Update: function(time) {
		var rect = this.parent.Rect();
		if( rect.t >= GAME.h ) {
			this.parent.Remove();
		}
	},
});

var RemoveOffTopEdge = Component.extend({
	name: "RemoveOffTopEdge",
	Update: function(time) {
		var rect = this.parent.Rect();
		if( rect.b < 0 ) {
			this.parent.Remove();
		}
	},
});

var WrapLeft = Component.extend({
	name: "WrapLeft",
	Update: function(time) {
		var rect = this.parent.Rect();
		if( rect.r < 0 ) {
			this.parent.Translate(new Point(GAME.w + this.parent.w, 0));
		}
	},
});

// For manual control - also keeps the object inside of the playing area
var ArrowKeyMover = Component.extend({
	name: "ArrowKeyMover",
	vel: new Point(1, 1),
	left: PS.KEY_ARROW_LEFT,
	right: PS.KEY_ARROW_RIGHT,
	up: PS.KEY_ARROW_UP,
	down: PS.KEY_ARROW_DOWN,
	Update: function(time) {
		if( GAME.KeyDown(this.left) ) {
			this.parent.Translate( PointLeft.scale(this.vel) );
		}
		if( GAME.KeyDown(this.right) ) {
			this.parent.Translate( PointRight.scale(this.vel) );
		}
		if( GAME.KeyDown(this.up) ) {
			this.parent.Translate( PointUp.scale(this.vel) );
		}
		if( GAME.KeyDown(this.down) ) {
			this.parent.Translate( PointDown.scale(this.vel) );
		}
		// Constrain to the play area
		var a = this.parent.Rect();
		var b = GAME.Rect();
		var v = this.parent.velocity;
		if( a.l + v.x < b.l ) {
			this.parent.Translate(new Point(b.l-(a.l+v.x), 0) );
		}
		if( a.r + v.x > b.r ) {
			this.parent.Translate(new Point(b.r-(a.r+v.x), 0) );
		}
		if( a.t + v.y < b.t ) {
			this.parent.Translate(new Point(0, b.t-(a.t+v.y)) );
		}
		if( a.b + v.y > b.b ) {
			this.parent.Translate(new Point(0, b.b-(a.b+v.y)) );
		}
	},
});

var WASDKeyMover = ArrowKeyMover.extend({
	name: "WASDKeyMover",
	vel: new Point(1, 1),
	left:  'a'.charCodeAt(0),
	right: 'd'.charCodeAt(0),
	up:    'w'.charCodeAt(0),
	down:  's'.charCodeAt(0),
});

var Projectile = Component.extend({
	name: "Projectile",
	damage: 1,
	Collide: function(other) {
		// Don't collide with parent
		if( this.parent === other )
			return;

		// Require different owners
		if( this.owner === other.owner )
			return;

		if( other.TakeDamage ) {
			other.TakeDamage(this.parent, this.damage);
			GAME.sounds.play("Impact");
			this.parent.Destroy();
		}
	},
});

var HP = Component.extend({
	name: "HP",
	hp: 10,
	Spawn: function(parent) {
		var me = this;
		this._Provide("TakeDamage", function(other, damage) {
			me.hp -= damage;
			if( me.hp <= 0 ) {
				me.parent.Destroy();
			}
		})
	},
});
