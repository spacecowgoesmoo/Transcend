const app = new PIXI.Application({ width: 900, height: 600, antialias: true });		// creates the PIXI stage
document.body.appendChild(app.view);

app.mozOpaque = true; 																// Supposedly improves Firefox performance. Testing showed minor improvements.. I think


var skyContainer = new PIXI.Container();											// create the layers
var skyObjectContainer = new PIXI.Container();										//
var textureContainer = new PIXI.Container();										//
var biome4Container = new PIXI.Container();											//
var biome4FGContainer = new PIXI.Container();										//
var foregroundContainer = new PIXI.Container();										//
skyContainer.zIndex = 5;															// set the layer depths
skyObjectContainer.zIndex = 10;														//
textureContainer.zIndex = 15;														//
biome4Container.zIndex = 20;														//
biome4FGContainer.zIndex = 21;														//
foregroundContainer.zIndex = 25;													//
app.stage.addChild(skyContainer);													// add the layers to the stage
app.stage.addChild(skyObjectContainer);												//
app.stage.addChild(textureContainer);												//
app.stage.addChild(biome4Container);												//
app.stage.addChild(biome4FGContainer);												//
app.stage.addChild(foregroundContainer);											//



// const shader = plainGradient(0xFFFFFF, 0xAAAAAA)									// Applies gradient overlay to all shapes
// app.stage.filters = [shader];													//
// app.stage.filters = '';															//
// foregroundContainer.filters = [shader];											// Or to one layer

// document.body.addEventListener('click', moo, false);








var cow = {
	currentBiome: '',
	spawnNewBGgradient: true,

	creditsActivated: false,
	gameClear: false,
	gameStarted: false,

	resourceCounterWidthArray: [],
	filesPreloaded: 0,
	preloaderComplete: false,
	userWebBrowser: '',

	kongUsername: '',
	kongLifetimeShapes: 0,
	kongFirstBiomePurchased: false,
	kongDiamondBarUnlocked: false,
	kongStrayNightmareDiscovered: false,

	bgmVolume: 80,
	sfxVolume: 80,
	audioFormat: '.opus',
	hideMusicText: false,

	allowClickBoost: true,
	boostMultiplier: 0,
	boostCounter: 0,

	randomBiomesUnlocked: false,
	randomBiomesActive: false,
	bgTransitionSpeed: 5,

	resourceDiamonds: 0,
	resourceStars: 0,
	resourceHexagons: 0,
	resourceTriangles: 0,
	resourceCircles: 0,
	resourceSquares: 0,
	resourceCounterWidth: 115,

	diamondBarOwned: false,
	resourceStardust: 0,
	resourceStardustBiome1: 0,
	resourceStardustBiome2: 0,
	resourceStardustBiome3: 0,
	resourceStardustBiome4: 0,
	resourceStardustBiome5: 0,
	resourceStardustBiome6: 0,

	endgameBarOwned: false,
	resourceEndgameBarDiamonds: 0,
	resourceEndgameBarStars: 0,
	resourceEndgameBarHexagons: 0,
	resourceEndgameBarTriangles: 0,
	resourceEndgameBarCircles: 0,
	resourceEndgameBarSquares: 0,

	stardustSpawnBoost1Owned: false,
	stardustSpawnBoost2Owned: false,

	biome1Owned: true,
	biome2Owned: false,
	biome3Owned: false,
	biome4Owned: false,
	biome5Owned: false,
	biome6Owned: false,

	nextDiamondPrice: 2,
	nextStarPrice: 10,
	nextHexagonPrice: 20,
	nextTrianglePrice: 20,
	nextCirclePrice: 10,
	nextSquarePrice: 150,

	diamondCapacity: 1,
	starCapacity: 1,
	hexagonCapacity: 0,
	bgHexagonCapacity: 40,	// Cosmetic graphics in Biome 2, don't mess with it
	triangleCapacity: 0,
	circleCapacity: 0,
	squareCapacity: 0,

	maxDiamondCapacity: 10,
	maxStarCapacity: 10,
	maxHexagonCapacity: 10,
	maxTriangleCapacity: 10,
	maxCircleCapacity: 10,
	maxSquareCapacity: 100,

	biome1CurrentDiamondCount: 0,
	biome1CurrentStarCount: 0,
	biome2CurrentHexagonCount: 0,
	biome2CurrentBGHexagonCount: 0,
	biome3CurrentTriangleCount: 0,
	biome3CurrentCircleCount: 0,
	biome4CurrentSquareCount: 0,
	biome5CurrentCircleCount: 0,
	biome5CurrentHexagonCount: 0,
	biome6CurrentCircleCount: 0,
	biome6CurrentStarCount: 0
	// REMEMBER TO UPDATE THE SAVE AND LOAD FUNCTIONS WHEN YOU ADD MORE STORAGE VARIABLES
}
















