// Buy shapes
function buyDiamond() {
	if (cow.resourceDiamonds >= cow.nextDiamondPrice && cow.diamondCapacity < cow.maxDiamondCapacity) {			// If player can afford upgrade, and shape is not maxed out
		cow.resourceDiamonds -= cow.nextDiamondPrice;															// Spend the resources
		cow.nextDiamondPrice = Math.ceil(cow.nextDiamondPrice * 1.13);											// Increase the cost for the next one
		cow.diamondCapacity++;																					// Get the new resource
		showDiamondCost();																						// Update the price display
		updateResourceCounter('diamond');
		recheckItemCostHighlighting();
		playAudio('SFXc/buyShape' + rngRange(1,7), 'sfx', 450, true);
		saveGame();
	}
}

function buyStar() {
	if (cow.resourceStars >= cow.nextStarPrice && cow.starCapacity < cow.maxStarCapacity) {
		cow.resourceStars -= cow.nextStarPrice;
		cow.nextStarPrice = Math.ceil(cow.nextStarPrice * 1.1);
		cow.starCapacity++;
		showStarCost();
		updateResourceCounter('star');
		recheckItemCostHighlighting();
		playAudio('SFXc/buyShape' + rngRange(1,7), 'sfx', 450, true);
		saveGame();
	}
}

function buyHexagon() {
	if (cow.resourceHexagons >= cow.nextHexagonPrice && cow.hexagonCapacity < cow.maxHexagonCapacity) {
		cow.resourceHexagons -= cow.nextHexagonPrice;
		cow.nextHexagonPrice = Math.ceil(cow.nextHexagonPrice * 1.11);
		cow.hexagonCapacity++;
		showHexagonCost();
		updateResourceCounter('hexagon');
		recheckItemCostHighlighting();
		playAudio('SFXc/buyShape' + rngRange(1,7), 'sfx', 450, true);
		saveGame();
	}
}

function buyTriangle() {
	if (cow.resourceTriangles >= cow.nextTrianglePrice && cow.triangleCapacity < cow.maxTriangleCapacity) {
		cow.resourceTriangles -= cow.nextTrianglePrice;
		cow.nextTrianglePrice = Math.ceil(cow.nextTrianglePrice * 1.1);
		cow.triangleCapacity++;
		showTriangleCost();
		updateResourceCounter('triangle');
		recheckItemCostHighlighting();
		playAudio('SFXc/buyShape' + rngRange(1,7), 'sfx', 450, true);
		saveGame();
	}
}

function buyCircle() {
	if (cow.resourceCircles >= cow.nextCirclePrice && cow.circleCapacity < cow.maxCircleCapacity) {
		cow.resourceCircles -= cow.nextCirclePrice;
		cow.nextCirclePrice = Math.ceil(cow.nextCirclePrice * 1.1);
		cow.circleCapacity++;
		showCircleCost();
		updateResourceCounter('circle');
		recheckItemCostHighlighting();
		playAudio('SFXc/buyShape' + rngRange(1,7), 'sfx', 450, true);
		saveGame();
	}
}

function buySquare() {
	if (cow.resourceSquares >= cow.nextSquarePrice && cow.squareCapacity < cow.maxSquareCapacity) {
		cow.resourceSquares -= cow.nextSquarePrice;
		cow.nextSquarePrice = Math.ceil(cow.nextSquarePrice * 1.08);
		cow.squareCapacity+= 10;
		showSquareCost();
		updateResourceCounter('square');
		recheckItemCostHighlighting();
		playAudio('SFXc/buyShape' + rngRange(1,7), 'sfx', 450, true);
		saveGame();
	}
}
















function buyBiome2() {
	if (cow.resourceTriangles >= 500) {
		cow.resourceTriangles -= 500;
		cow.biome2Owned = true;
		if (cow.hexagonCapacity == 0) { cow.hexagonCapacity = 1; }
		clearPricesSpan();
		updateResourceCounter('triangle');
		updateResourceCounter('hexagon');
		updateTextSpans(false);
		playAudio('SFXc/newBiome' + rngRange(1,3), 'sfx', 450, true);
		saveGame();
	}
}

function buyBiome3() {
	if (cow.resourceDiamonds >= 80) {
		cow.resourceDiamonds -= 80;
		cow.biome3Owned = true;
		if (cow.triangleCapacity == 0) { cow.triangleCapacity = 1; }
		if (cow.circleCapacity == 0) { cow.circleCapacity = 1; }
		clearPricesSpan();
		updateResourceCounter('diamond');
		updateResourceCounter('triangle');
		updateResourceCounter('circle');
		updateTextSpans(false);
		playAudio('SFXc/newBiome' + rngRange(1,3), 'sfx', 450, true);
		saveGame();
	}
}

