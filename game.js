// game.js for Perlenspiel 3.0

// The following comment lines are for JSLint. Don't remove them!

/*jslint nomen: true, white: true */
/*global PS */

// PS.init( system, options )
// Initializes the game
PS.init = function( system, options ) {
	"use strict";

	// Use PS.gridSize( x, y ) to set the grid to
	// the initial dimensions you want (32 x 32 maximum)
	// Do this FIRST to avoid problems!
	// Otherwise you will get the default 8x8 grid

	GAME.initialize();

	// Spawner object that makes the "down" enemies
	GAME.Spawn(EnemySpawner, new Point(-1,-1));
	GAME.Spawn(AsteroidSpawner, new Point(-1,-1));

	// Make a big blob of enemies
	for( var i = 1; i < GAME.w+3; i+=4) {
		GAME.Spawn(SideEnemy, new Point(i,4+Math.floor(3*Math.sin(i/2.1))));
	}
	
	// Test sprite with a color key
	GAME.Spawn(TestSprite, new Point(0,28));
	GAME.Spawn(TestSprite, new Point(14,18));

	// Player ship
	GAME.Spawn(Ship, new Point(15,25));


};

// PS.touch ( x, y, data, options )
// Called when the mouse button is clicked on a bead, or when a bead is touched
PS.touch = function( x, y, data, options ) {
	"use strict";

	// Uncomment the following line to inspect parameters
	// PS.debug( "PS.touch() @ " + x + ", " + y + "\n" );

	// Add code here for mouse clicks/touches over a bead
};

// PS.release ( x, y, data, options )
// Called when the mouse button is released over a bead, or when a touch is lifted off a bead
PS.release = function( x, y, data, options ) {
	"use strict";

	// Uncomment the following line to inspect parameters
	// PS.debug( "PS.release() @ " + x + ", " + y + "\n" );

	// Add code here for when the mouse button/touch is released over a bead
};

// PS.enter ( x, y, button, data, options )
// Called when the mouse/touch enters a bead
PS.enter = function( x, y, data, options ) {
	"use strict";

	// Uncomment the following line to inspect parameters
	// PS.debug( "PS.enter() @ " + x + ", " + y + "\n" );

	// Add code here for when the mouse cursor/touch enters a bead
};

// PS.exit ( x, y, data, options )
// Called when the mouse cursor/touch exits a bead
PS.exit = function( x, y, data, options ) {
	"use strict";

	// Uncomment the following line to inspect parameters
	// PS.debug( "PS.exit() @ " + x + ", " + y + "\n" );

	// Add code here for when the mouse cursor/touch exits a bead
};

// PS.exitGrid ( options )
// Called when the mouse cursor/touch exits the grid perimeter
PS.exitGrid = function( options ) {
	"use strict";
};

// PS.keyDown ( key, shift, ctrl, options )
// Called when a key on the keyboard is pressed
PS.keyDown = function( key, shift, ctrl, options ) {
	"use strict";

	// Uncomment the following line to inspect parameters
	//PS.debug( "PS.keyDown(): key = " + key + ", shift = " + shift + ", ctrl = " + ctrl + "\n" );
	GAME.KeyHandler(key, true);
};

// PS.keyUp ( key, shift, ctrl, options )
// Called when a key on the keyboard is released
PS.keyUp = function( key, shift, ctrl, options ) {
	"use strict";

	// Uncomment the following line to inspect parameters
	// PS.debug( "PS.keyUp(): key = " + key + ", shift = " + shift + ", ctrl = " + ctrl + "\n" );
	GAME.KeyHandler(key, false);
};

// PS.input ( sensors, options )
// Called when an input device event (other than mouse/touch/keyboard) is detected
PS.input = function( sensors, options ) {
	"use strict";

	// Uncomment the following block to inspect parameters
	/*
	PS.debug( "PS.input() called\n" );
	var device = sensors.wheel; // check for scroll wheel
	if ( device )
	{
		PS.debug( "sensors.wheel = " + device + "\n" );
	}
	*/
	
	// Add code here for when an input event is detected
};