function updateResourceCounter(shape) {
	// .toLocaleString(); adds comma separators
	const separator = '»';
	switch (shape) {
		case 'diamond': 	diamondCounterText.innerHTML = cow.diamondCapacity + separator + cow.resourceDiamonds.toLocaleString();		break;
		case 'star': 		starCounterText.innerHTML = cow.starCapacity + separator + cow.resourceStars.toLocaleString();				break;
		case 'hexagon': 	hexagonCounterText.innerHTML = cow.hexagonCapacity + separator + cow.resourceHexagons.toLocaleString();		break;
		case 'triangle': 	triangleCounterText.innerHTML = cow.triangleCapacity + separator + cow.resourceTriangles.toLocaleString();	break;
		case 'circle': 		circleCounterText.innerHTML = cow.circleCapacity + separator + cow.resourceCircles.toLocaleString();		break;
		case 'square': 		squareCounterText.innerHTML = cow.squareCapacity + separator + cow.resourceSquares.toLocaleString();		break;		// Leaving out the filter check here as a hack for making the load order work. Biome4 only spawns quads and pillars.
		case 'pillar': 		squareCounterText.innerHTML = cow.squareCapacity + separator + cow.resourceSquares.toLocaleString();
								checkToDisableBiome4Filter();																			break;
		case 'quad': 		squareCounterText.innerHTML = cow.squareCapacity + separator + cow.resourceSquares.toLocaleString();
								checkToDisableBiome4Filter();																			break;
		case 'stardust':  	stardustCounterText.innerHTML = cow.resourceStardust.toLocaleString();
								// Update the Diamond Bar
								if (cow.resourceStardustBiome1 >= 1) { diamondBarPart1.value = cow.resourceStardustBiome1; }
								if (cow.resourceStardustBiome2 >= 1) { diamondBarPart2.value = cow.resourceStardustBiome2; }
								if (cow.resourceStardustBiome3 >= 1) { diamondBarPart3.value = cow.resourceStardustBiome3; }
								if (cow.resourceStardustBiome4 >= 1) { diamondBarPart4.value = cow.resourceStardustBiome4; }
								if (cow.resourceStardustBiome5 >= 1) { diamondBarPart5.value = cow.resourceStardustBiome5; }
								if (cow.resourceStardustBiome6 >= 1) { diamondBarPart6.value = cow.resourceStardustBiome6; }
								checkForDiamondBarCompletion();								break;
		default: break;
	}

	if (cow.endgameBarOwned == true) {
		switch (shape) {
			case 'diamond': 	if (cow.resourceEndgameBarDiamonds >= 1) { endgameBarPart1.value = cow.resourceEndgameBarDiamonds; }	break;
			case 'star': 		if (cow.resourceEndgameBarStars >= 1) { endgameBarPart2.value = cow.resourceEndgameBarStars; }			break;
			case 'hexagon': 	if (cow.resourceEndgameBarHexagons >= 1) { endgameBarPart3.value = cow.resourceEndgameBarHexagons; }	break;
			case 'triangle': 	if (cow.resourceEndgameBarTriangles >= 1) { endgameBarPart4.value = cow.resourceEndgameBarTriangles; }	break;
			case 'circle': 		if (cow.resourceEndgameBarCircles >= 1) { endgameBarPart5.value = cow.resourceEndgameBarCircles; }		break;
			case 'square': 		if (cow.resourceEndgameBarSquares >= 1) { endgameBarPart6.value = cow.resourceEndgameBarSquares; }		break;
			case 'pillar': 		if (cow.resourceEndgameBarSquares >= 1) { endgameBarPart6.value = cow.resourceEndgameBarSquares; }		break;
			case 'quad': 		if (cow.resourceEndgameBarSquares >= 1) { endgameBarPart6.value = cow.resourceEndgameBarSquares; }		break;
			default: break;
		}
	}
	recheckItemCostHighlighting();
	checkForGameVictory();
	// Upper left dynamic box resizing
	// Throttled in biome 4 and phase 3/postgame because this is performed more than necessary at those points
	if (lategameThrottle() == false) {
		cow.resourceCounterWidthArray[0] = cow.diamondCapacity.toString().length + cow.resourceDiamonds.toLocaleString().length;	// Collect the string lenghts of all the shapes
		cow.resourceCounterWidthArray[1] = cow.starCapacity.toString().length + cow.resourceStars.toLocaleString().length;
		cow.resourceCounterWidthArray[2] = cow.hexagonCapacity.toString().length + cow.resourceHexagons.toLocaleString().length;
		cow.resourceCounterWidthArray[3] = cow.triangleCapacity.toString().length + cow.resourceTriangles.toLocaleString().length;
		cow.resourceCounterWidthArray[4] = cow.circleCapacity.toString().length + cow.resourceCircles.toLocaleString().length;
		cow.resourceCounterWidthArray[5] = cow.squareCapacity.toString().length + cow.resourceSquares.toLocaleString().length;
		const q = Math.max.apply(Math,cow.resourceCounterWidthArray);								// Grab the largest number in the array
		const newSize = 100 + (q*7);
		if (cow.resourceCounterWidth != newSize) {													// If the calculated size is different than the current size..
			cow.resourceCounterWidth = newSize;
			modifyCSS('.upperLeftButton', 'width', newSize);										// ..Resize the resource box based on this number
		}
	}
}