function buyBiome4() {
	if (cow.resourceStars >= 30) {
		cow.resourceStars -= 30;
		cow.biome4Owned = true;
		if (cow.squareCapacity == 0) { cow.squareCapacity = 10; }
		clearPricesSpan();
		updateResourceCounter('star');
		updateResourceCounter('square');
		updateTextSpans(false);
		playAudio('SFXc/newBiome' + rngRange(1,3), 'sfx', 450, true);
		saveGame();
	}
}

function buyBiome5() {
	if (cow.resourceDiamonds >= 80) {
		cow.resourceDiamonds -= 80;
		cow.biome5Owned = true;
		if (cow.hexagonCapacity == 0) { cow.hexagonCapacity = 1; }
		if (cow.circleCapacity == 0) { cow.circleCapacity = 1; }
		clearPricesSpan();
		updateResourceCounter('diamond');
		updateResourceCounter('hexagon');
		updateResourceCounter('circle');
		updateTextSpans(false);
		playAudio('SFXc/newBiome' + rngRange(1,3), 'sfx', 450, true);
		saveGame();
	}
}

function buyBiome6() {
	if (cow.resourceCircles >= 1000) {
		cow.resourceCircles -= 1000;
		cow.biome6Owned = true;
		if (cow.circleCapacity == 0) { cow.circleCapacity = 1; }
		clearPricesSpan();
		updateResourceCounter('circle');
		updateTextSpans(false);
		playAudio('SFXc/newBiome' + rngRange(1,3), 'sfx', 450, true);
		saveGame();
	}
}
















function buyDiamondBar() {
	if (cow.resourceStars >= 600) {
		cow.resourceStars -= 600;
		cow.diamondBarOwned = true;
		clearPricesSpan();
		updateResourceCounter('star');
		updateTextSpans(false);
		showDiamondBar();
		playAudio('SFXc/stardustBoost' + rngRange(1,3), 'sfx', 450, true);
		saveGame();
	}
}

function increaseStardustChance100() {
	if (cow.resourceStardust >= 25) {
		cow.resourceStardust -= 25;
		cow.stardustSpawnBoost1Owned = true;
		clearPricesSpan();
		updateResourceCounter('stardust');
		updateTextSpans(false);
		playAudio('SFXc/stardustBoost' + rngRange(1,3), 'sfx', 450, true);
		saveGame();
	}
}

function increaseStardustChance20() {
	if (cow.resourceStardust >= 120) {
		cow.resourceStardust -= 120;
		cow.stardustSpawnBoost2Owned = true;
		clearPricesSpan();
		updateResourceCounter('stardust');
		updateTextSpans(false);
		playAudio('SFXc/stardustBoost' + rngRange(1,3), 'sfx', 450, true);
		saveGame();
	}
}
















function buyMaxShapeCapacity(q) {
	switch (q) {
		case 'diamond20': 	if (cow.resourceDiamonds >= 100) { 	cow.resourceDiamonds -= 100; 	cow.maxDiamondCapacity = 20; 	cow.diamondCapacity++; 		updateResourceCounter('diamond');	stuff();} 	break;
		case 'diamond30': 	if (cow.resourceDiamonds >= 500) { 	cow.resourceDiamonds -= 500; 	cow.maxDiamondCapacity = 30; 	cow.diamondCapacity++; 		updateResourceCounter('diamond');	stuff();} 	break;
		case 'star20': 		if (cow.resourceStars >= 150) {		cow.resourceStars -= 150; 		cow.maxStarCapacity = 20; 	 	cow.starCapacity++; 		updateResourceCounter('star');		stuff();} 	break;
		case 'star30': 		if (cow.resourceStars >= 300) { 	cow.resourceStars -= 300; 		cow.maxStarCapacity = 30; 	 	cow.starCapacity++; 		updateResourceCounter('star');		stuff();} 	break;
		case 'hexagon20': 	if (cow.resourceHexagons >= 400) { 	cow.resourceHexagons -= 400; 	cow.maxHexagonCapacity = 20; 	cow.hexagonCapacity++; 		updateResourceCounter('hexagon');	stuff();} 	break;
		case 'hexagon30': 	if (cow.resourceHexagons >= 1000) {	cow.resourceHexagons -= 1000; 	cow.maxHexagonCapacity = 30; 	cow.hexagonCapacity++; 		updateResourceCounter('hexagon');	stuff();} 	break;
		case 'triangle20': 	if (cow.resourceTriangles >= 400) { cow.resourceTriangles -= 400; 	cow.maxTriangleCapacity = 20;	cow.triangleCapacity++; 	updateResourceCounter('triangle');	stuff();} 	break;
		case 'triangle30': 	if (cow.resourceTriangles >= 1600){ cow.resourceTriangles -= 1600;	cow.maxTriangleCapacity = 30;	cow.triangleCapacity++; 	updateResourceCounter('triangle');	stuff();} 	break;
		case 'circle20': 	if (cow.resourceCircles >= 200) { 	cow.resourceCircles -= 200;		cow.maxCircleCapacity = 20;  	cow.circleCapacity++; 		updateResourceCounter('circle');	stuff();} 	break;
		case 'circle30': 	if (cow.resourceCircles >= 800) { 	cow.resourceCircles -= 800;		cow.maxCircleCapacity = 30;  	cow.circleCapacity++; 		updateResourceCounter('circle');	stuff();} 	break;
		case 'square200': 	if (cow.resourceSquares >= 2400) { 	cow.resourceSquares -= 2400; 	cow.maxSquareCapacity = 200; 	cow.squareCapacity += 10;	updateResourceCounter('square');	stuff();} 	break;
		case 'square300': 	if (cow.resourceSquares >= 6400) {	cow.resourceSquares -= 6400; 	cow.maxSquareCapacity = 300; 	cow.squareCapacity += 10;	updateResourceCounter('square');	stuff();} 	break;
		default: break;
	}
	function stuff() {
		clearPricesSpan();
		playAudio('SFXc/capacityBoost' + rngRange(1,3), 'sfx', 450, true);
		saveGame();
		updateTextSpans(false);
	}
}
















