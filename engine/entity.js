//======================================================================
// Basic entity type

var Entity = {
	construct: function(parent) {

		// Save the parent object
		this.parent = parent;
		
		// Invoke the Spawn function
		this.Spawn( this.parent );
	},

	///////////////////////////
	// Public properties

	// The name of the object
	name: "EntityBaseType",

	// Type or category that this object falls under. eg. Projectile, Enemy, Environment
	type: "Entity",

	// The owner category. eg. Player, Opponent, None
	owner: "None",

	// If true, remove this from the game at the end of the frame
	_dispose: false,

	// If false, don't do anything, as if it were destroyed
	_active: true,

	// The object that contains this component
	parent: undefined,

	/////////////////////////////
	// Events that you can override

	// Called once per frame
	Update: function(time) { },

	// When the component is initialized
	Spawn: function(parent) { },

	// After the component (or parent object) is destroyed
	Deconstruct: function() { },

	// After the component (or parent object) is removed
	Removed: function() { },

	// When the parent object touches another object
	Collide: function(other) { },

	// When the component is triggered (say, by a player)
	Trigger: function(other) { },

	// After the component draws to the screen
	PostRender: function() { },
	
	/////////////////////////////
	// Public interface

	Destroy: function() {
		this._destroyed = true;
		this._dispose = true;
		this._active = false;
	},

	Remove: function() {
		this._removed = true;
		this._dispose = true;
		this._active = false;
	},

	// Is the entity active and not disposing?
	IsAlive: function() {
		return (this._active && !this._dispose);
	},
};


