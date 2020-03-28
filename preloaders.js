function preloadFiles() {
	// Force the preloader to abort if it hasn't finished quickly enough
	setTimeout( function() { 
		cow.filesPreloaded = 160
		console.log('Preloader is taking too long, forcing game initialization..')
	 }, 2500)

	// Preload
	// NOTE: On tc.com, the last 10% of files loaded will usually fail when accessed over https
	function load(filename) {		
	    var xmlhttp;
	    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
	        xmlhttp = new XMLHttpRequest();
	    } else { // code for IE6, IE5
	        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	    }
	    xmlhttp.onreadystatechange = function() {
	        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				var q = document.createElement('span');	// Extra stuff to make IE happy. Fuck IE
				q.setAttribute('id', 'loadSound');		//
				q.setAttribute('class', 'invisible');	//
				document.body.appendChild(q);			//
	            document.getElementById("loadSound").innerHTML = '<embed src="' + filename + '" controller="1" autoplay="0" autostart="0" />';
				console.log('Loaded file ' + cow.filesPreloaded + '/159 - ' + filename);
				cow.filesPreloaded++;
	        }
	    }
	    xmlhttp.open("GET", filename, true);
	    xmlhttp.send();
	}
	
	// Images
	load('Images/gear.png');
	load('Images/diamond.png');
	load('Images/diamondColor1.png');
	load('Images/diamondColor2.png');
	load('Images/diamondColor3.png');
	load('Images/diamondColor4.png');
	load('Images/diamondColor5.png');
	load('Images/diamondColor6.png');
	load('Images/diamondColor7.png');
	load('Images/star.png');
	load('Images/starColor1.png');
	load('Images/starColor2.png');
	load('Images/starColor3.png');
	load('Images/starColor4.png');
	load('Images/starColor5.png');
	load('Images/starColor6.png');
	load('Images/starColor7.png');
	load('Images/hexagon.png');
	load('Images/hexagonColor1.png');
	load('Images/hexagonColor2.png');
	load('Images/hexagonColor3.png');
	load('Images/hexagonColor4.png');
	load('Images/hexagonColor5.png');
	load('Images/hexagonColor6.png');
	load('Images/hexagonColor7.png');
	load('Images/triangle.png');
	load('Images/triangleColor1.png');
	load('Images/triangleColor2.png');
	load('Images/triangleColor3.png');
	load('Images/triangleColor4.png');
	load('Images/triangleColor5.png');
	load('Images/triangleColor6.png');
	load('Images/triangleColor7.png');
	load('Images/circle.png');
	load('Images/circleColor1.png');
	load('Images/circleColor2.png');
	load('Images/circleColor3.png');
	load('Images/circleColor4.png');
	load('Images/circleColor5.png');
	load('Images/circleColor6.png');
	load('Images/circleColor7.png');
	load('Images/square.png');
	load('Images/squareColor1.png');
	load('Images/squareColor2.png');
	load('Images/squareColor3.png');
	load('Images/squareColor4.png');
	load('Images/squareColor5.png');
	load('Images/squareColor6.png');
	load('Images/squareColor7.png');
	load('Images/stardust.png');
	load('Images/diamondHollow.png');
	load('Images/diamondHollowColor1.png');
	load('Images/diamondHollowColor2.png');
	load('Images/diamondHollowColor3.png');
	load('Images/starHollow.png');
	load('Images/starHollowColor1.png');
	load('Images/starHollowColor2.png');
	load('Images/starHollowColor3.png');
	load('Images/hexagonHollow.png');
	load('Images/hexagonHollowColor1.png');
	load('Images/hexagonHollowColor2.png');
	load('Images/hexagonHollowColor3.png');
	load('Images/triangleHollow.png');
	load('Images/triangleHollowColor1.png');
	load('Images/triangleHollowColor2.png');
	load('Images/triangleHollowColor3.png');
	load('Images/circleHollow.png');
	load('Images/circleHollowColor1.png');
	load('Images/circleHollowColor2.png');
	load('Images/circleHollowColor3.png');
	load('Images/squareHollow.png');
	load('Images/squareHollowColor1.png');
	load('Images/squareHollowColor2.png');
	load('Images/squareHollowColor3.png');
	load('Images/stardustHollow.png');
	load('Images/stardustHollowColor1.png');
	load('Images/stardustHollowColor2.png');
	load('Images/stardustHollowColor3.png');
	load('Images/diamondBar.png');
	load('Images/diamondBarHollow.png');
	load('Images/diamondBarHollowColor1.png');
	load('Images/diamondBarHollowColor2.png');
	load('Images/diamondBarHollowColor3.png');
	
	// Shape SFX
	load('SFX/diamond1.wav');
	load('SFX/diamond2.wav');
	load('SFX/diamond3.wav');
	load('SFX/diamond4.wav');
	load('SFX/diamond5.wav');
	load('SFX/star1.wav');
	load('SFX/star2.wav');
	load('SFX/star3.wav');
	load('SFX/star4.wav');
	load('SFX/star5.wav');
	load('SFX/hexagon1.wav');
	load('SFX/hexagon2.wav');
	load('SFX/hexagon3.wav');
	load('SFX/hexagon4.wav');
	load('SFX/hexagon5.wav');
	load('SFX/triangle1.wav');
	load('SFX/triangle2.wav');
	load('SFX/triangle3.wav');
	load('SFX/triangle4.wav');
	load('SFX/triangle5.wav');
	load('SFX/square1.wav');
	load('SFX/square2.wav');
	load('SFX/square3.wav');
	load('SFX/square4.wav');
	load('SFX/square5.wav');
	load('SFX/circle1.wav');
	load('SFX/circle2.wav');
	load('SFX/circle3.wav');
	load('SFX/circle4.wav');
	load('SFX/circle5.wav');
	
	// Rare Spawn SFX
	load('SFXb/blackCircle1.wav');
	load('SFXb/blackCircle2.wav');
	load('SFXb/blackCircle3.wav');
	load('SFXb/constellation1.wav');
	load('SFXb/constellation2.wav');
	load('SFXb/constellation3.wav');
	load('SFXb/cuteSquare1.wav');
	load('SFXb/cuteSquare2.wav');
	load('SFXb/cuteSquare3.wav');
	load('SFXb/fallingStar1.wav');
	load('SFXb/fallingStar2.wav');
	load('SFXb/fallingStar3.wav');
	load('SFXb/hexScanner1.wav');
	load('SFXb/hexScanner2.wav');
	load('SFXb/hexScanner3.wav');
	load('SFXb/paint1.wav');
	load('SFXb/paint2.wav');
	load('SFXb/paint3.wav');
	load('SFXb/quadQuad1.wav');
	load('SFXb/quadQuad2.wav');
	load('SFXb/quadQuad3.wav');
	load('SFXb/triCreepy1.wav');
	load('SFXb/triCreepy2.wav');
	load('SFXb/triCreepy3.wav');
	load('SFXb/triTower1.wav');
	load('SFXb/triTower2.wav');
	load('SFXb/triTower3.wav');
	load('SFXb/ufo1.wav');
	load('SFXb/ufo2.wav');
	load('SFXb/ufo3.wav');
	
	// UI SFX
	load('SFXc/buyShape1.wav');
	load('SFXc/buyShape2.wav');
	load('SFXc/buyShape3.wav');
	load('SFXc/buyShape4.wav');
	load('SFXc/buyShape5.wav');
	load('SFXc/buyShape6.wav');
	load('SFXc/buyShape7.wav');
	load('SFXc/capacityBoost1.wav');
	load('SFXc/capacityBoost2.wav');
	load('SFXc/capacityBoost3.wav');
	load('SFXc/diamondBarClear.wav');
	load('SFXc/newBiome1.wav');
	load('SFXc/newBiome2.wav');
	load('SFXc/newBiome3.wav');
	load('SFXc/stardustBoost1.wav');
	load('SFXc/stardustBoost2.wav');
	load('SFXc/stardustBoost3.wav');
}