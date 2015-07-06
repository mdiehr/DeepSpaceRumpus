//======================================================================
// Enemy Entities

var SideEnemy = Sprite.extend({
	construct: function(point) {
		this.RegisterComponent(Mover, {vel:new Point(-0.25,0)});
		this.RegisterComponent(WrapLeft);
		this.RegisterComponent(Exploder);
		this.RegisterComponent(ContainsObject, {chance:3, obj: UpgradeShot});
		this.RegisterComponent(HP, {hp:3});
		this.RegisterComponent(ShooterRandom, {obj:EnemyBomb, rate:60, vel:new Point(0, .1)});
		Sprite.construct.call(this, point);
	},

	name: "SideEnemy",
	type: "Enemy",
	owner: "Enemy",
	collisionType: CollisionTypes.trigger,
	
	center: new Point(1,1),
	pattern:
		[" 55",
		 "B6 ",
		 " 55"],
});

var DownEnemy = Sprite.extend({
	construct: function(point) {
		this.RegisterComponent(Mover, {vel:new Point(0,0.2)});
		this.RegisterComponent(RemoveOffBottomEdge);
		this.RegisterComponent(Exploder);
		this.RegisterComponent(ContainsObject, {chance:9, obj: UpgradeShot});
		this.RegisterComponent(HP, {hp:2});
		this.RegisterComponent(ShooterRandom, {obj:EnemyShot, vel:new Point(0, .4)});
		Sprite.construct.call(this, point);
	},

	name: "DownEnemy",
	type: "Enemy",
	owner: "Enemy",
	collisionType: CollisionTypes.trigger,

	center: new Point(1,1),
	pattern:
		["4 4",
		 " 6 "],
});

var EnemySpawner = Sprite.extend({
	name: "EnemySpawner",
	type: "Spawner",
	owner: "Enemy",
	collisionType: CollisionTypes.none,

	pattern: ["F"],

	rate: 50,

	Update: function(time) {
		Sprite.Update.call(this, time);

		if( time % this.rate === 0 ) {
			GAME.Spawn(DownEnemy, new Point(randBetween(1, GAME.w-2), -1));
		}
	},
});