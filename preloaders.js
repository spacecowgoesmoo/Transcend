function preloadFiles() {
	// Force the preloader to abort if it hasn't finished quickly enough
	setTimeout( function() { 
		if (cow.preloaderComplete == false) {
			cow.preloaderComplete = true;
			console.log('Preloader is taking too long, forcing game initialization..')
		}
	}, 25000)

	// Preload
	// NOTE: On tc.com, the last 10% of files loaded will usually fail when accessed over https
	function load(filename) {
		let xmlhttp;
		if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
			xmlhttp = new XMLHttpRequest();
		} else { // code for IE6, IE5
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		// Note: As of Apr 2020, this doesn't work locally with safari anymore, even with CORS protection off
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				let q = document.createElement('span');	// Extra stuff to make IE happy. Fuck IE
				q.setAttribute('id', 'loadSound');		//
				q.setAttribute('class', 'invisible');	//
				document.body.appendChild(q);			//
				document.getElementById("loadSound").innerHTML = '<embed src="' + filename + '" controller="1" autoplay="0" autostart="0"/>';
				// Prevents Firefox from audibly playing preloaded SFX
				if (navigator.userAgent.indexOf('Firefox') > -1 && navigator.userAgent.indexOf('Seamonkey') == -1) {
					document.getElementById("loadSound").innerHTML = '';
				}
				console.log('Loaded file ' + cow.filesPreloaded + '/166 - ' + filename);
				cow.filesPreloaded++;
				if (cow.filesPreloaded >= 166) { 
					setTimeout(function() { cow.preloaderComplete = true; }, 1500);
				}
			}
		}
		xmlhttp.open("GET", filename, true);
		xmlhttp.send();
	}
	
	// Start loading the biggest SFX first
	load('SFXb/triTower1' + cow.audioFormat);
	load('SFXb/triTower2' + cow.audioFormat);
	load('SFXb/triTower3' + cow.audioFormat);
	load('SFXb/constellation1' + cow.audioFormat);
	load('SFXb/constellation2' + cow.audioFormat);
	load('SFXb/constellation3' + cow.audioFormat);
	load('SFXc/diamondBarClear' + cow.audioFormat);
	load('SFXb/ufo1' + cow.audioFormat);
	load('SFXb/ufo2' + cow.audioFormat);
	load('SFXb/ufo3' + cow.audioFormat);

	// Images
	load('Images/biome1.png');
	load('Images/biome1Color1.png');
	load('Images/biome1Color2.png');
	load('Images/biome1Color3.png');
	load('Images/biome2.png');
	load('Images/biome2Color1.png');
	load('Images/biome2Color2.png');
	load('Images/biome2Color3.png');
	load('Images/biome3.png');
	load('Images/biome3Color1.png');
	load('Images/biome3Color2.png');
	load('Images/biome3Color3.png');
	load('Images/biome4.png');
	load('Images/biome4Color1.png');
	load('Images/biome4Color2.png');
	load('Images/biome4Color3.png');
	load('Images/biome5.png');
	load('Images/biome5Color1.png');
	load('Images/biome5Color2.png');
	load('Images/biome5Color3.png');
	load('Images/biome6.png');
	load('Images/biome6Color1.png');
	load('Images/biome6Color2.png');
	load('Images/biome6Color3.png');
	load('Images/circle.png');
	load('Images/circleColor1.png');
	load('Images/circleColor2.png');
	load('Images/circleColor3.png');
	load('Images/circleColor4.png');
	load('Images/circleHollow.png');
	load('Images/circleHollowColor1.png');
	load('Images/circleHollowColor2.png');
	load('Images/circleHollowColor3.png');
	load('Images/diamond.png');
	load('Images/diamondBar.png');
	load('Images/diamondBarHollow.png');
	load('Images/diamondBarHollowColor1.png');
	load('Images/diamondBarHollowColor2.png');
	load('Images/diamondBarHollowColor3.png');
	load('Images/diamondColor1.png');
	load('Images/diamondColor2.png');
	load('Images/diamondColor3.png');
	load('Images/diamondColor4.png');
	load('Images/diamondHollow.png');
	load('Images/diamondHollowColor1.png');
	load('Images/diamondHollowColor2.png');
	load('Images/diamondHollowColor3.png');
	load('Images/fuzz.png');
	load('Images/gear.png');
	load('Images/hexagon.png');
	load('Images/hexagonColor1.png');
	load('Images/hexagonColor2.png');
	load('Images/hexagonColor3.png');
	load('Images/hexagonColor4.png');
	load('Images/hexagonHollow.png');
	load('Images/hexagonHollowColor1.png');
	load('Images/hexagonHollowColor2.png');
	load('Images/hexagonHollowColor3.png');
	load('Images/square.png');
	load('Images/squareColor1.png');
	load('Images/squareColor2.png');
	load('Images/squareColor3.png');
	load('Images/squareColor4.png');
	load('Images/squareHollow.png');
	load('Images/squareHollowColor1.png');
	load('Images/squareHollowColor2.png');
	load('Images/squareHollowColor3.png');
	load('Images/star.png');
	load('Images/starColor1.png');
	load('Images/starColor2.png');
	load('Images/starColor3.png');
	load('Images/starColor4.png');
	load('Images/stardust.png');
	load('Images/stardustHollow.png');
	load('Images/stardustHollowColor1.png');
	load('Images/stardustHollowColor2.png');
	load('Images/stardustHollowColor3.png');
	load('Images/starHollow.png');
	load('Images/starHollowColor1.png');
	load('Images/starHollowColor2.png');
	load('Images/starHollowColor3.png');
	load('Images/triangle.png');
	load('Images/triangleColor1.png');
	load('Images/triangleColor2.png');
	load('Images/triangleColor3.png');
	load('Images/triangleColor4.png');
	load('Images/triangleHollow.png');
	load('Images/triangleHollowColor1.png');
	load('Images/triangleHollowColor2.png');
	load('Images/triangleHollowColor3.png');

	// Shape SFX
	load('SFX/diamond1' + cow.audioFormat);
	load('SFX/diamond2' + cow.audioFormat);
	load('SFX/diamond3' + cow.audioFormat);
	load('SFX/diamond4' + cow.audioFormat);
	load('SFX/diamond5' + cow.audioFormat);
	load('SFX/star1' + cow.audioFormat);
	load('SFX/star2' + cow.audioFormat);
	load('SFX/star3' + cow.audioFormat);
	load('SFX/star4' + cow.audioFormat);
	load('SFX/star5' + cow.audioFormat);
	load('SFX/hexagon1' + cow.audioFormat);
	load('SFX/hexagon2' + cow.audioFormat);
	load('SFX/hexagon3' + cow.audioFormat);
	load('SFX/hexagon4' + cow.audioFormat);
	load('SFX/hexagon5' + cow.audioFormat);
	load('SFX/triangle1' + cow.audioFormat);
	load('SFX/triangle2' + cow.audioFormat);
	load('SFX/triangle3' + cow.audioFormat);
	load('SFX/triangle4' + cow.audioFormat);
	load('SFX/triangle5' + cow.audioFormat);
	load('SFX/square1' + cow.audioFormat);
	load('SFX/square2' + cow.audioFormat);
	load('SFX/square3' + cow.audioFormat);
	load('SFX/square4' + cow.audioFormat);
	load('SFX/square5' + cow.audioFormat);
	load('SFX/circle1' + cow.audioFormat);
	load('SFX/circle2' + cow.audioFormat);
	load('SFX/circle3' + cow.audioFormat);
	load('SFX/circle4' + cow.audioFormat);
	load('SFX/circle5' + cow.audioFormat);
	
	// Rare Spawn SFX
	load('SFXb/blackCircle1' + cow.audioFormat);
	load('SFXb/blackCircle2' + cow.audioFormat);
	load('SFXb/blackCircle3' + cow.audioFormat);
	// constellation 1 2 3
	load('SFXb/cuteSquare1' + cow.audioFormat);
	load('SFXb/cuteSquare2' + cow.audioFormat);
	load('SFXb/cuteSquare3' + cow.audioFormat);
	load('SFXb/fallingStar1' + cow.audioFormat);
	load('SFXb/fallingStar2' + cow.audioFormat);
	load('SFXb/fallingStar3' + cow.audioFormat);
	load('SFXb/hexScanner1' + cow.audioFormat);
	load('SFXb/hexScanner2' + cow.audioFormat);
	load('SFXb/hexScanner3' + cow.audioFormat);
	load('SFXb/paint1' + cow.audioFormat);
	load('SFXb/paint2' + cow.audioFormat);
	load('SFXb/paint3' + cow.audioFormat);
	load('SFXb/quadQuad1' + cow.audioFormat);
	load('SFXb/quadQuad2' + cow.audioFormat);
	load('SFXb/quadQuad3' + cow.audioFormat);
	load('SFXb/triCreepy1' + cow.audioFormat);
	load('SFXb/triCreepy2' + cow.audioFormat);
	load('SFXb/triCreepy3' + cow.audioFormat);
	// triTower 1 2 3
	// ufo 1 2 3
	
	// UI SFX
	load('SFXc/buyShape1' + cow.audioFormat);
	load('SFXc/buyShape2' + cow.audioFormat);
	load('SFXc/buyShape3' + cow.audioFormat);
	load('SFXc/buyShape4' + cow.audioFormat);
	load('SFXc/buyShape5' + cow.audioFormat);
	load('SFXc/buyShape6' + cow.audioFormat);
	load('SFXc/buyShape7' + cow.audioFormat);
	load('SFXc/capacityBoost1' + cow.audioFormat);
	load('SFXc/capacityBoost2' + cow.audioFormat);
	load('SFXc/capacityBoost3' + cow.audioFormat);
	// diamondBarClear
	load('SFXc/newBiome1' + cow.audioFormat);
	load('SFXc/newBiome2' + cow.audioFormat);
	load('SFXc/newBiome3' + cow.audioFormat);
	load('SFXc/stardustBoost1' + cow.audioFormat);
	load('SFXc/stardustBoost2' + cow.audioFormat);
	load('SFXc/stardustBoost3' + cow.audioFormat);
}