function checkToDisableBiome4Filter() {
	if (cow.biome4CurrentSquareCount <= 0) {
		biome4Container.filters = '';
	}
}








function updateTextSpans(recursionTime) {
	// recheckItemCostHighlighting();			// Safer but very CPU intensive. Moved to updateResourceCounter() in v2.0
	// Shows or hides the buttons in the lower right biome select
	let r = 0;																						// Used to size the biome select bar
	if (cow.biome1Owned == true) { biome1Button.style.display = 'inline'; r++; } 				else { biome1Button.style.display = 'none'; }
	if (cow.biome2Owned == true) { biome2Button.style.display = 'inline'; r++; } 				else { biome2Button.style.display = 'none'; }
	if (cow.biome3Owned == true) { biome3Button.style.display = 'inline'; r++; } 				else { biome3Button.style.display = 'none'; }
	if (cow.biome4Owned == true) { biome4Button.style.display = 'inline'; r++; } 				else { biome4Button.style.display = 'none'; }
	if (cow.biome5Owned == true) { biome5Button.style.display = 'inline'; r++; } 				else { biome5Button.style.display = 'none'; }
	if (cow.biome6Owned == true) { biome6Button.style.display = 'inline'; r++; } 				else { biome6Button.style.display = 'none'; }
	if (cow.randomBiomesUnlocked == true) { biomeRandomButton.style.display = 'inline'; r++; } 	else { biomeRandomButton.style.display = 'none'; }
	if (r >= 2) {																					// If 2 or more biomes are owned
		modifyCSS('#biomeSelectBar', 'margin-left', (875 - (r*25)));								// Size the lower right biomes bar based on this number
		showBiomeBar();
	}
	// Shows or hides the buttons in the lower right upgrade bar
	// Contains requirements for displaying buttons to buy upgrades and biomes
	let s = 0;
	if (cow.triangleCapacity >= 6 && cow.biome2Owned == false) {	biome2PurchaseButton.style.display = 'inline'; s++; } 	else { biome2PurchaseButton.style.display = 'none'; }
	if (cow.diamondCapacity >= 6 && cow.biome3Owned == false) { 	biome3PurchaseButton.style.display = 'inline'; s++; } 	else { biome3PurchaseButton.style.display = 'none'; }
	if (cow.starCapacity >= 2 && cow.biome4Owned == false) {		biome4PurchaseButton.style.display = 'inline'; s++; } 	else { biome4PurchaseButton.style.display = 'none'; }
	if (cow.diamondCapacity >= 6 && cow.biome5Owned == false) { 	biome5PurchaseButton.style.display = 'inline'; s++; } 	else { biome5PurchaseButton.style.display = 'none'; }
	if (cow.circleCapacity >= 6 && cow.biome6Owned == false) { 		biome6PurchaseButton.style.display = 'inline'; s++; } 	else { biome6PurchaseButton.style.display = 'none'; }
	if (cow.diamondCapacity >= 4 && cow.maxDiamondCapacity == 10) {  															diamondMaxCapacity20PurchaseButton.style.display = 'inline'; 	s++; } 		else { diamondMaxCapacity20PurchaseButton.style.display = 'none'; }
	if (cow.diamondCapacity >= 17 && cow.maxDiamondCapacity == 20 && (cow.endgameBarOwned == true || cow.gameClear == true)) { 	diamondMaxCapacity30PurchaseButton.style.display = 'inline'; 	s++; } 		else { diamondMaxCapacity30PurchaseButton.style.display = 'none'; }
	if (cow.starCapacity >= 7 && cow.maxStarCapacity == 10) {																	starMaxCapacity20PurchaseButton.style.display = 'inline'; 		s++; } 		else { starMaxCapacity20PurchaseButton.style.display = 'none'; }
	if (cow.starCapacity >= 17 && cow.maxStarCapacity == 20 && (cow.endgameBarOwned == true || cow.gameClear == true)) { 		starMaxCapacity30PurchaseButton.style.display = 'inline'; 		s++; } 		else { starMaxCapacity30PurchaseButton.style.display = 'none'; }
	if (cow.hexagonCapacity >= 7 && cow.maxHexagonCapacity == 10) { 															hexagonMaxCapacity20PurchaseButton.style.display = 'inline'; 	s++; } 		else { hexagonMaxCapacity20PurchaseButton.style.display = 'none'; }
	if (cow.hexagonCapacity >= 17 && cow.maxHexagonCapacity == 20 && (cow.endgameBarOwned == true || cow.gameClear == true)) { 	hexagonMaxCapacity30PurchaseButton.style.display = 'inline'; 	s++; } 		else { hexagonMaxCapacity30PurchaseButton.style.display = 'none'; }
	if (cow.triangleCapacity >= 7 && cow.maxTriangleCapacity == 10) {															triangleMaxCapacity20PurchaseButton.style.display = 'inline'; 	s++; } 		else { triangleMaxCapacity20PurchaseButton.style.display = 'none'; }
	if (cow.triangleCapacity >= 17 && cow.maxTriangleCapacity == 20 && (cow.endgameBarOwned == true || cow.gameClear == true)) {triangleMaxCapacity30PurchaseButton.style.display = 'inline'; 	s++; } 		else { triangleMaxCapacity30PurchaseButton.style.display = 'none'; }
	if (cow.circleCapacity >= 7 && cow.maxCircleCapacity == 10) { 																circleMaxCapacity20PurchaseButton.style.display = 'inline'; 	s++; } 		else { circleMaxCapacity20PurchaseButton.style.display = 'none'; }
	if (cow.circleCapacity >= 17 && cow.maxCircleCapacity == 20 && (cow.endgameBarOwned == true || cow.gameClear == true)) { 	circleMaxCapacity30PurchaseButton.style.display = 'inline'; 	s++; } 		else { circleMaxCapacity30PurchaseButton.style.display = 'none'; }
	if (cow.squareCapacity >= 70 && cow.maxSquareCapacity == 100) { 															squareMaxCapacity200PurchaseButton.style.display = 'inline';	s++; } 		else { squareMaxCapacity200PurchaseButton.style.display = 'none'; }
	if (cow.squareCapacity >= 170 && cow.maxSquareCapacity == 200 && (cow.endgameBarOwned == true || cow.gameClear == true)) { 	squareMaxCapacity300PurchaseButton.style.display = 'inline';	s++; } 		else { squareMaxCapacity300PurchaseButton.style.display = 'none'; }
	if (cow.diamondCapacity >= 17 && cow.starCapacity >= 10 && cow.hexagonCapacity >= 17 && cow.triangleCapacity >= 17 && cow.circleCapacity >= 17 && cow.squareCapacity >= 170 && cow.diamondBarOwned == false && cow.endgameBarOwned == false && cow.gameClear == false) {
																																						diamondBarPurchaseButton.style.display = 'inline';			s++; }								else { diamondBarPurchaseButton.style.display = 'none'; }
	if ((cow.diamondBarOwned == true || cow.gameClear == true) && cow.stardustSpawnBoost1Owned == false) {												stardustChance100PurchaseButton.style.display = 'inline'; 	s++; } 								else { stardustChance100PurchaseButton.style.display = 'none'; }
	if ((cow.endgameBarOwned == true || cow.gameClear == true) && cow.stardustSpawnBoost1Owned == true && cow.stardustSpawnBoost2Owned == false) {		stardustChance20PurchaseButton.style.display = 'inline'; 	s++; } 								else { stardustChance20PurchaseButton.style.display = 'none'; }
	if (s == 0) { hideUpgradeBar(); } else { 									// Hide upgrade bar if nothing is buyable
		modifyCSS('#upgradeBar', 'margin-left', (875 - (s*25)));				// Size the lower right upgrades bar based on this number
		if (upgradeBar.style.display == 'none') {								// If there is an upgrade available and the bar is hidden..
			showUpgradeBar();													// ..display the bar
		}
	 }
	// Hide unused currencies
	if (cow.starCapacity >= 2 || cow.resourceStars >= 1)																						{ starButtonSpan.style.display = 'inline'; } 		else { starButtonSpan.style.display = 'none'; }
	if (cow.biome2Owned == true || cow.biome5Owned == true || cow.resourceHexagons >= 1 || cow.hexagonCapacity >= 1)							{ hexagonButtonSpan.style.display = 'inline'; } 	else { hexagonButtonSpan.style.display = 'none'; }
	if (cow.biome3Owned == true || cow.resourceTriangles >= 1 || cow.triangleCapacity >= 1)														{ triangleButtonSpan.style.display = 'inline'; } 	else { triangleButtonSpan.style.display = 'none'; }
	if (cow.biome3Owned == true || cow.biome5Owned == true || cow.biome6Owned == true || cow.resourceCircles >= 1 || cow.circleCapacity >= 1) 	{ circleButtonSpan.style.display = 'inline'; }		else { circleButtonSpan.style.display = 'none'; }
	if (cow.biome4Owned == true || cow.resourceSquares >= 1 || cow.squareCapacity >= 1)															{ squareButtonSpan.style.display = 'inline'; }		else { squareButtonSpan.style.display = 'none'; }
	if (cow.resourceStardust >= 1 || cow.stardustSpawnBoost1Owned == true || cow.stardustSpawnBoost2Owned == true)								{ stardustButtonSpan.style.display = 'inline'; } 	else { stardustButtonSpan.style.display = 'none'; }

	// Allows the function to be called recursively or not
	if (recursionTime > 1000) { setTimeout(updateTextSpans, recursionTime, recursionTime); }
}
















