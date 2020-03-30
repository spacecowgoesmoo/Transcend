function eraseSave() {
	if (eraseSaveText.innerHTML == 'One..') { erase(); }
	else if (eraseSaveText.innerHTML == 'Two..') { eraseSaveText.innerHTML = 'One..'; eraseSaveText.style.color = randomColorPound('', 'red'); }
	else if (eraseSaveText.innerHTML == 'Three..') { eraseSaveText.innerHTML = 'Two..'; eraseSaveText.style.color = randomColorPound('', 'red');}
	else if (eraseSaveText.innerHTML == 'Are you sure?') { eraseSaveText.innerHTML = 'Three..'; eraseSaveText.style.color = randomColorPound('light', 'red');}
	else eraseSaveText.innerHTML = 'Are you sure?';
	// Must set currentBiome; it somehow doesn't get repopulated when the page refreshes
	function erase() {
		var temp = cow.kongUsername;		// The one thing that we don't want to reset. We need the username intact to point to the savefile
		cow = { currentBiome: 'biome1', spawnNewBGgradient: true, creditsActivated: false, gameClear: false, gameStarted: false, resourceCounterWidthArray: [], filesPreloaded: 0, preloaderComplete: false, kongUsername: temp, kongLifetimeShapes: 0, kongFirstBiomePurchased: false, kongDiamondBarUnlocked: false, kongStrayNightmareDiscovered: false, bgmVolume: 80, sfxVolume: 80, muteAudioForIE: false, randomBiomesUnlocked: false, randomBiomesActive: false, bgTransitionSpeed: 5, resourceDiamonds: 0, resourceStars: 0, resourceHexagons: 0, resourceTriangles: 0, resourceCircles: 0, resourceSquares: 0, diamondBarOwned: false, resourceStardust: 0, resourceStardustBiome1: 0, resourceStardustBiome2: 0, resourceStardustBiome3: 0, resourceStardustBiome4: 0, resourceStardustBiome5: 0, resourceStardustBiome6: 0, endgameBarOwned: false, resourceEndgameBarDiamonds: 0, resourceEndgameBarStars: 0, resourceEndgameBarHexagons: 0, resourceEndgameBarTriangles: 0,	resourceEndgameBarCircles: 0, resourceEndgameBarSquares: 0, stardustSpawnBoost1Owned: false, stardustSpawnBoost2Owned: false, biome1Owned: true, biome2Owned: false, biome3Owned: false, biome4Owned: false, biome5Owned: false, biome6Owned: false, nextDiamondPrice: 2, nextStarPrice: 10, nextHexagonPrice: 20, nextTrianglePrice: 20, nextCirclePrice: 10, nextSquarePrice: 150, diamondCapacity: 1, starCapacity: 1, hexagonCapacity: 0, bgHexagonCapacity: 40, triangleCapacity: 0, circleCapacity: 0, squareCapacity: 0, maxDiamondCapacity: 10, maxStarCapacity: 10, maxHexagonCapacity: 10, maxTriangleCapacity: 10, maxCircleCapacity: 10, maxSquareCapacity: 100, biome1CurrentDiamondCount: 0, biome1CurrentStarCount: 0, biome2CurrentHexagonCount: 0, biome2CurrentBGHexagonCount: 0, biome3CurrentTriangleCount: 0, biome3CurrentCircleCount: 0, biome4CurrentSquareCount: 0, biome5CurrentCircleCount: 0, biome5CurrentHexagonCount: 0, biome6CurrentCircleCount: 0, biome6CurrentStarCount: 0};
		saveGame();
		window.location.reload();
	 }
}




function exportSave() {
	// Display exported save and blank import save box
	exportSaveTextField.value = JSON.stringify(window.opener.cow);
}




function exportEncryptedSave() {
	console.log(window.opener.cow);
	var q = JSON.stringify(window.opener.cow);
	q = CryptoJS.AES.encrypt(q, 'notVerySecretHash');
	exportSaveTextField.value = q;
}