// These don't show up if the shape capacity is maxed out
function showDiamondCost() 	{ if (cow.diamondCapacity < cow.maxDiamondCapacity) 	{ displayPriceText('di ' + cow.nextDiamondPrice); } 	else clearPricesSpan(); }
function showStarCost() 	{ if (cow.starCapacity < cow.maxStarCapacity) 			{ displayPriceText('st ' + cow.nextStarPrice); } 		else clearPricesSpan(); }
function showHexagonCost() 	{ if (cow.hexagonCapacity < cow.maxHexagonCapacity) 	{ displayPriceText('hx ' + cow.nextHexagonPrice); }		else clearPricesSpan(); }
function showTriangleCost() { if (cow.triangleCapacity < cow.maxTriangleCapacity) 	{ displayPriceText('tr ' + cow.nextTrianglePrice); } 	else clearPricesSpan(); }
function showCircleCost() 	{ if (cow.circleCapacity < cow.maxCircleCapacity) 		{ displayPriceText('ci ' + cow.nextCirclePrice); } 		else clearPricesSpan(); }
function showSquareCost() 	{ if (cow.squareCapacity < cow.maxSquareCapacity) 		{ displayPriceText('sq ' + cow.nextSquarePrice); } 		else clearPricesSpan(); }

function showBiome2Cost() {	displayPriceText('tr 500'); }
function showBiome3Cost() {	displayPriceText('di 80'); }
function showBiome4Cost() {	displayPriceText('st 30'); }
function showBiome5Cost() {	displayPriceText('di 80'); }
function showBiome6Cost() {	displayPriceText('ci 1000'); }

function showMaxShapeCapacityCost(q) {
	switch (q) {
		case 'diamond20': displayPriceText('di 100'); break;
		case 'diamond30': displayPriceText('di 500'); break;
		case 'star20': displayPriceText('st 150'); break;
		case 'star30': displayPriceText('st 300'); break;
		case 'hexagon20': displayPriceText('hx 400'); break;
		case 'hexagon30': displayPriceText('hx 1000'); break;
		case 'triangle20': displayPriceText('tr 400'); break;
		case 'triangle30': displayPriceText('tr 1600'); break;
		case 'circle20': displayPriceText('ci 200'); break;
		case 'circle30': displayPriceText('ci 800'); break;
		case 'square200': displayPriceText('sq 2400'); break;
		case 'square300': displayPriceText('sq 6400'); break;
	default: break;
	}
}

function showDiamondBarCost() {	displayPriceText('st 600'); }
function showStardustUpgradeCost100(q) { displayPriceText('sd 25'); }
function showStardustUpgradeCost20(q) { displayPriceText('sd 120'); }
















function unlockEverythingPhase1() {
	cow.resourceDiamonds = 20000;
	cow.resourceStars = 20000;
	cow.resourceHexagons = 20000;
	cow.resourceTriangles = 20000;
	cow.resourceCircles = 20000;
	cow.resourceSquares = 200000;
	cow.resourceStardust = 2000;

	cow.diamondCapacity = 10;		// 17 (+170 squares) in all of these unlocks the diamondBar
	cow.starCapacity = 10;
	cow.hexagonCapacity = 10;
	cow.triangleCapacity = 10;
	cow.circleCapacity = 10;
	cow.squareCapacity = 100;

	updateResourceCounter('diamond');
	updateResourceCounter('star');
	updateResourceCounter('hexagon');
	updateResourceCounter('triangle');
	updateResourceCounter('circle');
	updateResourceCounter('square');
	updateResourceCounter('stardust');
	saveGame();
}