function initializeProgressBars() {
	// Maximums
	diamondBarPart1.max = 15;
	diamondBarPart2.max = 15;
	diamondBarPart3.max = 15;
	diamondBarPart4.max = 15;
	diamondBarPart5.max = 15;
	diamondBarPart6.max = 15;
	endgameBarPart1.max = 800;
	endgameBarPart2.max = 2400;
	endgameBarPart3.max = 3200;
	endgameBarPart4.max = 4800;
	endgameBarPart5.max = 2400;
	endgameBarPart6.max = 6400;

	// Current progress bar state (somewhat redundant but added for safety after a weird Firefox behavior)
	diamondBarPart1.value = cow.resourceStardustBiome1;
	diamondBarPart2.value = cow.resourceStardustBiome2;
	diamondBarPart3.value = cow.resourceStardustBiome3;
	diamondBarPart4.value = cow.resourceStardustBiome4;
	diamondBarPart5.value = cow.resourceStardustBiome5;
	diamondBarPart6.value = cow.resourceStardustBiome6;
	endgameBarPart1.value = cow.resourceEndgameBarDiamonds;
	endgameBarPart2.value = cow.resourceEndgameBarStars;
	endgameBarPart3.value = cow.resourceEndgameBarHexagons;
	endgameBarPart4.value = cow.resourceEndgameBarTriangles;
	endgameBarPart5.value = cow.resourceEndgameBarCircles;
	endgameBarPart6.value = cow.resourceEndgameBarSquares;

	// Prevents IE from displaying annoying pre-progress animation
	// These get overwritten later in the loading process if the value is going to be >= 1
	if (cow.userWebBrowser == 'IE') {
		const q = 0.01;
		if (cow.resourceStardustBiome1 == 0) 		{ diamondBarPart1.value = q; }
		if (cow.resourceStardustBiome2 == 0) 		{ diamondBarPart2.value = q; }
		if (cow.resourceStardustBiome3 == 0) 		{ diamondBarPart3.value = q; }
		if (cow.resourceStardustBiome4 == 0) 		{ diamondBarPart4.value = q; }
		if (cow.resourceStardustBiome5 == 0) 		{ diamondBarPart5.value = q; }
		if (cow.resourceStardustBiome6 == 0) 		{ diamondBarPart6.value = q; }
		if (cow.resourceEndgameBarDiamonds == 0) 	{ endgameBarPart1.value = q; }
		if (cow.resourceEndgameBarStars == 0) 		{ endgameBarPart2.value = q; }
		if (cow.resourceEndgameBarHexagons == 0) 	{ endgameBarPart3.value = q; }
		if (cow.resourceEndgameBarTriangles == 0) 	{ endgameBarPart4.value = q; }
		if (cow.resourceEndgameBarCircles == 0) 	{ endgameBarPart5.value = q; }
		if (cow.resourceEndgameBarSquares == 0) 	{ endgameBarPart6.value = q; }
	}
}

