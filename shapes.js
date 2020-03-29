function createBackground(luminosity1, color1, luminosity2, color2, lifespan, biome) {
	if (bgSquare) { bgSquare.destroy(true); }							// deletes any existing background shapes

	var bgSquare = new PIXI.Graphics();									// create a shape in the PIXI engine
	bgSquare.beginFill(0xffffff);										// This can be anything except black to make the gradient work
	bgSquare.moveTo(0, 0);												// places the shape at the origin for easy drawing math
	bgSquare.lineTo(900, 0);											//
	bgSquare.lineTo(900, 600);											//
	bgSquare.lineTo(0, 600);											//
	bgSquare.endFill();													//
	skyContainer.addChild(bgSquare);									// add to the PIXI stage

	var cowShader = plainGradient(randomColor({hue:color1, luminosity:luminosity1}), randomColor({hue:color2, luminosity:luminosity2}))	// Draw the gradient
    bgSquare.filters = [cowShader];																										//

	bgSquare.alpha = 0;													// makes sure the BG doesn't blink before appearing
	var q = 0.02;														// alpha counter variable
	var preventSecondFadeIn = false;									// prevents the bgSquare from reappearing if user quicklyswitches back to an old biome

	function crossfade() {
		if (biome == cow.currentBiome && preventSecondFadeIn == false) {// If the biome is the same as when the bgSquare spawned..
			bgSquare.alpha = (Math.sin(q));								// calculate alpha with a sinewave
			q += (1/lifespan)/1150;										// increment. lifespan is tuned to be in minutes
		}

		if (biome != cow.currentBiome) {								// If the biome has changed..
			bgSquare.alpha -= lifespan/20000;							// Fade out
			preventSecondFadeIn = true;
		}

		if (q > 3.2 || bgSquare.alpha <= 0.01) {						// if gradient has faded out.. (3.14 is one sinwave cycle)
			bgSquare.destroy(true);											// kill it
		 } else { window.requestAnimationFrame(crossfade); }			// otherwise, animate another frame and check again
	}

	window.requestAnimationFrame(crossfade);							// starts the animation moving

	if (biome == cow.currentBiome) {									// if we're still in the same biome the gradient was created in..				 // lifespan == minutes
		setTimeout("createBackground('"+ luminosity1 +"', '"+ color1 +"', '"+ luminosity2 +"', '"+color2 +"', '"+ lifespan + "', '"+ biome + "')", (lifespan*30000)); // respawn
	}
}
















