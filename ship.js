//======================================================================
// Ship Entity


var Ship = Sprite.extend({
	construct: function(point) {
		this.RegisterComponent(HP, {hp:3});
		this.RegisterComponent(Exploder);
		this.RegisterComponent(ArrowKeyMover, {vel:new Point(0.5, 0.5)});
		Sprite.construct.call(this, point);
	},

	name: "Ship",
	type: "Ship",
	owner: "Player",
	collisionType: CollisionTypes.solid,

	center: new Point(1,2),
	pattern:
		[" 2 ",
		 "282",
		 "2D2"],

	shootDelay: 9,
	shootTimer: 0,
	inventory: new Dictionary(),

	Collide: function(other) {
		Sprite.Collide.call(this, other);

		if( other.type == "PowerUp" ) {
			other.Trigger(this);
			var newValue = other.value;
			// Add to current value if possible
			if( this.inventory.contains(other.upgrade) ) {
				newValue = this.inventory.lookup(other.upgrade) + other.value;
			}
			// Write new value
			this.inventory.store(other.upgrade, newValue);
		}
	},

	Update: function(time) {
		Sprite.Update.call(this, time);

		// Ship exhaust
		if( time%2 == 0 ) {
			GAME.Spawn(Exhaust, this.point.add(new Point(1,0)));
			GAME.Spawn(Exhaust, this.point.add(new Point(-1,0)));
		}

		// Rapid fire delay
		if( this.shootTimer > 0 )
			this.shootTimer--;
		
		// Spacebar to shoot
		if( GAME.KeyDown(32) ) {
			this.Shoot(time);
		}
	},

	Shoot: function(time) {
		if( this.shootTimer <= 0 ) {
			this.shootTimer = this.shootDelay;
			if( this.inventory.contains("UpgradeShot")) {
				var shotValue = this.inventory.lookup("UpgradeShot");
				if( shotValue >= 5 ) {
					// Ultra Spread Shot
					GAME.Spawn(LaserShot, this.point.add(new Point(-1,0)), new Point(-0.5, -1));
					GAME.Spawn(LaserShot, this.point.add(new Point(0,-1)), new Point(-0.25, -1));
					GAME.Spawn(LaserShot, this.point.add(new Point(0,-1)), new Point(0, -1));
					GAME.Spawn(LaserShot, this.point.add(new Point(0,-1)), new Point(0.25, -1));
					GAME.Spawn(LaserShot, this.point.add(new Point( 1,0)), new Point(0.5, -1));
					GAME.sounds.play("Laser");
				} else if( shotValue >= 4 ) {
					// Mega Spread Shot
					GAME.Spawn(LaserShot, this.point.add(new Point(-1,0)), new Point(-0.4, -1));
					GAME.Spawn(LaserShot, this.point.add(new Point(0,-1)), new Point(-0.15, -1));
					GAME.Spawn(LaserShot, this.point.add(new Point(0,-1)), new Point(0.15, -1));
					GAME.Spawn(LaserShot, this.point.add(new Point( 1,0)), new Point(0.4, -1));
					GAME.sounds.play("Laser");
				} else if( shotValue >= 3 ) {
					// Triple Spread Shot
					GAME.Spawn(LaserShot, this.point.add(new Point(-1,0)), new Point(-0.3, -1));
					GAME.Spawn(LaserShot, this.point.add(new Point(0,-1)), new Point(0, -1));
					GAME.Spawn(LaserShot, this.point.add(new Point( 1,0)), new Point(0.3, -1));
					GAME.sounds.play("Laser");
				} else if( shotValue >= 2 ) {
					// Triple Shot
					GAME.Spawn(LaserShot, this.point.add(new Point(-1,0)), new Point(0, -1));
					GAME.Spawn(LaserShot, this.point.add(new Point(0,-1)), new Point(0, -1));
					GAME.Spawn(LaserShot, this.point.add(new Point( 1,0)), new Point(0, -1));
					GAME.sounds.play("Laser");
				} else if( shotValue >= 1 ) {
					// Double shot
					GAME.Spawn(LaserShot, this.point.add(new Point(-1,0)), new Point(0, -1));
					GAME.Spawn(LaserShot, this.point.add(new Point( 1,0)), new Point(0, -1));
					GAME.sounds.play("Laser");
				}
			} else {
				// Single shot
				GAME.Spawn(LaserShot, this.point.add(new Point(0,-1)), new Point(0, -1));
				GAME.sounds.play("Laser");
			}
		}
	},
});
