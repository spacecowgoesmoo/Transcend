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

	kongUsername: '',
	kongLifetimeShapes: 0,
	kongFirstBiomePurchased: false,
	kongDiamondBarUnlocked: false,
	kongStrayNightmareDiscovered: false,

	bgmVolume: 80,
	sfxVolume: 80,
	audioFormat: '.opus',
	muteAudioForIE: false,
	hideMusicText: false,

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
								checkToDisableBiome4Filter();																										break;
		case 'quad': 		squareCounterText.innerHTML = cow.squareCapacity + separator + cow.resourceSquares.toLocaleString();
								checkToDisableBiome4Filter();																										break;
		case 'stardust':  	stardustCounterText.innerHTML = cow.resourceStardust.toLocaleString();
								// Update the Diamond Bar
								diamondBarPart1.value = cow.resourceStardustBiome1;
								diamondBarPart2.value = cow.resourceStardustBiome2;
								diamondBarPart3.value = cow.resourceStardustBiome3;
								diamondBarPart4.value = cow.resourceStardustBiome4;
								diamondBarPart5.value = cow.resourceStardustBiome5;
								diamondBarPart6.value = cow.resourceStardustBiome6;
								checkForDiamondBarCompletion();								break;
		default: break;
	}

	if (cow.endgameBarOwned == true) {
		switch (shape) {
			case 'diamond': 	endgameBarPart1.value = cow.resourceEndgameBarDiamonds;		break;
			case 'star': 		endgameBarPart2.value = cow.resourceEndgameBarStars;		break;
			case 'hexagon': 	endgameBarPart3.value = cow.resourceEndgameBarHexagons;		break;
			case 'triangle': 	endgameBarPart4.value = cow.resourceEndgameBarTriangles;	break;
			case 'circle': 		endgameBarPart5.value = cow.resourceEndgameBarCircles;		break;
			case 'square': 		endgameBarPart6.value = cow.resourceEndgameBarSquares;		break;
			case 'pillar': 		endgameBarPart6.value = cow.resourceEndgameBarSquares;		break;
			case 'quad': 		endgameBarPart6.value = cow.resourceEndgameBarSquares;		break;
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
	// recheckItemCostHighlighting();			// Safer but very CPU intensive. Moved to updateResourceCounter() in v1.03
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
	if (cow.diamondCapacity >= 4 && cow.maxDiamondCapacity == 10) {  									diamondMaxCapacity20PurchaseButton.style.display = 'inline'; 	s++; } 		else { diamondMaxCapacity20PurchaseButton.style.display = 'none'; }
	if (cow.diamondCapacity >= 17 && cow.maxDiamondCapacity == 20 && cow.diamondBarOwned == true) { 	diamondMaxCapacity30PurchaseButton.style.display = 'inline'; 	s++; } 		else { diamondMaxCapacity30PurchaseButton.style.display = 'none'; }
	if (cow.starCapacity >= 7 && cow.maxStarCapacity == 10) {											starMaxCapacity20PurchaseButton.style.display = 'inline'; 		s++; } 		else { starMaxCapacity20PurchaseButton.style.display = 'none'; }
	if (cow.starCapacity >= 17 && cow.maxStarCapacity == 20 && cow.diamondBarOwned == true) { 			starMaxCapacity30PurchaseButton.style.display = 'inline'; 		s++; } 		else { starMaxCapacity30PurchaseButton.style.display = 'none'; }
	if (cow.hexagonCapacity >= 7 && cow.maxHexagonCapacity == 10) { 									hexagonMaxCapacity20PurchaseButton.style.display = 'inline'; 	s++; } 		else { hexagonMaxCapacity20PurchaseButton.style.display = 'none'; }
	if (cow.hexagonCapacity >= 17 && cow.maxHexagonCapacity == 20 && cow.diamondBarOwned == true) { 	hexagonMaxCapacity30PurchaseButton.style.display = 'inline'; 	s++; } 		else { hexagonMaxCapacity30PurchaseButton.style.display = 'none'; }
	if (cow.triangleCapacity >= 7 && cow.maxTriangleCapacity == 10) {									triangleMaxCapacity20PurchaseButton.style.display = 'inline'; 	s++; } 		else { triangleMaxCapacity20PurchaseButton.style.display = 'none'; }
	if (cow.triangleCapacity >= 17 && cow.maxTriangleCapacity == 20 && cow.diamondBarOwned == true) {	triangleMaxCapacity30PurchaseButton.style.display = 'inline'; 	s++; } 		else { triangleMaxCapacity30PurchaseButton.style.display = 'none'; }
	if (cow.circleCapacity >= 7 && cow.maxCircleCapacity == 10) { 										circleMaxCapacity20PurchaseButton.style.display = 'inline'; 	s++; } 		else { circleMaxCapacity20PurchaseButton.style.display = 'none'; }
	if (cow.circleCapacity >= 17 && cow.maxCircleCapacity == 20 && cow.diamondBarOwned == true) { 		circleMaxCapacity30PurchaseButton.style.display = 'inline'; 	s++; } 		else { circleMaxCapacity30PurchaseButton.style.display = 'none'; }
	if (cow.squareCapacity >= 70 && cow.maxSquareCapacity == 100) { 									squareMaxCapacity200PurchaseButton.style.display = 'inline';	s++; } 		else { squareMaxCapacity200PurchaseButton.style.display = 'none'; }
	if (cow.squareCapacity >= 170 && cow.maxSquareCapacity == 200 && cow.diamondBarOwned == true) { 	squareMaxCapacity300PurchaseButton.style.display = 'inline';	s++; } 		else { squareMaxCapacity300PurchaseButton.style.display = 'none'; }
	if (cow.diamondCapacity >= 17 && cow.starCapacity >= 10 && cow.hexagonCapacity >= 17 && cow.triangleCapacity >= 17 && cow.circleCapacity >= 17 && cow.squareCapacity >= 170 && cow.diamondBarOwned == false && cow.endgameBarOwned == false && cow.gameClear == false) {
																					diamondBarPurchaseButton.style.display = 'inline';			s++; }								else { diamondBarPurchaseButton.style.display = 'none'; }
	if (cow.diamondBarOwned == true && cow.stardustSpawnBoost1Owned == false) {		stardustChance100PurchaseButton.style.display = 'inline'; 	s++; } 								else { stardustChance100PurchaseButton.style.display = 'none'; }
	if (cow.endgameBarOwned == true && cow.stardustSpawnBoost2Owned == false) {		stardustChance20PurchaseButton.style.display = 'inline'; 	s++; } 								else { stardustChance20PurchaseButton.style.display = 'none'; }
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

	if (recursionTime > 1000) { setTimeout(updateTextSpans, recursionTime); }	// Allows the function to be called recursively or not
}
















function initializeProgressBars() {
	diamondBarPart1.max = 20;
	diamondBarPart2.max = 20;
	diamondBarPart3.max = 20;
	diamondBarPart4.max = 20;
	diamondBarPart5.max = 20;
	diamondBarPart6.max = 20;
	endgameBarPart1.max = 1000;
	endgameBarPart2.max = 3000;
	endgameBarPart3.max = 4000;
	endgameBarPart4.max = 6000;
	endgameBarPart5.max = 3000;
	endgameBarPart6.max = 8000;
}

function checkForGameVictory() {
	if (cow.resourceEndgameBarDiamonds >=1000 && cow.resourceEndgameBarStars >=3000 && cow.resourceEndgameBarHexagons >=4000 && cow.resourceEndgameBarTriangles >=6000 && cow.resourceEndgameBarCircles >=3000 && cow.resourceEndgameBarSquares >=8000
		&& cow.creditsActivated == false && cow.endgameBarOwned == true) {
		cow.creditsActivated = true;									// prevents credits sequence from spawning with every shape lol
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
	if (biome1ButtonImage.src.slice(biome1ButtonImage.src.length-18) != 'Images/diamond.png') 	{ biome1ButtonImage.src = 'Images/diamond.png'; }		// Sets all the images to white
	if (biome2ButtonImage.src.slice(biome2ButtonImage.src.length-18) != 'Images/hexagon.png') 	{ biome2ButtonImage.src = 'Images/hexagon.png'; }		// But not if they're already white
	if (biome3ButtonImage.src.slice(biome3ButtonImage.src.length-19) != 'Images/triangle.png')	{ biome3ButtonImage.src = 'Images/triangle.png'; }
	if (biome4ButtonImage.src.slice(biome4ButtonImage.src.length-17) != 'Images/square.png') 	{ biome4ButtonImage.src = 'Images/square.png'; }
	if (biome5ButtonImage.src.slice(biome5ButtonImage.src.length-17) != 'Images/circle.png') 	{ biome5ButtonImage.src = 'Images/circle.png'; }
	if (biome6ButtonImage.src.slice(biome6ButtonImage.src.length-15) != 'Images/star.png') 		{ biome6ButtonImage.src = 'Images/star.png'; }
	biome1ButtonImage.style.opacity = 0.075;							// Turn down all the opacities
	biome2ButtonImage.style.opacity = 0.075;
	biome3ButtonImage.style.opacity = 0.075;
	biome4ButtonImage.style.opacity = 0.075;
	biome5ButtonImage.style.opacity = 0.075;
	biome6ButtonImage.style.opacity = 0.075;
	biomeRandomPNG.style.opacity = 0.075;
	biome1Button.disabled = false;										// Activate all the biome buttons
	biome2Button.disabled = false;
	biome3Button.disabled = false;
	biome4Button.disabled = false;
	biome5Button.disabled = false;
	biome6Button.disabled = false;
	biomeRandomButton.disabled = false;
}




// Switch biomes
function changeBiome(location, randomSaveCPU) {
	cow.currentBiome = location;										// change the current biome variable
	cow.spawnNewBGgradient = true;										// set the flag to spawn a new BG gradient

	if (location == 'biome4') {
		// Smog filter for biome4
		const shader = plainGradient(0xFFFFFF, 0xAAAAAA)				// Applies gradient overlay to all shapes
		biome4Container.filters = [shader];								//
	}

	if (randomSaveCPU != false) { 										// Skips a bunch of stuff if this is being called from the biome randomizer
		disableBiomeButtons();
		switch (location) {
			case 'biome1':
				biome1ButtonImage.style.opacity = 0.7;					// Turns the opacity up
				biome1Button.innerHTML = "<image src='Images/diamondColor" + rngRange(1,3) + ".png' id='biome1ButtonImage' class='diamondButtonImage firefoxHack'></image>";		// color change
				biome1Button.disabled = true;							// prevent the button from being clicked
				break;
			case 'biome2':
				biome2ButtonImage.style.opacity = 0.7;
				biome2Button.innerHTML = "<image src='Images/hexagonColor" + rngRange(1,3) + ".png' id='biome2ButtonImage' class='hexagonButtonImage firefoxHack3'></image>";
				biome2Button.disabled = true;
				break;
			case 'biome3':
				biome3ButtonImage.style.opacity = 0.7;
				biome3Button.innerHTML = "<image src='Images/triangleColor" + rngRange(1,3) + ".png' id='biome3ButtonImage' class='triangleButtonImage firefoxHack'></image>";
				biome3Button.disabled = true;
				break;
			case 'biome4':
				biome4ButtonImage.style.opacity = 0.7;
				biome4Button.innerHTML = "<image src='Images/squareColor" + rngRange(1,3) + ".png' id='biome4ButtonImage' class='squareButtonImage firefoxHack'></image>";
				biome4Button.disabled = true;
				break;
			case 'biome5':
				biome5ButtonImage.style.opacity = 0.7;
				biome5Button.innerHTML = "<image src='Images/circleColor" + rngRange(1,3) + ".png' id='biome5ButtonImage' class='circleButtonImage firefoxHack'></image>";
				biome5Button.disabled = true;
				break;
			case 'biome6':
				biome6ButtonImage.style.opacity = 0.7;
				biome6Button.innerHTML = "<image src='Images/starColor" + rngRange(1,3) + ".png' id='biome6ButtonImage' class='starButtonImage firefoxHack3'></image>";
				biome6Button.disabled = true;
				break;
			default: break;
		}
		// Icon colors: yellow red lightM blue red lightM
		saveGame();
	}
}




function randomBiomes(trigger) {
	if (trigger == 'activate') { cow.randomBiomesActive = true; cow.bgTransitionSpeed = 1; }
	if (cow.randomBiomesActive == true) {
		switch(rngRange(1,6)) {
			case 1: changeBiome('biome1', false); break;
			case 2: changeBiome('biome2', false); break;
			case 3: changeBiome('biome3', false); break;
			case 4: if (rngRange(1,2) == 2) { changeBiome('biome4', false); } break;		// Lower odds because it clogs up the screen
			case 5: changeBiome('biome5', false); break;
			case 6: changeBiome('biome6', false); break;
			default: break;
		}
		disableBiomeButtons();
		biomeRandomPNG.style.opacity = rngRange(4,7)/10;			// Simulates color changes, but more cheaply
		biomeRandomButton.disabled = true;
		setTimeout(randomBiomes, 5000);								// 5 seconds
	}
}




function stopRandomization() {
	cow.randomBiomesActive = false;
	cow.bgTransitionSpeed = 5;
}




function clearUIwhenMouseExitsWindow() {
	clearPricesSpan();																// This whole function triggers on 10% of all Chrome windows mouseclicks, ruining the options menu. Acceptable loss
	//newFade(optionsMenu, 0, 0.25);												// Maybe they'll fix it later
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
// ..which breaks the game when they then get called before they exist
function initializeGameOne() {
	browserAudioCheck();													// We need the CAF/OPUS data for the preloader
	preloadFiles();
	kongregateStuff();
}

function initializeGameTwo() {
	// Things that need to load first
	loadGame();
	browserAudioCheck();													// This line is a patch but fixing it properly would be even more fragile
	newGameStuff();
	if (cow.randomBiomesActive == false) { changeBiome(cow.currentBiome); }	// Activate biome from last play session
	if (cow.randomBiomesActive == true) { randomBiomes('activate'); }		// Or randomBiome, if applicable
	// Things that should load first to look good
	updateTextSpans(3000);													// Every 3 seconds
	initializeProgressBars();
	// Things that affect the UI but can take a while
	updateResourceCounter('diamond');										// Takes a few milleseconds each time, noticeable in Firefox
	updateResourceCounter('star');											// Includes recheckItemCostHighlighting() as of v1.03
	updateResourceCounter('hexagon');
	updateResourceCounter('triangle');
	updateResourceCounter('circle');
	updateResourceCounter('square');
	updateResourceCounter('stardust');
	resourceCounter.style.display = 'inline';								// Hides resourceCounter until the previous things have completed. Makes startup look cleaner
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
	//console.log(optionsMenuButton.style.opacity);
});