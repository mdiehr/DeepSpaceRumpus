// Soundbank for games

GAME.sounds = new Dictionary();
GAME.sounds.preload = function () {
	this.each(function(property, effectName){
		PS.audioLoad(effectName);
	});
};
GAME.sounds.play = function(effectName) {
	PS.audioPlay(this.lookup(effectName));
}

GAME.sounds.store("Explode", "fx_blast2");
GAME.sounds.store("Laser", "fx_rip");
GAME.sounds.store("CantShoot", "fx_shoot8");
GAME.sounds.store("Impact", "fx_shoot7");
GAME.sounds.store("Score", "fx_coin7");
GAME.sounds.store("Powerup", "fx_powerup5");
GAME.sounds.store("Spawning", "fx_powerup1");
