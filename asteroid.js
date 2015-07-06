//======================================================================
// Asteroid Entities

var Asteroid = Sprite.extend({
	construct: function(point) {
		this.RegisterComponent(Mover, {vel:new Point(0,0.05)});
		this.RegisterComponent(RemoveOffBottomEdge);
		this.RegisterComponent(Exploder);
		this.RegisterComponent(HP, {hp:8});
		Sprite.construct.call(this, point);
	},

	name: "Asteroid",
	type: "Asteroid",
	owner: "Neutral",
	collisionType: CollisionTypes.enviro,
	
	center: new Point(2,2),
	pattern:
		[" 111 ",
		 "10114",
		 "11149",
		 "11494",
		 " 144 ",],
});

var AsteroidLarge = Asteroid.extend({
	construct: function(point) {
		Asteroid.construct.call(this, point);
		// Replace HP with new amount
		this.GetComponent(HP).hp = 12;
	},

	name: "AsteroidLarge",
	
	center: new Point(3,3),
	pattern:
		["  114  ",
		 " 10104 ",
		 "1010494",
		 "1101944",
		 "1049494",
		 " 19494 ",
		 "  444  ",],
});

var AsteroidSmall = Asteroid.extend({
	construct: function(point) {
		Asteroid.construct.call(this, point);
		// Replace HP with new amount
		this.GetComponent(HP).hp = 4;
	},

	name: "AsteroidSmall",
	
	center: new Point(1,1),
	pattern:
		[" 11 ",
		 "1114",
		 "1144",
		 " 14 ",],
});

var AsteroidSpawner = Sprite.extend({
	construct: function(point) {
		this.RegisterComponent(SpawnerRandom, {rate:160, obj:Asteroid,      spawnArea:new Rect(0, -3, GAME.w, -3)})
		this.RegisterComponent(SpawnerRandom, {rate: 80, obj:AsteroidLarge, spawnArea:new Rect(0, -3, GAME.w, -3)})
		this.RegisterComponent(SpawnerRandom, {rate: 40, obj:AsteroidSmall, spawnArea:new Rect(0, -3, GAME.w, -3)})
		Sprite.construct.call(this, point);
	},

	name: "AsteroidSpawner",
	type: "Spawner",
	owner: "Neutral",
	collisionType: CollisionTypes.none,

	pattern: ["F"],
});