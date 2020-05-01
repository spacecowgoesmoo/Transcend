function rngRange(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}




function modifyCSS(selector, property, value) {
	for (let i=0; i<document.styleSheets.length; i++) {//Loop through all styles
		//Try add rule
		try { document.styleSheets[i].insertRule(selector+ ' {'+property+':'+value+'}', document.styleSheets[i].cssRules.length);
	} catch(err) {try { document.styleSheets[i].addRule(selector, property+':'+value);} catch(err) {}}//IE
	}
}




// Requires randomColor.js, with a mod that changes it's default output format to 0xFFFFFF
function randomColorPound(luminosity, color) {
	let r = randomColor({luminosity:luminosity, hue:color});
	r = "#" + r.slice(2, 8);
	return r;
}




function lategameThrottle() {
	let throttle;
	if ((cow.currentBiome == 'biome4' || cow.endgameBarOwned == true || cow.gameClear == true) && rngRange(1,3) == 1) { throttle = true; }
	else { throttle = false; }
	return throttle;
}




function newFade(id, targetOpacity, time) {
	// targetOpacity should always be 0 or 0.7
	id.style.transition = 'opacity ' + time + 's ease';
	id.style.opacity = targetOpacity;
}




function newFadeInOut(id, time) {
	newFade(id, 0.7, time)
	setTimeout(function() { id.style.opacity = 0; }, time * 1000)
}




function newFadePlusToggleAndVisibility(id, targetOpacity, time, toggle) {
	// First part makes this also act as toggle when used as a fadeIn
	if (id.style.opacity >= (targetOpacity * 0.5) && toggle == true) {
		newFadePlusToggleAndVisibility(id, 0, time, false)
	} else {
		// Visibility
		if (targetOpacity > 0) { id.className = 'visible'; }
		// Ideally this would be <= 0, but the CSS animation's end result always varies a bit
		else { setTimeout(function() {
			if (window.getComputedStyle(id).opacity <= 0.025) { id.className = 'invisible'; } }, time * 1000)
		}
		// Opacity (the setTimeout patches a bug where it fades in instantly, no idea why)
		setTimeout(function() { newFade(id, targetOpacity, time) }, 20)
	}
}




function preventParentClick(e) {									// You need to pass the string 'event' as e or this won't work in Firefox
	if (!e) var e = window.event;
	if (e.stopPropagation) e.stopPropagation();						// Lots of redundancy here because I was trying to fix a bug
	e.preventDefault();
	e.cancelBubble = true;
	e.returnValue = false;
	e.stopImmediatePropagation();
}




// Free diablo 3 battle.net redeem code
function cubeCat () {
	const surfaceArea = '86YCYZ-7CMW-8ETXD2-D727-RGMNZV';			// Placed here on 1-17-2017. Claimed on 7-1-2017.
}




function moo() {
	console.log('moo');
}




// Makes .remove() work in IE8-11
// https://stackoverflow.com/questions/8830839/javascript-dom-remove-element
(function () {					
	var typesToPatch = ['DocumentType', 'Element', 'CharacterData'],
		remove = function () {
			// The check here seems pointless, since we're not adding this
			// method to the prototypes of any any elements that CAN be the
			// root of the DOM. However, it's required by spec (see point 1 of
			// https://dom.spec.whatwg.org/#dom-childnode-remove) and would
			// theoretically make a difference if somebody .apply()ed this
			// method to the DOM's root node, so let's roll with it.
			if (this.parentNode != null) {
				this.parentNode.removeChild(this);
			}
		};

	for (var i=0; i<typesToPatch.length; i++) {
		var type = typesToPatch[i];
		if (window[type] && !window[type].prototype.remove) {
			window[type].prototype.remove = remove;
		}
	}
})();