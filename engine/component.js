//======================================================================
// Basic component type

var Component = Entity.extend({
	construct: function(parent, options) {
		this.parent = parent;
		this.owner = parent.owner;

		// Apply options to type
		forEachIn(options, bind(function(name, value){
			this[name] = value;
		}, this) );
	},

	///////////////////////////
	// Public properties

	// The name of the object
	name: "ComponentBaseType",

	// Type or category that this object falls under. eg. Projectile, Enemy, Environment
	type: "Component",

	///////////////////////////
	// Private implementation functions

	// Gives a function or property to the parent object. Replaces any that already exist.
	_Provide: function(name, value) {
		if( this.parent ) {
			this.parent[name] = value;
		}
	}
});