function spawnSkystar(luminosity, color, placement, lifespan, shape, counter) {
	var star = new PIXI.Graphics();										// create a shape in the PIXI engine
	star.beginFill(randomColor({luminosity:luminosity, hue:color}));	// set a fill and line style, then code in the points
	
	switch (shape) {
		case 'star': 
			star.moveTo(100,20);										// vertices
			star.lineTo(78,78);
			star.lineTo(20,78);
			star.lineTo(64,115);
			star.lineTo(40,180);
			star.lineTo(100,143);
			star.lineTo(160,180);
			star.lineTo(137,115);
			star.lineTo(180,78);
			star.lineTo(123,78);
			break;
		case 'circle':
			star.drawCircle(0, 0, 20);
			break;
		default: break;
	}
	
	
	star.endFill();														
	skyObjectContainer.addChild(star);									// add to the PIXI stage. The 1 keeps all the stars in the BG
	
	if (shape == 'star') { star.scale.set(0.05); }						// make the star tiny
	if (shape == 'circle') { star.scale.set(rngRange(1,100)/150) }		// make the circles size randomized
	
	star.x = rngRange (0, 900);											// moves shape to a random x value onscreen
	star.alpha = 0;														// makes sure stars don't blink once before appearing
	
	if (placement == 'half') { star.y = rngRange (0, 350); }			// moves shape to a random height
	if (placement == 'full') { star.y = rngRange (0, 600); }			//

	var q = -.001 - (rngRange(1,300)/100);								// variable for calculating the brightness using a sinwave 
																		// also staggers spawn rate. Max of 314 or it will overflow
	var sfxPlayed = false;												// Used for dynamically calling the SFX in the animation loop
	
	document.body.addEventListener('click', boost);						// Adds click boost event listener
	var boostCounter = rngRange(0,5)/10;								// initialize sinewave, slight RNG
	var boostable = true;												// initialize logic to prevent click spamming
	
	function boost() {													// click boost animation
		if (boostable == true) { go(); }
		
		function go() {
			boostable = false;
			
			star.alpha = (Math.sin(q));									// Same calculations as normal, but faster. Click = 6% progress
			q += 1/lifespan/400;
			
			boostCounter += 0.04;		
			if (boostCounter >= 3.1) {	
				boostCounter = 0;
				boostable = true;
			} else { if (q < 3.1) { window.requestAnimationFrame(go); } }	// otherwise, animate another frame and check again
		}
	}

	function pulseBrightness() {
		star.alpha = (Math.sin(q));										// calculate alpha with a sinewave
		q += 1/lifespan/1150;											// increment. lifespan is tuned to be in minutes
		
		if (q > 0.8 && sfxPlayed == false) {							// play sfx when the shape is mostly visible
			switch (shape) {													
				case 'star':				playAudio('./SFX/star' + rngRange(1,5) + '.wav', 'sfx', star.x);		break;
				case 'circle':				playAudio('./SFX/circle' + rngRange(1,5) + '.wav', 'sfx', star.x);		break;
				default: break;
			}
			sfxPlayed = true;
		}
		
		if (q > 3.2) {													// if star has faded out.. (3.14 is one sinwave cycle)
			star.destroy(true);											// kill it
			document.body.removeEventListener('click', boost);			// Removes the click boost event listener from the HTML body
			switch (shape) {											// add one shape to the player's inventory
				case 'circle': cow.resourceCircles++; break;			//
				case 'star': cow.resourceStars++; break;				//
				default: break;											//
			}
			cow.kongLifetimeShapes++;
			if (cow.endgameBarOwned == true){
				switch (shape) {												// Add shapes to the endgame bar counter
					case 'circle': cow.resourceEndgameBarCircles++; break;		//
					case 'star': cow.resourceEndgameBarStars++; break;			//
					default: break;												//
				}
			}
			updateResourceCounter(shape);										//
			cow[counter]--;												// and remove the star from the capacity counter
		 } else { window.requestAnimationFrame(pulseBrightness); }		// otherwise, animate another frame and check again
	}
	

		
	window.requestAnimationFrame(pulseBrightness);						// starts the animation moving
}
















