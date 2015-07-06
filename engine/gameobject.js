//======================================================================
// Basic game object type

var GameObject = Entity.extend({

	///////////////////////////
	// Public properties

	// The name of the object
	name: "GameObjectBaseType",

	// Type or category that this object falls under. eg. Projectile, Enemy, Environment
	type: "GameObject",

	///////////////////////////
	// Public methods

	// Constructs a component and registers it inside this object
	RegisterComponent: function(componentType, options) {
		// Create the component list if it didn't exist
		//	(this fixes a bug where registered components were showing up in every GameObject)
		if( this._components === undefined )
			this._components = new Array();
		this._components.push( componentType.create(this, options) );
	},

	// Fetches a component from this object by type
	GetComponent: function(componentType) {
		for( var i = 0; i < this._components.length; ++i ) {
			if( this._components[i].name === componentType.name ) {
				return this._components[i];
			}
		}
	},

	///////////////////////////
	// Private properties

	// List of components that this object is currently running
	_components: undefined,

	///////////////////////////
	// Private methods

	// Called once per frame
	Update: function(time) {
		if( this._components ) {
			forEach(this._components, function(component){
				component.Update(time);
			});
		}
	},

	// When the component is initialized
	Spawn: function(parent) {
		if( this._components ) {
			var me = this;
			forEach(this._components, function(component){
				component.Spawn(me);
			});
		}
	},

	// After the component (or parent object) is destroyed
	Deconstruct: function() {
		if( this._components ) {
			forEach(this._components, function(component){
				component.Deconstruct();
			});

			this._components = undefined;
		}
	},

		// After the component (or parent object) is removed
	Removed: function() {
		if( this._components ) {
			forEach(this._components, function(component){
				component.Removed();
			});

			this._components = undefined;
		}
	},

	// When the parent object touches another object
	Collide: function(other) {
		if( this._components ) {
			forEach(this._components, function(component){
				component.Collide(other);
			});
		}
	},

	// When the component is triggered (say, by a player)
	Trigger: function(other) {
		if( this._components ) {
			forEach(this._components, function(component){
				component.Trigger(other);
			});
		}
	},

		// When the component is triggered (say, by a player)
	PostRender: function(other) {
		if( this._components ) {
			forEach(this._components, function(component){
				component.PostRender(other);
			});
		}
	},
});