function checkForDiamondBarCompletion() {
	if (cow.resourceStardustBiome1 >=15 && cow.resourceStardustBiome2 >=15 && cow.resourceStardustBiome3 >=15 && cow.resourceStardustBiome4 >=15 && cow.resourceStardustBiome5 >=15 && cow.resourceStardustBiome6 >=15 && cow.diamondBarOwned == true && cow.resourceEndgameBarDiamonds == 0) {
		cow.resourceEndgameBarDiamonds = 1;							// Minor hack to prevent this from being called twice if two rare spawns happen at once to finish off the Diamond Bar
		setTimeout(hideDiamondBar, 10000);							// Bunch of time delays so that you can see the diamond bar be 100% filled for a moment, and so that no player progress is lost
		setTimeout(function() { playAudio('SFXc/diamondBarClear', 'sfx', 450, true); }, 10000);
		setTimeout(function() { cow.diamondBarOwned = false; }, 14500);
		setTimeout(function() { cow.endgameBarOwned = true; }, 14500);
		setTimeout(showEndgameBar, 15000);
		setTimeout(function() { cow.resourceStardustBiome1 = 0; }, 15500);
		setTimeout(function() { cow.resourceStardustBiome2 = 0; }, 15500);
		setTimeout(function() { cow.resourceStardustBiome3 = 0; }, 15500);
		setTimeout(function() { cow.resourceStardustBiome4 = 0; }, 15500);
		setTimeout(function() { cow.resourceStardustBiome5 = 0; }, 15500);
		setTimeout(function() { cow.resourceStardustBiome6 = 0; }, 15500);
		setTimeout(function() { cow.randomBiomesUnlocked = true; }, 15500);
		setTimeout(saveGame, 15555);
	}
}

