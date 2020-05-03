var preloaderContainer = new PIXI.Container();

function preloader() {
	initializeGameOne();

	preloaderContainer.zIndex = 50;
	app.stage.addChild(preloaderContainer);

	let squareBG = new PIXI.Graphics();
	squareBG.beginFill(0x000000);
	squareBG.moveTo(0, 0);
	squareBG.lineTo(900, 0);
	squareBG.lineTo(900, 600);
	squareBG.lineTo(0, 600);
	squareBG.endFill();
	preloaderContainer.addChild(squareBG);

	function spawnDiamond(x, diamName, color) {									// WARNING - VARIABLE VARIABLES
		window[diamName] = new PIXI.Graphics();
		window[diamName].beginFill(color);
		window[diamName].alpha = 0.13;											// #222222 is achieved through alpha so that we can reset and tint #FFFFFF later on
		window[diamName].moveTo(0, -12);
		window[diamName].lineTo(8, 0);
		window[diamName].lineTo(0, 12);
		window[diamName].lineTo(-8, 0);
		window[diamName].endFill();
		preloaderContainer.addChild(window[diamName]);
		window[diamName].x = x;
		window[diamName].y = 300;
	}

	spawnDiamond(400, 'diam1', '0xFFFFFF');
	spawnDiamond(420, 'diam2', '0xFFFFFF');
	spawnDiamond(440, 'diam3', '0xFFFFFF');
	spawnDiamond(460, 'diam4', '0xFFFFFF');
	spawnDiamond(480, 'diam5', '0xFFFFFF');
	spawnDiamond(500, 'diam6', '0xFFFFFF');
	//const cowColor = randomColor({ hue:'blue'});
	const cowColor = '0x72BCD4';

	function waitForLogin() {
		if (cow.filesPreloaded >= 50 && diam1.alpha == 0.13)  { diam1.tint=cowColor; diam1.alpha=1;}	// Images load super fast so unbalancing the early progress bar stages is better
		if (cow.filesPreloaded >= 100 && diam2.alpha == 0.13) { diam2.tint=cowColor; diam2.alpha=1;}	// The alpha check makes sure the color change only occurs once
		if (cow.filesPreloaded >= 125 && diam3.alpha == 0.13) { diam3.tint=cowColor; diam3.alpha=1;}
		if (cow.filesPreloaded >= 145 && diam4.alpha == 0.13) { diam4.tint=cowColor; diam4.alpha=1;}
		if (cow.filesPreloaded >= 160 && diam5.alpha == 0.13) { diam5.tint=cowColor; diam5.alpha=1;}
		if (cow.filesPreloaded >= 173 && diam6.alpha == 0.13) { diam6.tint=cowColor; diam6.alpha=1;}
		if (cow.preloaderComplete == true) {
			fadeOutDiamond(1);
			fadeOutDiamond(2);
			fadeOutDiamond(3);
			fadeOutDiamond(4);
			fadeOutDiamond(5);
			fadeOutDiamond(6);
			showStartGameButton();
		}
		else { setTimeout(waitForLogin, 250); }									// Throttle this to 4FPS instead of 60
	}
	waitForLogin();

	function fadeOutDiamond(number) {
		let qq = window['diam' + number]
		function fade() {
			qq.alpha -= 0.025;

			if (qq.alpha < 0) {													// if shape is offscreen..
				qq.destroy(true); 												// kill it
			} else { window.requestAnimationFrame(fade); }						// otherwise, animate another frame and check again
		}																		//

		window.requestAnimationFrame(fade);										// starts the animation moving
	}
}

function showStartGameButton() {
	newFade(startGameText, 1, 1.4);												// Fadein the start game text
}

function startGame(gameType) {
	if (cow.gameStarted == false && cow.preloaderComplete == true && startGameText.style.opacity == 1) {
		newFadePlusToggleAndVisibility(startGameText, 0, 0.7)					// Fadeout the start game text

		initializeGameTwo(gameType);											// Start the game
		initializeGameThree();
		fadeOutPreloader();

		showDiamondBar();
		showEndgameBar();
		newFade(optionsMenuButtonFadeinContainer, 1, 0.7);						// Fadein all the UI
		optionsMenuButton.style.display = 'inline';								// This and the inline CSS on the HTML tag are required for IE and Edge. Fuck IE.
		newFade(resourceCounterFadeinContainer, 1, 0.7);
		newFade(lowerRightFadeinContainer, 1, 0.7);

		cow.gameStarted = true;
	}

	function fadeOutPreloader() {
		function fade() {
			preloaderContainer.alpha -= 0.01;

			if (preloaderContainer.alpha < 0) {									// if shape is offscreen..
				preloaderContainer.destroy(true); 								// kill it
			} else { window.requestAnimationFrame(fade); }						// otherwise, animate another frame and check again
		}																		//

		window.requestAnimationFrame(fade);										// starts the animation moving
	}
}
















