//======================================================================
// Game pieces - Sprites, etc

//======================================================================
// Effects

// Ship exhaust
var Exhaust = Sprite.extend({
	construct: function(point) {
		this.RegisterComponent(TimedDestructor, {fuse:3});
		this.RegisterComponent(Mover, {vel:new Point(0,1)});
		Sprite.construct.call(this, point);
	},

	name: "Exhaust",
	type: "Effect",
	collisionType: CollisionTypes.none,

	center: new Point(0,0),
	pattern: ["E"],
});

// Laser impact sprite
var LaserExplosion = Sprite.extend({
	construct: function(point) {
		this.RegisterComponent(TimedDestructor, {fuse:2});
		Sprite.construct.call(this, point);
	},

	name: "LaserExplosion",
	type: "Effect",
	collisionType: CollisionTypes.none,

	center: new Point(1,1),
	pattern:
		["F F",
		 " F ",
		 "F F"],
})

// Big explosion
var Explosion = Sprite.extend({
	construct: function(point) {
		this.RegisterComponent(TimedDestructor, {fuse:9});
		Sprite.construct.call(this, point);
	},

	name: "Explosion",
	type: "Effect",
	collisionType: CollisionTypes.none,

	center: new Point(2,2),
	pattern:
		["  6  ",
		 " 1E1 ",
		 "6EFE6",
		 " 1E1 ",
		 "  6  "],
});

//======================================================================
// Projectiles

var LaserShot = Sprite.extend({
	construct: function(point, velocity) {
		this.RegisterComponent(Projectile, {damage:1});
		this.RegisterComponent(Mover, {vel:velocity});
		this.RegisterComponent(RemoveOffTopEdge);
		Sprite.construct.call(this, point);
	},

	name: "LaserShot",
	type: "Projectile",
	owner: "Player",

	pattern: ["D", "8"],
	center: new Point(0,1),

	Deconstruct: function() {
		Sprite.Deconstruct.call(this);

		GAME.Spawn(LaserExplosion, this.point.add(new Point(0,-1)));
	},
});

var EnemyShot = Sprite.extend({
	construct: function(point, velocity) {
		this.RegisterComponent(Projectile, {damage:1});
		this.RegisterComponent(Mover, {vel:velocity});
		this.RegisterComponent(Blinker, {rate:5});
		this.RegisterComponent(RemoveOffBottomEdge);
		Sprite.construct.call(this, point);
	},

	name: "EnemyShot",
	type: "Projectile",
	owner: "Enemy",

	pattern: ["6"],

	Deconstruct: function() {
		Sprite.Deconstruct.call(this);

		GAME.Spawn(LaserExplosion, this.point.add(new Point(0,-1)));
	},
});

var EnemyBomb = Sprite.extend({
	construct: function(point, velocity) {
		this.RegisterComponent(Projectile, {damage:2});
		this.RegisterComponent(Mover, {vel:velocity});
		this.RegisterComponent(Blinker, {rate:5});
		this.RegisterComponent(RemoveOffBottomEdge);
		Sprite.construct.call(this, point);
	},

	name: "EnemyBomb",
	type: "Projectile",
	owner: "Enemy",

	pattern: ["6","6"],

	Deconstruct: function() {
		Sprite.Deconstruct.call(this);

		GAME.Spawn(Explosion, this.point.add(new Point(0,0)));
	},
})