function checkForGameVictory() {
	if (cow.resourceEndgameBarDiamonds >=800 && cow.resourceEndgameBarStars >=2400 && cow.resourceEndgameBarHexagons >=3200 && cow.resourceEndgameBarTriangles >=4800 && cow.resourceEndgameBarCircles >=2400 && cow.resourceEndgameBarSquares >=6400
		&& cow.creditsActivated == false && cow.endgameBarOwned == true) {
		beginCredits();
	}
}

function showBiomeBar() {
	biomeSelectBar.style.display = 'inline';
	modifyCSS('#upgradeBar', 'margin-top', -85);						// move up the upgrades bar
}

function showUpgradeBar() {
	upgradeBar.style.display = 'inline';
}

function hideUpgradeBar() {
	upgradeBar.style.display = 'none';
}
















function disableBiomeButtons() {
	if (biome1ButtonImage.src.slice(biome1ButtonImage.src.length-16) != 'Images/biome1.png') 	{ biome1ButtonImage.src = 'Images/biome1.png'; }		// Sets all the images to white
	if (biome2ButtonImage.src.slice(biome2ButtonImage.src.length-16) != 'Images/biome2.png') 	{ biome2ButtonImage.src = 'Images/biome2.png'; }		// But not if they're already white
	if (biome3ButtonImage.src.slice(biome3ButtonImage.src.length-16) != 'Images/biome3.png')	{ biome3ButtonImage.src = 'Images/biome3.png'; }
	if (biome4ButtonImage.src.slice(biome4ButtonImage.src.length-16) != 'Images/biome4.png') 	{ biome4ButtonImage.src = 'Images/biome4.png'; }
	if (biome5ButtonImage.src.slice(biome5ButtonImage.src.length-16) != 'Images/biome5.png') 	{ biome5ButtonImage.src = 'Images/biome5.png'; }
	if (biome6ButtonImage.src.slice(biome6ButtonImage.src.length-16) != 'Images/biome6.png') 	{ biome6ButtonImage.src = 'Images/biome6.png'; }
	const q = 0.5;
	biome1ButtonImage.style.opacity = q;								// Turn down all the opacities
	biome2ButtonImage.style.opacity = q;
	biome3ButtonImage.style.opacity = q;
	biome4ButtonImage.style.opacity = q;
	biome5ButtonImage.style.opacity = q;
	biome6ButtonImage.style.opacity = q;
	biomeRandomPNG.style.opacity = q;
	biome1Button.disabled = false;										// Activate all the biome buttons
	biome2Button.disabled = false;
	biome3Button.disabled = false;
	biome4Button.disabled = false;
	biome5Button.disabled = false;
	biome6Button.disabled = false;
	biomeRandomButton.disabled = false;
}