function displayPriceText(x) {
	let a;
	let b;
	switch (x.slice(0,2)) {
		case 'di': 	a = "<img class='diamondCounterShape' style='top:-2px' src='Images/diamond.png'>";
					b = "<span class='diamondPriceText' style='top:-9px' class='firefoxHack4'>";		break;
		case 'st': 	a = "<img class='starCounterShape' style='top:-2px' src='Images/star.png'>";
					b = "<span class='starPriceText' style='top:-8px' class='firefoxHack4'>"; 			break;
		case 'hx': 	a = "<img class='hexagonCounterShape' style='top:-2px' src='Images/hexagon.png'>";
					b = "<span class='hexagonPriceText' style='top:-8px' class='firefoxHack4'>"; 		break;
		case 'tr': 	a = "<img class='triangleCounterShape' style='top:-2px' src='Images/triangle.png'>";
					b = "<span class='trianglePriceText' style='top:-7px' class='firefoxHack4'>"; 		break;
		case 'ci': 	a = "<img class='circleCounterShape' style='top:-1px' src='Images/circle.png'>";
					b = "<span class='circlePriceText' style='top:-6px' class='firefoxHack4'>"; 		break;
		case 'sq': 	a = "<img class='squareCounterShape' style='top:-1px' src='Images/square.png'>";
					b = "<span class='squarePriceText' style='top:-6px' class='firefoxHack4'>"; 		break;
		case 'sd': 	a = "<img class='stardustCounterShape' style='top:0px' src='Images/stardust.png'>";
					b = "<span class='stardustPriceText' style='top:-5px' class='firefoxHack4'>"; 		break;
		default: break;
	}

	const c = x.slice(3);
	const d = '</span>';

	pricesTextBox.innerHTML = a + b + c + d;													// Display the shape and the price number
   	if (pricesTextBox.style.opacity <= 0.2) { fadeInPrices(pricesTextBox, 0.7); }				// Fade in the price span. the IF prevents extra animations
   	if (songTitleSuperdiv.style.opacity >= 0.2) { fadeOutPrices(songTitleSuperdiv); }			// Fade out the song title span. The numbers in the IFs are really important, behavior would be weird without them
}

function clearPricesSpan() {
	if (pricesTextBox.style.opacity >= 0.025) { fadeOutPrices(pricesTextBox); }					// Fade out the price span
    if (songTitleSuperdiv.style.opacity <= 0.9) { fadeInPrices(songTitleSuperdiv, 1); }			// Fade in the song title span. Must be above 0.7 or it won't work sometimes
}

function displayMusicText(x, lifespan) {
	songTitle.innerHTML = '<span style="font-size:18px;">♪</span> <span style="font-size:27px; font-weight:50;">-</span> ' + x;			// change the text
    newFadeInOut(songTitle, lifespan);
    console.log('Now loading music - ' + x);
}

function fadeInPrices(id, opacity) {
	id.style.opacity = opacity;
	id.style.transition = 'visibility 0s 0.3s, opacity 0.3s linear';
}
function fadeOutPrices(id) {
	id.style.opacity = 0;
	id.style.transition = 'visibility 0s 0.3s, opacity 0.3s linear';
}
















function displayGameTitle() {
	if (!document.hidden) {																// Skip the whole thing if the tab is backgrounded
		const r = 12000;																// delay before the fadeout begins

		newFade(titleCard1, 0.7, 9);													// Fade in all letters at once
		newFade(titleCard2, 0.7, 9);
		newFade(titleCard3, 0.7, 9);
		newFade(titleCard4, 0.7, 9);
		newFade(titleCard5, 0.7, 9);
		newFade(titleCard6, 0.7, 9);
		newFade(titleCard7, 0.7, 9);
		newFade(titleCard8, 0.7, 9);
		newFade(titleCard9, 0.7, 9);
		setTimeout(function() { newFade(titleCard1, 0, 9) }, r);						// Fade out one letter at a time
		setTimeout(function() { newFade(titleCard2, 0, 9) }, r + 1000);
		setTimeout(function() { newFade(titleCard3, 0, 9) }, r + 2000);
		setTimeout(function() { newFade(titleCard4, 0, 9) }, r + 3000);
		setTimeout(function() { newFade(titleCard5, 0, 9) }, r + 4000);
		setTimeout(function() { newFade(titleCard6, 0, 9) }, r + 5000);
		setTimeout(function() { newFade(titleCard7, 0, 9) }, r + 6000);
		setTimeout(function() { newFade(titleCard8, 0, 9) }, r + 7000);
		setTimeout(function() { newFade(titleCard9, 0, 9) }, r + 8000);
		function deleteAll() {															// Delete the text from the DOM..
			titleCard1.className = 'invisible';
			titleCard2.className = 'invisible';
			titleCard3.className = 'invisible';
			titleCard4.className = 'invisible';
			titleCard5.className = 'invisible';
			titleCard6.className = 'invisible';
			titleCard7.className = 'invisible';
			titleCard8.className = 'invisible';
			titleCard9.className = 'invisible';
		}
		setTimeout(function() { deleteAll() }, 30000);									//..now
	}
}
















