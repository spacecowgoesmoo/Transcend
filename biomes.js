// NOTE - 'hax' or any other NaN kinda thing being used as a hue gives a different result than 'random'
// It replicates the way it looked in the early days when I was using 'hue:dark', which isn't actually an option
// I didn't realize luminosity was a separate option




function biomeSpawnController() {
	if (!document.hidden) {															// Prevents new shapes from spawning while in a background tab. Web browsers prevent animation natively
		switch (cow.currentBiome) {
		case 'biome1': 
			// Background
			// 0.5 or 10 speed, both are good for different reasons
			if (cow.spawnNewBGgradient == true) { createBackground('', 'blue', '', 'blue', cow.bgTransitionSpeed, 'biome1'); cow.spawnNewBGgradient = false; }
			// Stars
			if (cow.biome1CurrentStarCount < cow.starCapacity) {
				spawnSkystar('', 'hax', 'half', 2, 'star', 'biome1CurrentStarCount');
				cow.biome1CurrentStarCount++;
			}
			// Diamonds
			if (cow.biome1CurrentDiamondCount < cow.diamondCapacity) {
				var q = rngRange(1,100);
				if (cow.diamondCapacity == 1 && cow.resourceDiamonds <= 4) { q = 10; }							// Hack to force quick diamonds during the very early game
				// Big background monoliths
				if (q < 6) { spawnShape(10, 0.3, 0, 0, false, '', 'hax', 1, 'diamond', 'biome1CurrentDiamondCount', 'foregroundContainer'); } else
				// Small diamonds, close to the camera
				if (q < 20) { spawnShape(5, 1, 0, 0, false, '', 'blue', 1, 'diamond', 'biome1CurrentDiamondCount', 'foregroundContainer'); } else
				// Small diamonds, far away
				if (q < 60) { spawnShape(1, 0.4, 0, 0, false, '', 'blue', 1, 'diamond', 'biome1CurrentDiamondCount', 'foregroundContainer'); } else
				if (q < 101) { spawnShape(2, 0.5, 0, 0, false, '', 'blue', 1, 'diamond', 'biome1CurrentDiamondCount', 'foregroundContainer'); }
				cow.biome1CurrentDiamondCount++;
			}
		break;
    	
    	
    	
    	
    	
    	
    	
    	
		case 'biome2' : 
			// Background
			if (cow.spawnNewBGgradient == true) { createBackground('', 'monochrome', '', 'green', cow.bgTransitionSpeed, 'biome2'); cow.spawnNewBGgradient = false; }
			// Background opaque hexagons
			if (cow.biome2CurrentBGHexagonCount < cow.bgHexagonCapacity) {
				spawnShape(50, 1.7, 0, 0, false, '', 'monochrome', 0.04, 'hexagon', 'biome2CurrentBGHexagonCount', 'skyObjectContainer');
				cow.biome2CurrentBGHexagonCount++;
			}
			// Hexagons
			if (cow.biome2CurrentHexagonCount < cow.hexagonCapacity) {
				var q = rngRange(1,100);
				// Big soulless hexagons
				if (q < 20) { spawnShape(rngRange(3,10), 0.7, 0, 0, false, '', 'monochrome', 1, 'hexagon', 'biome2CurrentHexagonCount', 'foregroundContainer'); } else
				// Tiny alive hexagons
				if (q < 101) { spawnShape(2, 1.7, 2, rngRange(100,300), false, '', 'hax', 1, 'hexagon', 'biome2CurrentHexagonCount', 'foregroundContainer'); }
				cow.biome2CurrentHexagonCount++;
			}
		break;
    	
    	
    	
    	
    	
    	
    	
    	
		case 'biome3' : 
			// Background
			if (cow.spawnNewBGgradient == true) { createBackground('dark', 'monochrome', 'dark', 'monochrome', cow.bgTransitionSpeed, 'biome3'); cow.spawnNewBGgradient = false; }
			// Dance spotlights, with spawn delay
			if (cow.biome3CurrentCircleCount < cow.circleCapacity && rngRange(1, 15) == 2) {
				spawnShape(6, 1, 0, 0, false, 'dark', 'random', 0.1, 'circle', 'biome3CurrentCircleCount', 'skyObjectContainer');
				cow.biome3CurrentCircleCount++;
			}
			// Triangles
			if (cow.biome3CurrentTriangleCount < cow.triangleCapacity) {
				var q = rngRange(1,100);
				// Big
				if (q < 30) { spawnShape(rngRange(2,4), 2, 0, 0, true, '', 'random', 0.5, 'triangle', 'biome3CurrentTriangleCount', 'foregroundContainer'); } else
				// Tiny
				if (q < 101) { spawnShape(1, 2, 0, 0, true, '', 'random', 1, 'triangle', 'biome3CurrentTriangleCount', 'foregroundContainer'); }
				cow.biome3CurrentTriangleCount++;
			}
		break;
    	
    	
    	
    	
    	
    	
    	
    	
		case 'biome4' :
			// Background
			if (cow.spawnNewBGgradient == true) { createBackground('dark', 'blue', 'dark', 'orange', cow.bgTransitionSpeed, 'biome4'); cow.spawnNewBGgradient = false; }
			// Squares
 			if (cow.biome4CurrentSquareCount < cow.squareCapacity) {
				var q = rngRange(1,100);
				// mini quads
				if (q < 85) { 
					spawnShape(rngRange(2,4), 1, 0, 0, false, '', 'yellow', 1, 'quad', 'biome4CurrentSquareCount', 'biome4Container');  
					cow.biome4CurrentSquareCount++;
				} else
				// tall buildings, spawn rate lowered
 				if (q < 101 && rngRange(1,3) == 2) { 
					spawnShape(rngRange(7,10), 1, 0, 0, false, 'dark', 'orange', 1, 'pillar', 'biome4CurrentSquareCount', 'biome4FGContainer'); 
					cow.biome4CurrentSquareCount++;
				}
			}
		break;
    	
    	
    	
    	
    	
    	
    	
    	
		case 'biome5' :
				// Background
				if (cow.spawnNewBGgradient == true) { createBackground('dark', 'blue', 'dark', 'blue', cow.bgTransitionSpeed, 'biome5'); cow.spawnNewBGgradient = false; }	
				// Bubbles
				if (cow.biome5CurrentCircleCount < cow.circleCapacity) {
					var q = rngRange(1,100);
					// Giant foreground bubbles
					if (q < 10) { spawnShape(12, 1.8, 0.2, 400, false, '', 'blue', 0.2, 'circle', 'biome5CurrentCircleCount', 'foregroundContainer'); } else
					// Big foreground bubbles
					if (q < 20) { spawnShape(7, 1, 0.1, 400, false, '', 'blue', 0.2, 'circle', 'biome5CurrentCircleCount', 'foregroundContainer'); } else
					// Regular bubbles
					if (q < 101) { spawnShape((rngRange(10,40)/10), (rngRange(3,10)/5), (rngRange(1,10)/10), rngRange(25,125), false, '', 'blue', 0.2, 'circle', 'biome5CurrentCircleCount', 'foregroundContainer'); }
					cow.biome5CurrentCircleCount++;
				}
				// Hydrofarms, with time delay
				if (cow.biome5CurrentHexagonCount < cow.hexagonCapacity && rngRange(1,10) < 5) {
					var r = rngRange(1,100);
					// Foreground
					if (r < 25) { spawnShape(5, 0.6, 0, 0, false, 'dark', 'blue', 1, 'hexagon', 'biome5CurrentHexagonCount', 'skyObjectContainer'); } else 
					// Distance
					if (r < 62) { spawnShape(3, 0.3, 0, 0, false, 'dark', 'blue', 1, 'hexagon', 'biome5CurrentHexagonCount', 'skyObjectContainer'); } else 
					// More Distance
					if (r < 101) { spawnShape(rngRange(1,2), 0.2, 0, 0, false, 'dark', 'blue', 1, 'hexagon', 'biome5CurrentHexagonCount', 'skyObjectContainer'); }
					cow.biome5CurrentHexagonCount++;
				}
		break;
    	
    	
    	
    	
    	
    	
    	
    	
		case 'biome6' :
			// Background
			if (cow.spawnNewBGgradient == true) { createBackground('dark', 'monochrome', 'dark', 'monochrome', cow.bgTransitionSpeed, 'biome6'); cow.spawnNewBGgradient = false; }	
			// Stars
			if (cow.biome6CurrentStarCount < cow.starCapacity) {
				spawnSkystar('', 'monochrome', 'full', (rngRange(3,6)/10), 'star', 'biome6CurrentStarCount');
				cow.biome6CurrentStarCount++;
			}
			// Planets
			if (cow.biome6CurrentCircleCount < cow.circleCapacity) {
				spawnSkystar('dark', 'hax', 'full', (rngRange(3,6)/10), 'circle', 'biome6CurrentCircleCount');
				cow.biome6CurrentCircleCount++;
			}
		break;
		
		default: break;
	}
}








	// Biome shape respawn speeds
	if (cow.currentBiome == 'biome1') { var p = 1600 - (cow.diamondCapacity * 5); }
	if (cow.currentBiome == 'biome2') { var p = 1600 - (cow.hexagonCapacity * 30); }
	if (cow.currentBiome == 'biome3') { var p = 100; }
	if (cow.currentBiome == 'biome4') { var p = 80; }
	if (cow.currentBiome == 'biome5') { var p = 1600 - (cow.circleCapacity * 20);; }
	if (cow.currentBiome == 'biome6') { var p = 1600 - (cow.starCapacity * 5);; }
	p = p * (rngRange(80,120)/100);																// randomize spawn interval 20%
	if (p < 50) { p = 50; }																		// 0 or -P will spawn shapes at 60FPS, beware
	setTimeout(biomeSpawnController, p);
}
























function fadeInBackgroundTexture() {
	var texture = PIXI.Texture.from('Images/fuzz.png');									// Adds a tiled background sprite
	var tilingSprite = new PIXI.TilingSprite(texture, app.renderer.width, app.renderer.height);
	textureContainer.addChild(tilingSprite);
	
	textureContainer.alpha = 0;	
	var q = 0;																			// bullshit variable required; += doesn't work
	function cow() {
		textureContainer.alpha = q;
		q += 0.0005;																	// Fades in pretty quickly so that it can hide the gradient banding
	
		if (textureContainer.alpha < 1) { window.requestAnimationFrame(cow); }			// if not faded in, animate another frame 
	}
	window.requestAnimationFrame(cow);													// starts the animation moving
}