function unlockEverythingPhase2() {
	cow.resourceStardustBiome1 = 14;	// Unlocks the endgameBar
	cow.resourceStardustBiome2 = 15;	// Biome 1 is set lower so it can trigger naturally
	cow.resourceStardustBiome3 = 15;
	cow.resourceStardustBiome4 = 15;
	cow.resourceStardustBiome5 = 15;
	cow.resourceStardustBiome6 = 15;
	updateResourceCounter('stardust');
	saveGame();
}

function unlockEverythingPhase3() {
	cow.resourceEndgameBarDiamonds = 790;	// Unlocks the credits
	cow.resourceEndgameBarStars = 2400;		// Biome 1 a bit short again so it can trigger naturally
	cow.resourceEndgameBarHexagons = 3200;
	cow.resourceEndgameBarTriangles = 4800;
	cow.resourceEndgameBarCircles = 2400;
	cow.resourceEndgameBarSquares = 6400;
	updateResourceCounter('diamond');
	updateResourceCounter('star');
	updateResourceCounter('hexagon');
	updateResourceCounter('triangle');
	updateResourceCounter('circle');
	updateResourceCounter('square');
	saveGame();
}
















function recheckItemCostHighlighting() {
	// Very overcomplicated to minimize redraws as much as possible since this gets called every time a shape is collected

	// The slice function reads the .png filenames, checking if a number is present at the end which would represent a colored image
	// If upgrade is too expensive, and the icon is colored, white it out

	// Throttled in biome 4 and phase 3/postgame because this is performed more than necessary at those points
	if (lategameThrottle() == false) {
		// Biome purchase buttons
		if (cow.resourceTriangles < 500 	&& buttID1.src.slice(-10,-5) == 'Color') 	{ buttID1.src = 'Images/biome2.png'; }
		if (cow.resourceDiamonds < 80		&& buttID2.src.slice(-10,-5) == 'Color') 	{ buttID2.src = 'Images/biome3.png'; }
		if (cow.resourceStars < 30 			&& buttID3.src.slice(-10,-5) == 'Color') 	{ buttID3.src = 'Images/biome4.png'; }
		if (cow.resourceDiamonds < 80 		&& buttID4.src.slice(-10,-5) == 'Color') 	{ buttID4.src = 'Images/biome5.png'; }
		if (cow.resourceCircles < 1000 		&& buttID5.src.slice(-10,-5) == 'Color') 	{ buttID5.src = 'Images/biome6.png'; }
		// Phase 2/3 things
		if (cow.resourceStars < 600			&& buttID6.src.slice(-10,-5) == 'Color')	{ buttID6.src = 'Images/diamondBarHollow.png'; }
		if (cow.resourceStardust < 25 		&& buttID7.src.slice(-10,-5) == 'Color')	{ buttID7.src = 'Images/stardustHollow.png'; }
		if (cow.resourceStardust < 120 		&& buttID8.src.slice(-10,-5) == 'Color') 	{ buttID8.src = 'Images/stardustHollow.png'; }
		// Capacity upgrades
		if (cow.resourceDiamonds < 100 		&& buttID9.src.slice(-10,-5) == 'Color') 	{ buttID9.src = 'Images/diamondHollow.png'; }
		if (cow.resourceDiamonds < 500 		&& buttID10.src.slice(-10,-5) == 'Color')	{ buttID10.src = 'Images/diamondHollow.png'; }
		if (cow.resourceStars < 150 		&& buttID11.src.slice(-10,-5) == 'Color')	{ buttID11.src = 'Images/starHollow.png'; }
		if (cow.resourceStars < 300 		&& buttID12.src.slice(-10,-5) == 'Color')	{ buttID12.src = 'Images/starHollow.png'; }
		if (cow.resourceHexagons < 400 		&& buttID13.src.slice(-10,-5) == 'Color')	{ buttID13.src = 'Images/hexagonHollow.png'; }
		if (cow.resourceHexagons < 1000 	&& buttID14.src.slice(-10,-5) == 'Color')	{ buttID14.src = 'Images/hexagonHollow.png'; }
		if (cow.resourceTriangles < 400 	&& buttID15.src.slice(-10,-5) == 'Color')	{ buttID15.src = 'Images/triangleHollow.png'; }
		if (cow.resourceTriangles < 1600	&& buttID16.src.slice(-10,-5) == 'Color')	{ buttID16.src = 'Images/triangleHollow.png'; }
		if (cow.resourceCircles < 200 		&& buttID17.src.slice(-10,-5) == 'Color')	{ buttID17.src = 'Images/circleHollow.png'; }
		if (cow.resourceCircles < 800 		&& buttID18.src.slice(-10,-5) == 'Color')	{ buttID18.src = 'Images/circleHollow.png'; }
		if (cow.resourceSquares < 2400 		&& buttID19.src.slice(-10,-5) == 'Color')	{ buttID19.src = 'Images/squareHollow.png'; }
		if (cow.resourceSquares < 6400 		&& buttID20.src.slice(-10,-5) == 'Color')	{ buttID20.src = 'Images/squareHollow.png'; }
		// Resource counter numbers and shapes
		if (buttID21.src.slice(-10,-5) == 'Color' || diamondCounter.style.color != 'rgb(249, 249, 249)') {
			if (cow.resourceDiamonds < cow.nextDiamondPrice	|| cow.diamondCapacity >= cow.maxDiamondCapacity) {
				diamondCounter.style.color = "F9F9F9";
				buttID21.src = 'Images/diamond.png';
			}
		}
		if (buttID22.src.slice(-10,-5) == 'Color' || starCounter.style.color != 'rgb(249, 249, 249)') {
			if (cow.resourceStars < cow.nextStarPrice || cow.starCapacity >= cow.maxStarCapacity) {
				starCounter.style.color = "F9F9F9";
				buttID22.src = 'Images/star.png';
			}
		}
		if (buttID23.src.slice(-10,-5) == 'Color' || hexagonCounter.style.color != 'rgb(249, 249, 249)') {
			if (cow.resourceHexagons < cow.nextHexagonPrice	|| cow.hexagonCapacity >= cow.maxHexagonCapacity) {
				hexagonCounter.style.color = "F9F9F9";
				buttID23.src = 'Images/hexagon.png';
			}
		}
		if (buttID24.src.slice(-10,-5) == 'Color' || triangleCounter.style.color != 'rgb(249, 249, 249)') {
			if (cow.resourceTriangles < cow.nextTrianglePrice || cow.triangleCapacity >= cow.maxTriangleCapacity) {
				triangleCounter.style.color = "F9F9F9";
				buttID24.src = 'Images/triangle.png';
			}
		}
		if (buttID25.src.slice(-10,-5) == 'Color' || circleCounter.style.color != 'rgb(249, 249, 249)') {
			if (cow.resourceCircles < cow.nextCirclePrice || cow.circleCapacity >= cow.maxCircleCapacity) {
				circleCounter.style.color = "F9F9F9";
				buttID25.src = 'Images/circle.png';
			}
		}
		if (buttID26.src.slice(-10,-5) == 'Color' || squareCounter.style.color != 'rgb(249, 249, 249)') {
			if (cow.resourceSquares < cow.nextSquarePrice || cow.squareCapacity >= cow.maxSquareCapacity) {
				squareCounter.style.color = "F9F9F9";
				buttID26.src = 'Images/square.png';
			}
		}
		// If upgrade is buyable, and the icon is white, colorize it
		// Biome purchase buttons
		if (cow.resourceTriangles >= 500 	&& buttID1.src.slice(-10,-5) != 'Color') 	{ buttID1.src = 'Images/biome2Color'+ rngRange(1,3) + '.png'; }
		if (cow.resourceDiamonds >= 80		&& buttID2.src.slice(-10,-5) != 'Color') 	{ buttID2.src = 'Images/biome3Color' + rngRange(1,3) + '.png'; }
		if (cow.resourceStars >= 30 		&& buttID3.src.slice(-10,-5) != 'Color') 	{ buttID3.src = 'Images/biome4Color'+ rngRange(1,3) + '.png'; }
		if (cow.resourceDiamonds >= 80 		&& buttID4.src.slice(-10,-5) != 'Color') 	{ buttID4.src = 'Images/biome5Color'+ rngRange(1,3) + '.png'; }
		if (cow.resourceCircles >= 1000 	&& buttID5.src.slice(-10,-5) != 'Color') 	{ buttID5.src = 'Images/biome6Color' + rngRange(1,3) + '.png' }
		// Phase 2/3 things
		if (cow.resourceStars >= 600 		&& buttID6.src.slice(-10,-5) != 'Color')	{ buttID6.src = 'Images/diamondBarHollowColor' + rngRange(1,3) + '.png'; }
		if (cow.resourceStardust >= 25 		&& buttID7.src.slice(-10,-5) != 'Color')	{ buttID7.src = 'Images/stardustHollowColor' + rngRange(1,3) + '.png'; }
		if (cow.resourceStardust >= 120 	&& buttID8.src.slice(-10,-5) != 'Color')	{ buttID8.src = 'Images/stardustHollowColor' + rngRange(1,3) + '.png' }
		// Capacity upgrades
		if (cow.resourceDiamonds >= 100 	&& buttID9.src.slice(-10,-5) != 'Color') 	{ buttID9.src = 'Images/diamondHollowColor' + rngRange(1,3) + '.png'; }
		if (cow.resourceDiamonds >= 500		&& buttID10.src.slice(-10,-5) != 'Color')	{ buttID10.src = 'Images/diamondHollowColor' + rngRange(1,3) + '.png'; }
		if (cow.resourceStars >= 150 		&& buttID11.src.slice(-10,-5) != 'Color')	{ buttID11.src = 'Images/starHollowColor' + rngRange(1,3) + '.png'; }
		if (cow.resourceStars >= 300 		&& buttID12.src.slice(-10,-5) != 'Color')	{ buttID12.src = 'Images/starHollowColor' + rngRange(1,3) + '.png'; }
		if (cow.resourceHexagons >= 400 	&& buttID13.src.slice(-10,-5) != 'Color')	{ buttID13.src = 'Images/hexagonHollowColor' + rngRange(1,3) + '.png'; }
		if (cow.resourceHexagons >= 1000 	&& buttID14.src.slice(-10,-5) != 'Color')	{ buttID14.src = 'Images/hexagonHollowColor' + rngRange(1,3) + '.png'; }
		if (cow.resourceTriangles >= 400 	&& buttID15.src.slice(-10,-5) != 'Color')	{ buttID15.src = 'Images/triangleHollowColor' + rngRange(1,3) + '.png'; }
		if (cow.resourceTriangles >= 1600 	&& buttID16.src.slice(-10,-5) != 'Color')	{ buttID16.src = 'Images/triangleHollowColor' + rngRange(1,3) + '.png'; }
		if (cow.resourceCircles >= 200 		&& buttID17.src.slice(-10,-5) != 'Color')	{ buttID17.src = 'Images/circleHollowColor' + rngRange(1,3) + '.png'; }
		if (cow.resourceCircles >= 800	 	&& buttID18.src.slice(-10,-5) != 'Color')	{ buttID18.src = 'Images/circleHollowColor' + rngRange(1,3) + '.png'; }
		if (cow.resourceSquares >= 2400 	&& buttID19.src.slice(-10,-5) != 'Color')	{ buttID19.src = 'Images/squareHollowColor' + rngRange(1,3) + '.png'; }
		if (cow.resourceSquares >= 6400 	&& buttID20.src.slice(-10,-5) != 'Color')	{ buttID20.src = 'Images/squareHollowColor' + rngRange(1,3) + '.png'; }

		// Resource counter numbers and shapes
		function getRNG() { return rngRange(1,4); }
		if (cow.resourceDiamonds >= cow.nextDiamondPrice 	&& cow.diamondCapacity < cow.maxDiamondCapacity 	&& (buttID21.src.slice(-10,-5) != 'Color' || diamondCounter.style.color == 'rgb(249, 249, 249)')) {
			const q = getRNG()
			switch (q) {
				case 1: diamondCounter.style.color = '#B0B22C'; break;
				case 2: diamondCounter.style.color = '#DE8F49'; break;
				case 3: diamondCounter.style.color = '#21C65E'; break;
				case 4: diamondCounter.style.color = '#6A5096'; break;
				default: break;
				}
			buttID21.src = 'Images/diamondColor' + q + '.png';
		}
		if (cow.resourceStars >= cow.nextStarPrice 			&& cow.starCapacity < cow.maxStarCapacity 			&& (buttID22.src.slice(-10,-5) != 'Color' || starCounter.style.color == 'rgb(249, 249, 249)')) {
			const q = getRNG()
			switch (q) {
				case 1: starCounter.style.color = '#439C9E'; break;
				case 2: starCounter.style.color = '#B658A5'; break;
				case 3: starCounter.style.color = '#C19B3A'; break;
				case 4: starCounter.style.color = '#73B47C'; break;
				default: break;
				}
			buttID22.src = 'Images/starColor' + q + '.png';
		}
		if (cow.resourceHexagons >= cow.nextHexagonPrice 	&& cow.hexagonCapacity < cow.maxHexagonCapacity 	&& (buttID23.src.slice(-10,-5) != 'Color' || hexagonCounter.style.color == 'rgb(249, 249, 249)')) {
			const q = getRNG()
			switch (q) {
				case 1: hexagonCounter.style.color = '#24A952'; break;
				case 2: hexagonCounter.style.color = '#3B5DA2'; break;
				case 3: hexagonCounter.style.color = '#AC49A9'; break;
				case 4: hexagonCounter.style.color = '#CA5D5D'; break;
				default: break;
				}
			buttID23.src = 'Images/hexagonColor' + q + '.png';
		}
		if (cow.resourceTriangles >= cow.nextTrianglePrice 	&& cow.triangleCapacity < cow.maxTriangleCapacity 	&& (buttID24.src.slice(-10,-5) != 'Color' || triangleCounter.style.color == 'rgb(249, 249, 249)')) {
			const q = getRNG()
			switch (q) {
				case 1: triangleCounter.style.color = '#2B7A94'; break;
				case 2: triangleCounter.style.color = '#932340'; break;
				case 3: triangleCounter.style.color = '#BBB21C'; break;
				case 4: triangleCounter.style.color = '#9A537B'; break;
				default: break;
				}
			buttID24.src = 'Images/triangleColor' + q + '.png';
		}
		if (cow.resourceCircles >= cow.nextCirclePrice 		&& cow.circleCapacity < cow.maxCircleCapacity 		&& (buttID25.src.slice(-10,-5) != 'Color' || circleCounter.style.color == 'rgb(249, 249, 249)')) {
			const q = getRNG()
			switch (q) {
				case 1: circleCounter.style.color = '#119E8D'; break;
				case 2: circleCounter.style.color = '#E9525E'; break;
				case 3: circleCounter.style.color = '#8B6FD0'; break;
				case 4: circleCounter.style.color = '#B8803D'; break;
				default: break;
				}
			buttID25.src = 'Images/circleColor' + q + '.png';
		}
		if (cow.resourceSquares >= cow.nextSquarePrice 		&& cow.squareCapacity < cow.maxSquareCapacity 		&& (buttID26.src.slice(-10,-5) != 'Color' || squareCounter.style.color == 'rgb(249, 249, 249)')) {
			const q = getRNG()
			switch (q) {
				case 1: squareCounter.style.color = '#9052D0'; break;
				case 2: squareCounter.style.color = '#307A93'; break;
				case 3: squareCounter.style.color = '#279C32'; break;
				case 4: squareCounter.style.color = '#B1B23B'; break;
				default: break;
				}
			buttID26.src = 'Images/squareColor' + q + '.png';
		}
	}
}
