// Switch biomes
function changeBiome(location, skipStepsForRandomBiomes) {
	cow.currentBiome = location;										// change the current biome variable

	if (skipStepsForRandomBiomes == true) {								// set the flag to spawn a new BG gradient
		if (rngRange(1,100) > 96) {										// and throttle it hard for randomBiomes
			cow.spawnNewBGgradient = true;
		}
	} else {
		cow.spawnNewBGgradient = true;
	}

	if (location == 'biome4') {
		// Smog filter for biome4
		const shader = plainGradient(0xFFFFFF, 0xAAAAAA)				// Applies gradient overlay to all shapes
		biome4Container.filters = [shader];								//
	}

	if (skipStepsForRandomBiomes != true) { 							// Skips a bunch of stuff if this is being called from the biome randomizer
		disableBiomeButtons();
		switch (location) {
			case 'biome1':
				biome1ButtonImage.style.opacity = 0.7;					// Turns the opacity up
				biome1Button.innerHTML = "<image src='Images/biome1Color" + rngRange(1,3) + ".png' id='biome1ButtonImage' class='diamondButtonImage firefoxHack'></image>";		// color change
				biome1Button.disabled = true;							// prevent the button from being clicked
				break;
			case 'biome2':
				biome2ButtonImage.style.opacity = 0.7;
				biome2Button.innerHTML = "<image src='Images/biome2Color" + rngRange(1,3) + ".png' id='biome2ButtonImage' class='hexagonButtonImage firefoxHack3'></image>";
				biome2Button.disabled = true;
				break;
			case 'biome3':
				biome3ButtonImage.style.opacity = 0.7;
				biome3Button.innerHTML = "<image src='Images/biome3Color" + rngRange(1,3) + ".png' id='biome3ButtonImage' class='triangleButtonImage firefoxHack'></image>";
				biome3Button.disabled = true;
				break;
			case 'biome4':
				biome4ButtonImage.style.opacity = 0.7;
				biome4Button.innerHTML = "<image src='Images/biome4Color" + rngRange(1,3) + ".png' id='biome4ButtonImage' class='squareButtonImage firefoxHack'></image>";
				biome4Button.disabled = true;
				break;
			case 'biome5':
				biome5ButtonImage.style.opacity = 0.7;
				biome5Button.innerHTML = "<image src='Images/biome5Color" + rngRange(1,3) + ".png' id='biome5ButtonImage' class='circleButtonImage firefoxHack'></image>";
				biome5Button.disabled = true;
				break;
			case 'biome6':
				biome6ButtonImage.style.opacity = 0.7;
				biome6Button.innerHTML = "<image src='Images/biome6Color" + rngRange(1,3) + ".png' id='biome6ButtonImage' class='starButtonImage firefoxHack3'></image>";
				biome6Button.disabled = true;
				break;
			default: break;
		}
		saveGame();
	}
}




function randomBiomes(trigger) {
	if (trigger == 'activate') { cow.randomBiomesActive = true; cow.bgTransitionSpeed = 5; }
	if (cow.randomBiomesActive == true) {
		switch(rngRange(1,6)) {
			case 1: changeBiome('biome1', true); break;
			case 2: changeBiome('biome2', true); break;
			case 3: changeBiome('biome3', true); break;
			case 4: if (rngRange(1,2) == 2) { changeBiome('biome4', true); } break;		// Lower odds because it clogs up the screen
			case 5: changeBiome('biome5', true); break;
			case 6: changeBiome('biome6', true); break;
			default: break;
		}
		disableBiomeButtons();
		biomeRandomButton.innerHTML = "<image id='biomeRandomPNG' src='Images/diamondBarColor" + rngRange(1,7) + ".png' class='biomeRandomImage firefoxHack6'></image>";
		biomeRandomButton.disabled = true;
		setTimeout(randomBiomes, 5000);								// 5 seconds
	}
}




function stopRandomization() {
	biomeRandomButton.innerHTML = "<image id='biomeRandomPNG' src='Images/diamondBar.png' class='biomeRandomImage firefoxHack6'></image>";
	cow.randomBiomesActive = false;
	cow.bgTransitionSpeed = 5;
}




function clearUIwhenMouseExitsWindow() {
	clearPricesSpan();																// This whole function triggers on 10% of all Chrome windows mouseclicks, ruining the options menu. Acceptable loss
	//newFade(optionsMenu, 0, 0.25);												// Maybe they'll fix it later
}