function importSave() {
	var q = prompt('Paste your save file here');
	if (q != null) {
		window.cow = JSON.parse(q);
		// Modify some temporary stats for a cleaner game load
		cow.currentBiome = 'biome1';
		cow.gameStarted = false;
		cow.spawnNewBGgradient = true;
		cow.biome1CurrentDiamondCount = 0;
		cow.biome1CurrentStarCount = 0;
		cow.biome2CurrentHexagonCount = 0;
		cow.biome3CurrentTriangleCount = 0;
		cow.biome3CurrentCircleCount = 0;
		cow.biome4CurrentSquareCount = 0;
		cow.biome5CurrentCircleCount = 0;
		cow.biome5CurrentHexagonCount = 0;
		cow.biome6CurrentSquareCount = 0;
		cow.biome6CurrentStarCount = 0;
		saveGame();
		window.location.reload();
	} else alert("Save import cancelled");
	newFade(optionsMenu, 0, 0.25);
}




function importEncryptedSave() {
	var q = prompt('Paste your save file here');
	if (q != null) {
		q = CryptoJS.AES.decrypt(q, 'notVerySecretHash');		// Decrypt save file
		q = q.toString(CryptoJS.enc.Utf8);						// Required because the decrypter outputs hex instead of ascii by default. This reconverts it
		window.cow = JSON.parse(q);
		// Modify some temporary stats for a cleaner game load
		cow.currentBiome = 'biome1';
		cow.gameStarted = false;
		cow.spawnNewBGgradient = true;
		cow.biome1CurrentDiamondCount = 0;
		cow.biome1CurrentStarCount = 0;
		cow.biome2CurrentHexagonCount = 0;
		cow.biome3CurrentTriangleCount = 0;
		cow.biome3CurrentCircleCount = 0;
		cow.biome4CurrentSquareCount = 0;
		cow.biome5CurrentCircleCount = 0;
		cow.biome5CurrentHexagonCount = 0;
		cow.biome6CurrentSquareCount = 0;
		cow.biome6CurrentStarCount = 0;
		saveGame();
		window.location.reload();
	} else alert("Save import cancelled");
	newFade(optionsMenu, 0, 0.25);
}




function saveGame() {
	var zzz = "transcendSAVEFILE" + cow.kongUsername;
	localStorage.removeItem(zzz);
	localStorage.setItem(zzz, JSON.stringify(cow));
}




function saveGameRecursive() {
	var zzz = "transcendSAVEFILE" + cow.kongUsername;
	localStorage.removeItem(zzz);
	localStorage.setItem(zzz, JSON.stringify(cow));
	setTimeout(saveGameRecursive, 60000);
}




function loadGame() {
	var zzz = "transcendSAVEFILE" + cow.kongUsername;
	var q = localStorage.getItem(zzz);
	console.log('Attempting login with Kong username: ' + cow.kongUsername);
	if (q != null) {
		// Load the save file
		window.cow = JSON.parse(q);
		// Modify some temporary stats for a cleaner game load
		cow.spawnNewBGgradient = true;
		cow.creditsActivated = false;
		cow.hideMusicText = false;
		cow.muteAudioForIE = false;
		cow.gameStarted = true;

		cow.bgTransitionSpeed = 5;

		cow.biome1CurrentDiamondCount = 0;
		cow.biome1CurrentStarCount = 0;
		cow.biome2CurrentHexagonCount = 0;
		cow.biome2CurrentBGHexagonCount = 0;
		cow.biome3CurrentTriangleCount = 0;
		cow.biome3CurrentCircleCount = 0;
		cow.biome4CurrentSquareCount = 0;
		cow.biome5CurrentCircleCount = 0;
		cow.biome5CurrentHexagonCount = 0;
		cow.biome6CurrentSquareCount = 0;
		cow.biome6CurrentStarCount = 0;
		cow.biome6CurrentCircleCount = 0;
	}
}




// For when CSS's :hover is giving you shit
function hoverRNGColor(id) { id.style.color = randomColorPound('hax'); }
function hoverWhite(id) { id.style.color = '#FFFFFF'; }
function hoverRNGColorEraseSaveHack(id) { if (eraseSaveText.innerHTML == 'Erase Save' || eraseSaveText.innerHTML == 'Are you sure?') { id.style.color = randomColorPound('hax'); } }
function hoverWhiteEraseSaveHack(id) { if (eraseSaveText.innerHTML == 'Erase Save' || eraseSaveText.innerHTML == 'Are you sure?') { id.style.color = '#FFFFFF'; } }