function showDiamondBar() {
	if (cow.diamondBarOwned == true) {
		newFade(diamondBarPart1, 0.7, 0.7);
		newFade(diamondBarPart2, 0.7, 0.7);
		newFade(diamondBarPart3, 0.7, 0.7);
		newFade(diamondBarPart4, 0.7, 0.7);
		newFade(diamondBarPart5, 0.7, 0.7);
		newFade(diamondBarPart6, 0.7, 0.7);
		newFade(diamondBarLabelImage, 0.7, 0.7);
		modifyCSS('progress', 'margin-top', '-17px');				// Prevents sprite blinking onLoad
	}
}

function hideDiamondBar() {
	newFade(diamondBarPart1, 0, 0.7);
	newFade(diamondBarPart2, 0, 0.7);
	newFade(diamondBarPart3, 0, 0.7);
	newFade(diamondBarPart4, 0, 0.7);
	newFade(diamondBarPart5, 0, 0.7);
	newFade(diamondBarPart6, 0, 0.7);
	newFade(diamondBarLabelImage, 0, 0.7);
}

function showEndgameBar() {
	if (cow.endgameBarOwned == true) {
		newFade(endgameBarPart1, 0.7, 0.7);
		newFade(endgameBarPart2, 0.7, 0.7);
		newFade(endgameBarPart3, 0.7, 0.7);
		newFade(endgameBarPart4, 0.7, 0.7);
		newFade(endgameBarPart5, 0.7, 0.7);
		newFade(endgameBarPart6, 0.7, 0.7);
		modifyCSS('progress', 'margin-top', '-17px');				// Prevents sprite blinking onLoad
	}
}