function forceIconRecolorize() {
	// Horrible copypaste function
	// Biome purchase buttons
	if (cow.resourceTriangles >= 500  	&& cow.biome2Owned == false) 				{ buttID1.src = 'Images/biome2Color'+ rngRange(1,3) + '.png'; }
	if (cow.resourceDiamonds >= 80	 	&& cow.biome3Owned == false)				{ buttID2.src = 'Images/biome3Color' + rngRange(1,3) + '.png'; }
	if (cow.resourceStars >= 30			&& cow.biome4Owned == false) 				{ buttID3.src = 'Images/biome4Color'+ rngRange(1,3) + '.png'; }
	if (cow.resourceDiamonds >= 80		&& cow.biome5Owned == false) 				{ buttID4.src = 'Images/biome5Color'+ rngRange(1,3) + '.png'; }
	if (cow.resourceCircles >= 1000		&& cow.biome6Owned == false) 				{ buttID5.src = 'Images/biome6Color' + rngRange(1,3) + '.png' }
	// Phase 2/3 things
	if (cow.resourceStars >= 600		&& cow.diamondBarOwned == false)	 		{ buttID6.src = 'Images/diamondBarHollowColor' + rngRange(1,3) + '.png'; }
	if (cow.resourceStardust >= 25		&& cow.stardustSpawnBoost1Owned == false)	{ buttID7.src = 'Images/stardustHollowColor' + rngRange(1,3) + '.png'; }
	if (cow.resourceStardust >= 120		&& cow.stardustSpawnBoost2Owned == false)	{ buttID8.src = 'Images/stardustHollowColor' + rngRange(1,3) + '.png' }
	// Capacity upgrades
	if (cow.resourceDiamonds >= 100 	&& cow.maxDiamondCapacity < 20) 			{ buttID9.src = 'Images/diamondHollowColor' + rngRange(1,3) + '.png'; }
	if (cow.resourceDiamonds >= 500		&& cow.maxDiamondCapacity < 30)				{ buttID10.src = 'Images/diamondHollowColor' + rngRange(1,3) + '.png'; }
	if (cow.resourceStars >= 150 		&& cow.maxStarCapacity < 20) 				{ buttID11.src = 'Images/starHollowColor' + rngRange(1,3) + '.png'; }
	if (cow.resourceStars >= 300 		&& cow.maxStarCapacity < 30) 				{ buttID12.src = 'Images/starHollowColor' + rngRange(1,3) + '.png'; }
	if (cow.resourceHexagons >= 400 	&& cow.maxHexagonCapacity < 20) 			{ buttID13.src = 'Images/hexagonHollowColor' + rngRange(1,3) + '.png'; }
	if (cow.resourceHexagons >= 1000 	&& cow.maxHexagonCapacity < 30) 			{ buttID14.src = 'Images/hexagonHollowColor' + rngRange(1,3) + '.png'; }
	if (cow.resourceTriangles >= 400 	&& cow.maxTriangleCapacity < 20) 			{ buttID15.src = 'Images/triangleHollowColor' + rngRange(1,3) + '.png'; }
	if (cow.resourceTriangles >= 1600 	&& cow.maxTriangleCapacity < 30) 			{ buttID16.src = 'Images/triangleHollowColor' + rngRange(1,3) + '.png'; }
	if (cow.resourceCircles >= 200 		&& cow.maxCircleCapacity < 20) 				{ buttID17.src = 'Images/circleHollowColor' + rngRange(1,3) + '.png'; }
	if (cow.resourceCircles >= 800	 	&& cow.maxCircleCapacity < 30) 				{ buttID18.src = 'Images/circleHollowColor' + rngRange(1,3) + '.png'; }
	if (cow.resourceSquares >= 2400 	&& cow.maxSquareCapacity < 20) 				{ buttID19.src = 'Images/squareHollowColor' + rngRange(1,3) + '.png'; }
	if (cow.resourceSquares >= 6400 	&& cow.maxSquareCapacity < 30) 				{ buttID20.src = 'Images/squareHollowColor' + rngRange(1,3) + '.png'; }

	// Resource counter numbers and shapes
	function getRNG() { return rngRange(1,4); }
	if (cow.resourceDiamonds >= cow.nextDiamondPrice 	&& cow.diamondCapacity < cow.maxDiamondCapacity) {
		const q = getRNG()
		switch (q) {
			case 1: diamondCounter.style.color = '#B0B22C'; break;
			case 2: diamondCounter.style.color = '#DE8F49'; break;
			case 3: diamondCounter.style.color = '#21C65E'; break;
			case 4: diamondCounter.style.color = '#6A5096'; break;
			default: break;
			}
		buttID21.src = 'Images/diamondColor' + q + '.png';
	}
	if (cow.resourceStars >= cow.nextStarPrice 			&& cow.starCapacity < cow.maxStarCapacity) {
		const q = getRNG()
		switch (q) {
			case 1: starCounter.style.color = '#439C9E'; break;
			case 2: starCounter.style.color = '#B658A5'; break;
			case 3: starCounter.style.color = '#C19B3A'; break;
			case 4: starCounter.style.color = '#73B47C'; break;
			default: break;
			}
		buttID22.src = 'Images/starColor' + q + '.png';
	}
	if (cow.resourceHexagons >= cow.nextHexagonPrice 	&& cow.hexagonCapacity < cow.maxHexagonCapacity) {
		const q = getRNG()
		switch (q) {
			case 1: hexagonCounter.style.color = '#24A952'; break;
			case 2: hexagonCounter.style.color = '#3B5DA2'; break;
			case 3: hexagonCounter.style.color = '#AC49A9'; break;
			case 4: hexagonCounter.style.color = '#CA5D5D'; break;
			default: break;
			}
		buttID23.src = 'Images/hexagonColor' + q + '.png';
	}
	if (cow.resourceTriangles >= cow.nextTrianglePrice 	&& cow.triangleCapacity < cow.maxTriangleCapacity) {
		const q = getRNG()
		switch (q) {
			case 1: triangleCounter.style.color = '#2B7A94'; break;
			case 2: triangleCounter.style.color = '#923240'; break;
			case 3: triangleCounter.style.color = '#BBB21C'; break;
			case 4: triangleCounter.style.color = '#9A537B'; break;
			default: break;
			}
		buttID24.src = 'Images/triangleColor' + q + '.png';
	}
	if (cow.resourceCircles >= cow.nextCirclePrice 		&& cow.circleCapacity < cow.maxCircleCapacity) {
		const q = getRNG()
		switch (q) {
			case 1: circleCounter.style.color = '#119E8D'; break;
			case 2: circleCounter.style.color = '#E9525E'; break;
			case 3: circleCounter.style.color = '#8B6FD0'; break;
			case 4: circleCounter.style.color = '#B8803D'; break;
			default: break;
			}
		buttID25.src = 'Images/circleColor' + q + '.png';
	}
	if (cow.resourceSquares >= cow.nextSquarePrice 		&& cow.squareCapacity < cow.maxSquareCapacity) {
		const q = getRNG()
		switch (q) {
			case 1: squareCounter.style.color = '#9052D0'; break;
			case 2: squareCounter.style.color = '#307A93'; break;
			case 3: squareCounter.style.color = '#279C32'; break;
			case 4: squareCounter.style.color = '#B1B23B'; break;
			default: break;
			}
		buttID26.src = 'Images/squareColor' + q + '.png';
	}
	setTimeout(forceIconRecolorize, 30000);		// RECURSION MOTHERFUCKER
}