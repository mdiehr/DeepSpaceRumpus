/*	Collision Logic
	by Mark Diehr
*/

var CollisionTypes = {
	none: 0,	// Objects which don't have collisions with anything
	trigger: 1,	// Objects which have collisions but have no motion response (Lasers)
	solid: 2,	// Objects which have collision and have a motion response (Ships)
	heavy: 3,	// Like Solid, but can push solid objects out of the way
	enviro: 4,	// Like Solid, but doesn't move in response unless it hit something of greater type (Doors, crushers, asteroids)
	frozen: 5	// Like Solid, but never moves (Walls)
}

var ResponseTypes = {
	none: 0,
	collision: 1,
	move: 2
}

// y-axis is self, x-axis is other. The result is what happens to the self.
var CollisionMatrix =  [[0,0,0,0,0,0],	// None
						[0,1,1,1,1,1],	// Trigger
						[0,1,2,2,2,2],	// Solid
						[0,1,1,1,2,2],	// Heavy
						[0,1,1,1,1,2],	// Enviro
						[0,1,1,1,1,1]];	// Frozen

// Sprite collision check
function SpriteCollisionCheck(a, b) {
	// Is collision enabled?
	var collision = false;
	if( a.IsAlive() && b.IsAlive() ) {
		var responseA = CollisionMatrix[a.collisionType][b.collisionType];
		var responseB = CollisionMatrix[b.collisionType][b.collisionType];
		if( responseA & responseB === 0 ) {
			return false;
		}

		collision = SpritesOverlap(a, b);

		if( collision ) {
			// Move sprites
			Response(a, b, responseA);
			Response(b, a, responseB);
			
			// Notify the sprites that they collided
			a.Collide(b);
			b.Collide(a);
		}
	}

	return collision;
}

function SpritesOverlap(a, b, aOffset) {
	var collision = false;
	var ar, br, r, ax, ay, bx, by, x, y, pixa, pixb;
	// Bounding box
	if (aOffset !== undefined) {
		var roundedOffset = new Point(aOffset.x, aOffset.y);
		ar = a.Rect().slide(roundedOffset);
	}
	else
		ar = a.Rect();
	br = b.Rect();
	if( ar.overlap(br) ) {
		// Pixel collision
		if( a.picture && b.picture ) {
			// Calculate sprite's pixture offsets
			r = ar.intersection(br);
			ax = -ar.l;
			ay = -ar.t;
			bx = -br.l;
			by = -br.t;
			// Loop over the individual pixels
			for( x = r.l; x <= r.r; ++x ) {
				for( y = r.t; y <= r.b; ++y ) {
					pixa = a.picture[(x+ax) + ((y+ay) * (a.w))];
					pixb = b.picture[(x+bx) + ((y+by) * (b.w))];
					if( pixa !== undefined && pixb !== undefined ) {
						collision = true;
					}
				}
			}
		} else {
			collision = true;
		}
	}
	return collision;
}

function Response(a, b, responseType) {
	if( responseType === ResponseTypes.move ) {
		var dx = WholePart(a.velocity.x);
		var dy = WholePart(a.velocity.y);
		var moveX = dx !== 0;
		var moveY = dy !== 0;
		var moving = (moveX || moveY);
		if( !moving )
			return;

		var impulseX = new Point(-dx, 0);
		var impulseY = new Point(0, -dy);
		var impulse = new Point(-dx, -dy);

		var overlapY = SpritesOverlap(a, b, impulseY);
		var overlapX = SpritesOverlap(a, b, impulseX);

		if( overlapX && !overlapY ) {
			impulse = impulseY;
		} else if( !overlapX && overlapY ) {
			impulse = impulseX;
		}		
		
		a.velocity = impulse;
		a.PhysicsUpdate();
	}
}