function checkForDiamondBarCompletion() {
	if (cow.resourceStardustBiome1 >=20 && cow.resourceStardustBiome2 >=20 && cow.resourceStardustBiome3 >=20 && cow.resourceStardustBiome4 >=20 && cow.resourceStardustBiome5 >=20 && cow.resourceStardustBiome6 >=20 && cow.diamondBarOwned == true && cow.resourceEndgameBarDiamonds == 0) {
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
















function beginCredits() {
	cow.creditsActivated = true;												// prevents credits sequence from spawning with every shape lol

	var creditsBGContainer = new PIXI.Container();								// Add new layers for credits stuff
	var creditsFGContainer = new PIXI.Container();								//
	creditsBGContainer.zIndex = 25;												//
	creditsFGContainer.zIndex = 30;												//
	app.stage.addChild(creditsBGContainer);										//
	app.stage.addChild(creditsFGContainer);										//




	function spawnCreditsPillar(color, spawnX) {
		let square = new PIXI.Graphics();										// create a shape in the PIXI engine
		square.beginFill(color);												// set a fill and line style, then code in the points
		square.moveTo(0, 0);													// places the shape at the origin for easy drawing math

		square.lineTo(150, 0);
		square.lineTo(150, 800);
		square.lineTo(0, 800);

		square.endFill();														// ends vertice drawing that was in the switch
		creditsBGContainer.addChild(square);									// add shape to the PIXI stage

		square.x = spawnX;														// Set fixed X position
		square.y = 601;

		const speedY = rngRange(1,3)/10;

		function move() {
			square.y -= speedY;													// Standard vertical movement
			if (square.y > -20) { window.requestAnimationFrame(move); }			// if shape hasn't reached the top yet, keep going
		}

		window.requestAnimationFrame(move);										// starts the animation moving
	}




	function fadeToWhite(color, spawnX) {
		let squareBG = new PIXI.Graphics();										// create a shape in the PIXI engine
		squareBG.beginFill(0xE1E5E9);											// set a fill and line style, then code in the points
		squareBG.moveTo(0, 0);													// places the shape at the origin for easy drawing math

		squareBG.lineTo(900, 0);
		squareBG.lineTo(900, 600);
		squareBG.lineTo(0, 600);

		squareBG.endFill();														// ends vertice drawing that was in the switch
		creditsFGContainer.addChild(squareBG);									// add shape to the PIXI stage

		squareBG.alpha = 0;

		function fadeinBG() {
			squareBG.alpha += 0.0004;
			Pizzicato.volume -= 0.0004;											// Mutes audio slowly

			if (squareBG.alpha >= 1) {											// Animates until alpha >= 1
				cow.hideMusicText = true;										// prevents any new music text appearing onscreen
				cow.muteMusic = true;											// save cpu
				cow.muteSFX = true;												// save cpu
			} else { window.requestAnimationFrame(fadeinBG); }					// otherwise, animate another frame and check again
		}

		window.requestAnimationFrame(fadeinBG);									// starts the animation moving
	}




	function spawnWhiteGlass1() {
		let squareG1 = new PIXI.Graphics();										// create a shape in the PIXI engine
		squareG1.beginFill(0x000000);											// set a fill and line style, then code in the points
		squareG1.moveTo(0, 450);

		squareG1.lineTo(900, 250);
		squareG1.lineTo(900, 600);
		squareG1.lineTo(0, 600);

		squareG1.endFill();														// ends vertice drawing that was in the switch
		creditsFGContainer.addChild(squareG1);									// add shape to the PIXI stage

		squareG1.alpha = 0;

		function fadeinG1() {
			squareG1.alpha += 0.0001;
			if (squareG1.alpha <= 0.02) { window.requestAnimationFrame(fadeinG1); }
		}

		window.requestAnimationFrame(fadeinG1);									// starts the animation moving
	}




	function spawnWhiteGlass2() {
		let squareG2 = new PIXI.Graphics();										// create a shape in the PIXI engine
		squareG2.beginFill(0x000000);											// set a fill and line style, then code in the points
		squareG2.moveTo(0, 550);

		squareG2.lineTo(900, 350);
		squareG2.lineTo(900, 600);
		squareG2.lineTo(0, 600);

		squareG2.endFill();														// ends vertice drawing that was in the switch
		creditsFGContainer.addChild(squareG2);									// add shape to the PIXI stage

		squareG2.alpha = 0;

		function fadeinG2() {
			squareG2.alpha += 0.0001;
			if (squareG2.alpha <= 0.02) { window.requestAnimationFrame(fadeinG2); }
		}

		window.requestAnimationFrame(fadeinG2);									// starts the animation moving
	}




	function fadeSineForever(id, lifespan) {
		id.className = 'visible';
		const alteredLifespan = lifespan * (rngRange(100,150)/100);	// +0-50%
		newFadeInOut(id, alteredLifespan);
		setTimeout(function() { fadeSineForever(id, lifespan) }, alteredLifespan * 2000);
	}




	setTimeout(spawnCreditsPillar, 1, '0x000099', 600);
	setTimeout(spawnCreditsPillar, 20000, '0x990000', 0);
	setTimeout(newFadePlusToggleAndVisibility, 35000, resourceCounter, 0, 10);
	setTimeout(newFade, 35000, pricesTextBoxContainer, 0, 10);
	setTimeout(spawnCreditsPillar, 40000, '0x996300', 150);
	setTimeout(spawnCreditsPillar, 60000, '0x009900', 450);
	setTimeout(newFadePlusToggleAndVisibility, 70000, biomeSelectBar, 0, 10);
	setTimeout(newFadePlusToggleAndVisibility, 70000, upgradeBar, 0, 10);
	setTimeout(spawnCreditsPillar, 80000, '0x990099', 750);
	setTimeout(function() { optionsMenuButton.style.opacity = 0.4; }, 94500);	// Required to make this button fadeout. Opacity must 'exist' in the correct place before it can be modified
	setTimeout(newFadePlusToggleAndVisibility, 95000, optionsMenuButton, 0, 10);
	setTimeout(newFadePlusToggleAndVisibility, 95000, optionsMenu, 0, 10);
	setTimeout(spawnCreditsPillar, 100000, '0x999900', 300);
	setTimeout(fadeToWhite, 115000);
	setTimeout(function() { cow.hideMusicText = true; }, 115000)
	setTimeout(spawnWhiteGlass1, 155000);
	setTimeout(spawnWhiteGlass2, 155000);
	setTimeout(fadeSineForever, 150000, creditsText1, 6);
	setTimeout(fadeSineForever, 155000, creditsText2, 6);
	setTimeout(fadeSineForever, 165000, creditsText3, 6);
}




function exitCredits() {
	if (creditsText3.style.opacity > 0) {
		cow.endgameBarOwned = false;
		cow.muteMusic = false;
		cow.muteSFX = false;
		cow.gameClear = true;
		saveGame();
		window.location.reload();
	}
}