function globalClickBoost() {
	if (cow.allowClickBoost == true) { go(); }

	function go() {
		cow.allowClickBoost = false;
		cow.boostMultiplier = Math.sin(cow.boostCounter) * 3;
		cow.boostCounter += 0.04;
		if (cow.boostCounter >= 3.1) {
			cow.boostCounter = 0;
			cow.boostMultiplier = 0;
			cow.allowClickBoost = true;
		} else { window.requestAnimationFrame(go); }
	}
}




function newGameStuff() {
	if (cow.diamondCapacity == 1 && cow.resourceDiamonds == 0) { 					// Triggers on a new game only
		cow.currentBiome = 'biome1';
	}
}




function kongregateStuff() {
	kongregateAPI.loadAPI(function(){												// Initialize
		window.kongregate = kongregateAPI.getAPI();									//

		cow.kongUsername = kongregate.services.getUsername();						// Get username for the savefile
		// if (kongregate.services.isGuest()) { cow.kongUsername = 'guest'; }		// Already covered by the API

		kongregate.services.addEventListener('login', kongLiveLogin);				// Recognize live page logins, and execute this function

		function kongLiveLogin() {
			const x = kongregate.services.getUsername();
			console.log('Kong username changed to: ' + x);
			cow.kongUsername = x;													// This is OK because the new username isn't saved
			initializeGameTwo();
		}

		function submitScores() {													// High Scores and future badges
			kongregate.stats.submit("Lifetime Shapes", cow.kongLifetimeShapes);
			if (cow.kongFirstBiomePurchased == true) { kongregate.stats.submit("First Biome", 1); }				 // Easy		Explorer			Unlock your first new biome
			if (cow.kongDiamondBarUnlocked == true) { kongregate.stats.submit("Research Phase", 1); }			 // Medium		Technologist		Begin the research phase
			if (cow.gameClear == true) { kongregate.stats.submit("Game Clear", 1); }							 // Hard		Transhuman			Complete the game
			if (cow.kongStrayNightmareDiscovered == true) { kongregate.stats.submit("Stray Nightmare", 1); }	 // Impossible	Stray Nightmare		Find a Ghost in the machine
			setTimeout(submitScores, 30000);
		}

		submitScores();
	});
}
























// Activate the game and everything
// Safer to use as an onLoad function in case something (pixi.js) stalls the HTML elements from loading..
// ..which breaks the game when they then get referenced before they exist
function initializeGameOne() {
	browserCheck()															// We need the CAF/OPUS data for the preloader
	audioFormatSetup();													
	preloadFiles();
	kongregateStuff();
}

function initializeGameTwo(gameType) {
	// Things that need to load first
	if (gameType == 'normal') { loadGame(); }
	if (gameType == 'resumeDemo' ) { startGameResumeDemo(); }
	newGameStuff();
	if (cow.randomBiomesActive == false) { changeBiome(cow.currentBiome); }	// Activate biome from last play session
	if (cow.randomBiomesActive == true) { randomBiomes('activate'); }		// Or randomBiome, if applicable
	// Things that should load first to look good
	updateTextSpans(3000);													// Every 3 seconds
	initializeProgressBars();
	// Things that affect the UI but can take a while
	updateResourceCounter('diamond');										// Takes a few milleseconds each time, noticeable in Firefox
	updateResourceCounter('star');											// Includes recheckItemCostHighlighting() as of v2.0
	updateResourceCounter('hexagon');
	updateResourceCounter('triangle');
	updateResourceCounter('circle');
	updateResourceCounter('square');
	updateResourceCounter('stardust');
	document.body.addEventListener('click', globalClickBoost);
	resourceCounter.style.display = 'inline';								// Hides resourceCounter until the previous things have completed. Makes startup look cleaner
	optionsMenuButton.className = 'visible';
}

function initializeGameThree() {
	// Things that don't need to load quickly
	initializeVolumeDisplays();
	biomeSpawnController();													// Needs to go before updateResourceCounter or the smog filter won't spawn
	rareSpawnController();
	fadeInBackgroundTexture();
	setTimeout(musicSpawnController, 90000);								// 90 seconds
	setTimeout(forceIconRecolorize, 120000);								// 120 seconds
	setTimeout(saveGameRecursive, 60000);									// 60 seconds
	setTimeout(displayGameTitle, 30000);									// 30 seconds
}


// Does things at 60FPS
app.ticker.add(function() {
	//stardustCounterText.innerHTML = Math.round(app.ticker.FPS) + ' FPS';
});