function spawnShape(size, speedY, speedX, widthX, rotation, luminosity, color, opacity, shape, counter, layer) {
	var shape1 = new PIXI.Graphics();									// create a shape in the PIXI engine
	shape1.beginFill(randomColor({luminosity:luminosity, hue:color}));	// set a fill and line style, then code in the points
	shape1.moveTo(0, 0);												// places the shape at the origin for easy drawing math
	
	switch (shape) {
		case 'triangle': 
			shape1.lineTo(rngRange(15,25), rngRange(25,35));			// create randomized vertices
			shape1.lineTo(rngRange(-25,-15), rngRange (25,35));			//
			var offscreen = -35;										// must equal the largest y coordinate
			break;

		case 'diamond':
			shape1.lineTo(rngRange(10,30), rngRange(20,40));
			shape1.lineTo(rngRange(-8,8), rngRange (80,100));
			shape1.lineTo(rngRange(-30,-10), rngRange (20,40));
			var offscreen = -100;
			break;
		
		case 'hexagon':
			shape1.lineTo(10,0);
			shape1.lineTo(15,9);
			shape1.lineTo(10,18);
			shape1.lineTo(0,18);
			shape1.lineTo(-5,9);
			var offscreen = -18;
			break;
			
		case 'circle':
			shape1.drawCircle(0, 0, 20);
			var offscreen = -20;
			break;
			
		case 'quad':
			var quadWidth = rngRange(0,40);
			var quadHeight = rngRange(0,40);
			shape1.lineTo(quadWidth, 0);
			shape1.lineTo(quadWidth, quadHeight);
			shape1.lineTo(0, quadHeight);
			var offscreen = -quadHeight;
			break;
		
		case 'pillar':
			var quadWidth = rngRange(7,15);
			var quadHeight = rngRange(20,40);
			shape1.lineTo(quadWidth, 0);
			shape1.lineTo(quadWidth, quadHeight);
			shape1.lineTo(0, quadHeight);
			var offscreen = -quadHeight;
			break;
		
		case 'rhombus':
			shape1.lineTo(40, 0);
			shape1.lineTo(30, 30);
			shape1.lineTo(-10, 30);
			var offscreen = -30;
			break;
		
		case 'star':
			shape1.moveTo(100,20);										// vertices
			shape1.lineTo(78,78);
			shape1.lineTo(20,78);
			shape1.lineTo(64,115);
			shape1.lineTo(40,180);
			shape1.lineTo(100,143);
			shape1.lineTo(160,180);
			shape1.lineTo(137,115);
			shape1.lineTo(180,78);
			shape1.lineTo(123,78);
			var offscreen = -180;
		default: break;
		}
	
	shape1.endFill();													// ends vertice drawing that was in the switch
	this[layer].addChild(shape1);										// add shape to the PIXI stage
	
	shape1.alpha = opacity;												// opacity
	if (rotation == true) {	shape1.rotation = (rngRange(0,310)/100); }	// random rotation in radians
	
	if (shape == 'rhombus' && rngRange(1,2) == 2) { 					// 50% chance of mirroring rhombi
		shape1.skew.x = 0.75; 
	}
	
	shape1.scale.set(size);												// applies size modifier
	offscreen = offscreen * size;										// applies modifer to offscreen location
	
	shape1.y = 601;														// moves shape offscreen below the stage
	shape1.x = rngRange (0, 900);										// moves shape to a random x value onscreen
	if (shape == 'circle') { shape1.y += (size * 20) }					// extra y value if the shape is a circle
	if (rotation == true) { shape1.y -= offscreen}						// boost starting y value if the shape is rotated

	var speedYFinal = (speedY * rngRange (10,100)) / 100;				// randomize speed by -90% to 100%
	
	if (speedX != 0) { var sinFinal = rngRange (-3, 3);	}				// Initialize sinwave counter and direction
	
 	// var shader = plainGradient(0xffffff, 0x888888)					// Gradient overlay, soft overhead light
	// shape1.filters = [shader];										// Note - Breaks antialiasing if the shape is moving

	var sfxPlayed = false;												// Used for dynamically calling the SFX in the animation loop
	
	document.body.addEventListener('click', boost);						// Adds click boost event listener
	var boostCounter = rngRange(0,5)/10;								// initialize sinewave, slight RNG
	var boostable = true;												// initialize logic to prevent click spamming
	
	function boost() {													// click boost animation
		if (boostable == true && counter != 'biome2CurrentBGHexagonCount') { go(); }	// Disabled for biome2 BG hexes
		
		function go() {
			boostable = false;
			shape1.y -= Math.sin(boostCounter) * speedYFinal * 2;		//	Accounts for base speed and parallax
			boostCounter += 0.04;		
			if (boostCounter >= 3.1) {	
				boostCounter = 0;
				boostable = true;
			} else { if (shape1.y > offscreen +5) { window.requestAnimationFrame(go); } }	// otherwise, animate another frame and check again
		}
	}
	
	function move() {													//
		shape1.y -= speedYFinal;										// Does one frame of 60FPS animation
		
		if (speedX != 0) {												// sinwave animation
			shape1.x += (Math.sin(sinFinal));							//
			sinFinal += (speedX/widthX);								// Equation isn't accurate, but it looks ok
		}

		if (shape1.y <= 595 && sfxPlayed == false && counter != 'biome2CurrentBGHexagonCount' && shape != 'triangle') {
			switch (shape) {													// play sfx when the shape spawns. 100% squares break the audio engine lol
				case 'diamond':				playAudio('./SFX/diamond' + rngRange(1,5) + '.wav', 'sfx', shape1.x);	break;
				case 'hexagon':				playAudio('./SFX/hexagon' + rngRange(1,5) + '.wav', 'sfx', shape1.x);	break;
				case 'pillar':				if (rngRange(1,10) >= 9) { playAudio('./SFX/square' + rngRange(1,5) + '.wav', 'sfx', shape1.x); }	break;
				case 'quad':				if (rngRange(1,10) >= 9) { playAudio('./SFX/square' + rngRange(1,5) + '.wav', 'sfx', shape1.x); }	break;
				case 'star':				playAudio('./SFX/star' + rngRange(1,5) + '.wav', 'sfx', shape1.x);		break;
				default: break;						
			}
			sfxPlayed = true;
		}
		
		if (shape1.y <= (595-(offscreen/2)) && sfxPlayed == false && shape == 'triangle') {	// Special case for triangle to compensate for rotation. Play the SFX 50% pixels early
			playAudio('./SFX/triangle' + rngRange(1,5) + '.wav', 'sfx', shape1.x);
			sfxPlayed = true;
		}
		
		if (shape1.y <= (595-offscreen) && sfxPlayed == false && shape == 'circle') {		// Special case for circles to compensate for centered origins
			playAudio('./SFX/circle' + rngRange(1,5) + '.wav', 'sfx', shape1.x);
			sfxPlayed = true;
		}
		
		if (shape1.y < offscreen) { 									// if shape is offscreen..
			shape1.destroy(true); 										// kill it
			cow[counter]--;												// remove the shape from the resource counter
			document.body.removeEventListener('click', boost);			// Removes the click boost event listener from the HTML body
			switch (shape) {											// and add one shape to the player's inventory
				case 'diamond': cow.resourceDiamonds++; break;			//
				case 'hexagon': 
					if (counter != 'biome2CurrentBGHexagonCount') { cow.resourceHexagons++; }	break;	//
				case 'triangle': cow.resourceTriangles++; 		break;	//
				case 'circle': cow.resourceCircles++; 			break;	//
				case 'pillar': cow.resourceSquares++;			break;	//
				case 'quad': cow.resourceSquares++;				break;	//
				case 'star': cow.resourceStars++;	 			break;	//
				default: break;											//
			}
			
			if (shape == 'quad' || shape == 'pillar' || rngRange(1,10) == 7) { cow.kongLifetimeShapes++; }		// Squares only count for 10%
			else { cow.kongLifetimeShapes++; }
			
			if (cow.endgameBarOwned == true){
				switch (shape) {												// Add shapes to the endgame bar counter
					case 'diamond': cow.resourceEndgameBarDiamonds++; break;	//
					case 'hexagon': cow.resourceEndgameBarHexagons++; break;	//
					case 'triangle': cow.resourceEndgameBarTriangles++; break;	//
					case 'circle': cow.resourceEndgameBarCircles++; break;		//
					case 'pillar': cow.resourceEndgameBarSquares++; break;		//
					case 'quad': cow.resourceEndgameBarSquares++; break;		//
					case 'star': cow.resourceEndgameBarStars++; break;			//
					default: break;												//
				}
			}	
			updateResourceCounter(shape);
		} else { window.requestAnimationFrame(move); }					// otherwise, animate another frame and check again
	}																	//
	
	window.requestAnimationFrame(move);									// starts the animation moving
}