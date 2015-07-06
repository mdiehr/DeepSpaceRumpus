//======================================================================
// Game Logic and Helpers
var GAME = {
    w: 32,
    h: 32,
    time: 0,
    timeRate: 1,
    entityList: [],
    keysHeld: [],
    keysPressed: [],
    keysReleased: [],
    palette: sPalette,
    bounds: undefined,
}

GAME.initialize = function () {
    // Viewport
    PS.gridSize(GAME.w, GAME.h);

    GAME.bounds = new Rect(0, 0, GAME.w - 1, GAME.h - 1);

    PS.gridColor(PS.COLOR_BLACK);
    PS.statusColor(PS.COLOR_WHITE);
    PS.statusText("Deep Space Rumpus");

    // Add any other initialization code you need here
    PS.style(PS.ALL, PS.ALL, sBackground);

    GAME.sounds.preload();

    // Game timer
    GAME.timer = PS.timerStart(GAME.timeRate, function () {
        GAME.GameLoop();
    });
}

GAME.Rect = function () {
    return GAME.bounds;
}

//======================================================================
// Dictionary of entity types
GAME.entityTypes = new Dictionary();
GAME.entityTypes.register = function (constructor) {
    this.store(constructor.name, constructor);
};

GAME.Spawn = function (type, point, velocity) {
    var newObject = type.create(point, velocity);
    this.entityList.push(newObject);
    return newObject;
}

GAME.KeyHandler = function (key, down) {
    if (down != this.keysHeld[key]) {
        this.keysHeld[key] = down;
        if (down)
            this.keysPressed[key] = true;
        else
            this.keysReleased[key] = true;
    }
}

GAME.KeyUpdate = function () {
    this.keysPressed = new Array();
}

GAME.KeyDown = function (key) {
    return (this.keysHeld[key] == true);
}

GAME.KeyPressed = function (key) {
    return (this.keysPressed[key] == true);
}

GAME.GameLoop = function () {
    this.Update();
    this.Render();
}

GAME.Update = function () {
	this.time++;

    // Updates
    this.SpriteUpdate(this.time);
    this.PhysicsUpdate(this.time);
    this.CollisionUpdate();

    // End of update cleanup
    this.CleanupEntities();
    this.KeyUpdate();
}

GAME.SpriteUpdate = function (gameTime) {
    forEach(this.entityList, function (sprite) {
        if (sprite.Update && sprite.IsAlive())
            sprite.Update(gameTime);
    });
}

GAME.PhysicsUpdate = function (gameTime) {
    forEach(this.entityList, function (sprite) {
        if (sprite.PhysicsUpdate && sprite.IsAlive())
            sprite.PhysicsUpdate(gameTime);
    });
}

GAME.CollisionUpdate = function () {
    var numEntities = this.entityList.length;
    for (var i = 0; i < numEntities - 1; i++) {
        for (var j = i + 1; j < numEntities; j++) {
            SpriteCollisionCheck(this.entityList[i], this.entityList[j]);
        }
    }
}

GAME.CleanupEntities = function () {
    for (var i = 0; i < this.entityList.length; ++i) {
        if (this.entityList[i]._dispose) {
            if (this.entityList[i]._destroyed) // Destructive disposition
                this.entityList[i].Deconstruct();
            if (this.entityList[i]._removed) // Simply deleted
                this.entityList[i].Removed();
            this.entityList.splice(i, 1);
            i--;
        }
    }
}

GAME.Render = function () {
    this.ClearScreen();
    forEach(this.entityList, function (sprite) {
        if (sprite._render)
            sprite._render();
    });
}

GAME.ClearScreen = function () {
    PS.style(PS.ALL, PS.ALL, sBackgroundFast);
}

