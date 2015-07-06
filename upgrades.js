//======================================================================
// Upgrades

//======================================================================
// PowerUp
var PowerUp = Sprite.extend({
	construct: function(point) {
		this.RegisterComponent(Mover, {vel:new Point(0,0.1)});
		this.RegisterComponent(SoundOnSpawn, {sound: "Spawning"});
		this.RegisterComponent(RemoveOffBottomEdge);
		Sprite.construct.call(this, point);
	},

	name: "PowerUp",
	type: "PowerUp",
	owner: "Neutral",
	pattern:
		["FD",
		 "D8"],

	// What gets upgraded, and how much it's upgraded by
	upgrade: "Points",
	value: 50,

	// New event for powerups
	Trigger: function(other) {
		GAME.sounds.play("Powerup");
		this.Destroy();
	},
});

var UpgradeShot = PowerUp.extend({
	name: "UpgradeShot",
	upgrade: "UpgradeShot",
	value: 1,
})
