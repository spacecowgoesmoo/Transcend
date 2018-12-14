var preloaderContainer = new PIXI.DisplayObjectContainer();

function preloader() {
	initializeGameOne();

	preloaderContainer.zIndex = 50;
	app.stage.addChild(preloaderContainer);

	var squareBG = new PIXI.Graphics();
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
	//var cowColor = randomColor({ hue:'blue'});
	var cowColor = '0x72BCD4';

	function waitForLogin() {													
		if (cow.filesPreloaded >= 50 && diam1.alpha == 0.13)  { diam1.tint=cowColor; diam1.alpha=1;}	// Images load super fast so unbalancing the early progress bar stages is better
		if (cow.filesPreloaded >= 90 && diam2.alpha == 0.13)  { diam2.tint=cowColor; diam2.alpha=1;}	// The alpha check makes sure the color change only occurs once
		if (cow.filesPreloaded >= 115 && diam3.alpha == 0.13) { diam3.tint=cowColor; diam3.alpha=1;}
		if (cow.filesPreloaded >= 135 && diam4.alpha == 0.13) { diam4.tint=cowColor; diam4.alpha=1;}
		if (cow.filesPreloaded >= 150 && diam5.alpha == 0.13) { diam5.tint=cowColor; diam5.alpha=1;}
		if (cow.filesPreloaded >= 159 && diam6.alpha == 0.13) { diam6.tint=cowColor; diam6.alpha=1;}		
		if (cow.kongUsername && cow.filesPreloaded >= 160) {					// NOTE - This username login part doubles as a sitelock
			fadeOutDiamond(1);
			fadeOutDiamond(2);
			fadeOutDiamond(3);
			fadeOutDiamond(4);
			fadeOutDiamond(5);
			fadeOutDiamond(6);
			showStartGameButton();
		}
		else {
			var q = ((cow.filesPreloaded/160)*100).toFixed(0);
			setTimeout(waitForLogin, 500);										// Ghetto animation engine variation because we don't need 60FPS. 2FPS is fine.
		}
	}
	waitForLogin();
	
	function fadeOutDiamond(number) {
		var qq = window['diam' + number]
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
	newFade(startGameText, 1, 1.4);											// Fadein the start game text
}

function startGame() {
	if (cow.gameStarted == false) {
		newFade(startGameText, 0, 0.7);										// Fadeout the start game text
		
		initializeGameTwo();												// Start the game
		initializeGameThree();
		fadeOutPreloader();
		
		showDiamondBar();
		showEndgameBar();
		newFade(optionsMenuButtonFadeinContainer, 1, 0.7);					// Fadein all the UI
		optionsMenuButton.style.display = 'inline';							// This and the inline CSS on the HTML tag are required for IE and Edge. Fuck IE.
		newFade(resourceCounterFadeinContainer, 1, 0.7);		
		newFade(lowerRightFadeinContainer, 1, 0.7);
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
	switch (x.slice(0,2)) {
		case 'di': 	var a = "<img class='diamondCounterShape' style='top:-2px' src='Images/diamond.png'>";
					var b = "<span class='diamondPriceText' style='top:-9px' class='firefoxHack4'>";		break;
		case 'st': 	var a = "<img class='starCounterShape' style='top:-2px' src='Images/star.png'>";
					var b = "<span class='starPriceText' style='top:-8px' class='firefoxHack4'>"; 			break;
		case 'hx': 	var a = "<img class='hexagonCounterShape' style='top:-2px' src='Images/hexagon.png'>";
					var b = "<span class='hexagonPriceText' style='top:-8px' class='firefoxHack4'>"; 		break;
		case 'tr': 	var a = "<img class='triangleCounterShape' style='top:-2px' src='Images/triangle.png'>";
					var b = "<span class='trianglePriceText' style='top:-7px' class='firefoxHack4'>"; 		break;
		case 'ci': 	var a = "<img class='circleCounterShape' style='top:-1px' src='Images/circle.png'>";
					var b = "<span class='circlePriceText' style='top:-6px' class='firefoxHack4'>"; 		break;
		case 'sq': 	var a = "<img class='squareCounterShape' style='top:-1px' src='Images/square.png'>";
					var b = "<span class='squarePriceText' style='top:-6px' class='firefoxHack4'>"; 		break;
		case 'sd': 	var a = "<img class='stardustCounterShape' style='top:0px' src='Images/stardust.png'>";
					var b = "<span class='stardustPriceText' style='top:-5px' class='firefoxHack4'>"; 		break;
		default: break;
	}

	var c = x.slice(3);
	var d = '</span>';

	pricesTextBox.innerHTML = a + b + c + d;													// Display the shape and the price number
    if (pricesTextBox.style.opacity <= 0.2) { fadeInPrices(pricesTextBox); }					// Fade in the price span. the IF prevents extra animations
    if (songTitleSuperdiv.style.opacity >= 0.2) { fadeOutPrices(songTitleSuperdiv); }			// Fade out the song title span. The numbers in the IFs are really important, behavior would be weird without them
}

function clearPricesSpan() {
	if (pricesTextBox.style.opacity >= 0.025) { fadeOutPrices(pricesTextBox); }					// Fade out the price span
    if (songTitleSuperdiv.style.opacity <= 0.75) { fadeInPrices(songTitleSuperdiv); }			// Fade in the song title span. Must be above 0.7 or it won't work sometimes
}

function displayMusicText(x, lifespan) {
	songTitle.innerHTML = '<span style="font-size:18px;">♪</span> <span style="font-size:27px; font-weight:50;">-</span> ' + x;			// change the text
    fadeInOut(songTitle, lifespan);
}
















function fadeInPrices(id, lifespan) {
	id.style.opacity = 0.7;
	id.style.transition = 'visibility 0s 0.3s, opacity 0.3s linear';
}
function fadeOutPrices(id, lifespan) {
	id.style.opacity = 0;
	id.style.transition = 'visibility 0s 0.3s, opacity 0.3s linear';
}
















function displayGameTitle() {
	if (!document.hidden) {																// Skip the whole thing if the tab is backgrounded
		var q = 0;																		// delay before the animation begins. Leaving this at zero so I don't have to refactor. Delay is in code.js now
		var r = 12000;																	// delay before the fadeout begins

		setTimeout('newFade(titleCard1, 0.7, 9)', q);									// Fade in all letters at once
		setTimeout('newFade(titleCard2, 0.7, 9)', q);
		setTimeout('newFade(titleCard3, 0.7, 9)', q);
		setTimeout('newFade(titleCard4, 0.7, 9)', q);
		setTimeout('newFade(titleCard5, 0.7, 9)', q);
		setTimeout('newFade(titleCard6, 0.7, 9)', q);
		setTimeout('newFade(titleCard7, 0.7, 9)', q);
		setTimeout('newFade(titleCard8, 0.7, 9)', q);
		setTimeout('newFade(titleCard9, 0.7, 9)', q);
		setTimeout('fadeOutWithoutDelete(titleCard1, 30)', q + r);						// Fade out one letter at a time
		setTimeout('fadeOutWithoutDelete(titleCard2, 30)', q + r + 1000);
		setTimeout('fadeOutWithoutDelete(titleCard3, 30)', q + r + 2000);
		setTimeout('fadeOutWithoutDelete(titleCard4, 30)', q + r + 3000);
		setTimeout('fadeOutWithoutDelete(titleCard5, 30)', q + r + 4000);
		setTimeout('fadeOutWithoutDelete(titleCard6, 30)', q + r + 5000);
		setTimeout('fadeOutWithoutDelete(titleCard7, 30)', q + r + 6000);
		setTimeout('fadeOutWithoutDelete(titleCard8, 30)', q + r + 7000);
		setTimeout('fadeOutWithoutDelete(titleCard9, 30)', q + r + 8000);
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
		setTimeout('this.deleteAll', q + 30000);										//..now
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
		setTimeout("playAudio('SFXc/diamondBarClear.wav', 'sfx', 450, true);", 10000);
		setTimeout('cow.diamondBarOwned = false;', 14500);
		setTimeout('cow.endgameBarOwned = true;', 14500);
		setTimeout(showEndgameBar, 15000);
		setTimeout('cow.resourceStardustBiome1 = 0;', 15500);
		setTimeout('cow.resourceStardustBiome2 = 0;', 15500);
		setTimeout('cow.resourceStardustBiome3 = 0;', 15500);
		setTimeout('cow.resourceStardustBiome4 = 0;', 15500);
		setTimeout('cow.resourceStardustBiome5 = 0;', 15500);
		setTimeout('cow.resourceStardustBiome6 = 0;', 15500);
		setTimeout('cow.randomBiomesUnlocked = true;', 15500);
		setTimeout(saveGame, 15555);
	}
}
















function beginCredits() {
	var creditsBGContainer = new PIXI.DisplayObjectContainer();					// Add new layers for credits stuff
	var creditsFGContainer = new PIXI.DisplayObjectContainer();					//
	creditsBGContainer.zIndex = 25;												//
	creditsFGContainer.zIndex = 30;												//
	app.stage.addChild(creditsBGContainer);										//
	app.stage.addChild(creditsFGContainer);										//




	function spawnCreditsPillar(color, spawnX) {
		var square = new PIXI.Graphics();										// create a shape in the PIXI engine
		square.beginFill(color);												// set a fill and line style, then code in the points
		square.moveTo(0, 0);													// places the shape at the origin for easy drawing math

		square.lineTo(150, 0);
		square.lineTo(150, 1500);
		square.lineTo(0, 1500);

		square.endFill();														// ends vertice drawing that was in the switch
		creditsBGContainer.addChild(square);									// add shape to the PIXI stage

		square.x = spawnX;														// Set fixed X position
		square.y = 601;

		var speedY = rngRange(1,3)/10;

		var sfxPlayed = false;

		function move() {
			square.y -= speedY;													// Standard vertical movement

			if (square.y <= 595 && sfxPlayed == false) {						// Play SFX
				//playAudio('./SFXb/cuteSquare' + rngRange(1,3) + '.wav', 'sfx', square.x);
				sfxPlayed = true;
			}

			if (square.y < 0) { 												// if shape is offscreen..
				//square.destroy(true); 										// kill it
			} else { window.requestAnimationFrame(move); }						// otherwise, animate another frame and check again
		}																		//

		window.requestAnimationFrame(move);										// starts the animation moving
	}




	function fadeToWhite(color, spawnX) {
		var squareBG = new PIXI.Graphics();										// create a shape in the PIXI engine
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

			if (squareBG.alpha >= 1) {											// if shape is offscreen..
				cow.hideMusicText = true;										// prevents any new music text appearing onscreen
				cow.muteMusic = true;											// save cpu
				cow.muteSFX = true;												// save cpu
				//square.destroy(true); 										// kill it
			} else { window.requestAnimationFrame(fadeinBG); }					// otherwise, animate another frame and check again
		}																		//

		window.requestAnimationFrame(fadeinBG);									// starts the animation moving
	}




	function spawnWhiteGlass1() {
		var squareG1 = new PIXI.Graphics();										// create a shape in the PIXI engine
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

			if (squareG1.alpha <= 0.02) {
				window.requestAnimationFrame(fadeinG1);
			}
		}

		window.requestAnimationFrame(fadeinG1);									// starts the animation moving
	}




	function spawnWhiteGlass2() {
		var squareG2 = new PIXI.Graphics();										// create a shape in the PIXI engine
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

			if (squareG2.alpha <= 0.02) {
				window.requestAnimationFrame(fadeinG2);
			}
		}

		window.requestAnimationFrame(fadeinG2);									// starts the animation moving
	}




	function fadeSineForever(id, lifespan) {
		id.className = 'visible';
		id.style.opacity = 0;
		var q = 0.06;												// bullshit variable required; += doesn't work
		var randomize = rngRange(100,150)/100;
		function cow() {
			id.style.opacity = Math.sin(q);
			q += 0.06 * (1/lifespan) * randomize;
			if (id.style.opacity > 0.7) { id.style.opacity = 0.7; } // Cap opacity
			window.requestAnimationFrame(cow);						// Animate forever
		}
		window.requestAnimationFrame(cow);							// starts the animation moving
	}




	setTimeout(spawnCreditsPillar, 1, '0x000099', 600);
	setTimeout(spawnCreditsPillar, 20000, '0x990000', 0);
	setTimeout(fadeOut, 35000, resourceCounter, 30);
	setTimeout(fadeOutForce, 35000, pricesTextBox, 30);
	setTimeout(spawnCreditsPillar, 40000, '0x996300', 150);
	setTimeout(spawnCreditsPillar, 60000, '0x009900', 450);
	setTimeout(fadeOut, 70000, biomeSelectBar, 38);
	setTimeout(fadeOut, 70000, upgradeBar, 38);
	setTimeout(spawnCreditsPillar, 80000, '0x990099', 750);
	setTimeout('optionsMenuButton.style.opacity = 0.4;', 94500);	// Required to make this button fadeout. Opacity must 'exist' in the correct place before it can be modified
	setTimeout(fadeOutForce, 95000, optionsMenuButton, 27);			// Note - UI becomes unclickable at 0 opacity. Lucky!
	setTimeout(fadeOutForce, 95000, optionsMenu, 27);				// Note - UI becomes unclickable at 0 opacity. Lucky!
	setTimeout(spawnCreditsPillar, 100000, '0x999900', 300);
	setTimeout(fadeToWhite, 115000);
	setTimeout(spawnWhiteGlass1, 155000);
	setTimeout(spawnWhiteGlass2, 155000);
	setTimeout(fadeSineForever, 150000, creditsText1, 16);
	setTimeout(fadeSineForever, 155000, creditsText2, 16);
	setTimeout(fadeSineForever, 165000, creditsText3, 16);
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
