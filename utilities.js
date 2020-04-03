function rngRange(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}




function randomColor100() {
	return "0x111111".replace(/1/g,function(){return (~~(Math.random()*16)).toString(16);});
}




function modifyCSS(selector, property, value) {
	for (var i=0; i<document.styleSheets.length;i++) {//Loop through all styles
		//Try add rule
		try { document.styleSheets[i].insertRule(selector+ ' {'+property+':'+value+'}', document.styleSheets[i].cssRules.length);
	} catch(err) {try { document.styleSheets[i].addRule(selector, property+':'+value);} catch(err) {}}//IE
	}
}




// Requires randomColor.js, with a mod that changes it's default output format to 0xFFFFFF
function randomColorPound(luminosity, color) {
	var r = randomColor({luminosity:luminosity, hue:color});
	r = "#" + r.slice(2, 8);
	return r;
}




// Haven't tried this yet but it looks useful. Pulled out of randomColor.js
function stringToInteger (string) {
	var total = 0
	for (var i = 0; i !== string.length; i++) {
		if (total >= Number.MAX_SAFE_INTEGER) break;
		total += string.charCodeAt(i)
	}
	return total
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




// TODO: Fading in doesn't work right with visibility
// TODO: Prevent errors from clickspamming, in both directions
function newFadePlusToggleAndVisibility(id, targetOpacity, time, toggle) {
	// First part makes this also toggle opacity when used as a fadeIn
	if (id.style.opacity >= 0.3 && toggle == true) {
		newFadePlusToggleAndVisibility(id, 0, time)
	} else {
		// Visibility
		if (targetOpacity > 0) { id.className = 'visible'; id.style.opacity = 0; }
		else { setTimeout(function() { id.className = 'invisible'; }, time * 1000) }
		// Opacity
		newFade(id, targetOpacity, time)
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




function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}




// Free diablo 3 battle.net redeem code
function cubeCat () {
	const surfaceArea = '86YCYZ-7CMW-8ETXD2-D727-RGMNZV';			// Placed here on 1-17-2017. Claimed on 7-1-2017.
}




function moo() {
	console.log('moo');
}




function playAudioBasic(file) {
	var snd = new Audio(file); 										// Loads file. Remember to use folder paths
	snd.play();														// Plays file
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