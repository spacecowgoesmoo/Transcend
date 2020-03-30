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




// Create a HTML object with javascript
	// var q = document.createElement('span');
	// q.setAttribute('id', 'textCowSpan');
	// document.body.appendChild(q);




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
	id.style.opacity = targetOpacity;
	id.style.transition = 'opacity ' + time + 's ease';
}




function newFadeInOut(id, time) {
	id.style.opacity = 0.7;
	id.style.transition = 'opacity ' + time + 's ease';
	setTimeout(function() { id.style.opacity = 0; }, time * 1000)
}




function fadeIn(id, lifespan) {
	if (id.style.opacity <= 0) {									// prevents extra animations for buttons
		id.className = 'visible';
		id.style.opacity = 0;	
		var q = 0.06;												// bullshit variable required; += doesn't work
		function cow() {
			id.style.opacity = q;
			q += 0.06*(1/lifespan);
		
			if (id.style.opacity < 0.7) { window.requestAnimationFrame(cow); }		// if not faded in, animate another frame 
		}
		window.requestAnimationFrame(cow);							// starts the animation moving
	}
	if (id.style.opacity >= 0.7) { fadeOut(id, lifespan); }			// Makes the fadeIn button trigger fadeOut if the object is already visible
}




function fadeOut(id, lifespan) {
	if (id.style.opacity >= 0.68) {									// If object has completed its fadein animation..	
			id.style.opacity = 0.7;									// required or it doesn't work (???)
		function cow() {
			id.style.opacity -= 0.06*(1/lifespan);
    	
			if (id.style.opacity > 0) { window.requestAnimationFrame(cow); }	// if not faded out, animate another frame 
			else id.className = 'invisible';
		}
		window.requestAnimationFrame(cow);							// starts the animation moving
	}
}




function fadeOutForce(id, lifespan) {
		function cow() {
			id.style.opacity -= 0.06*(1/lifespan);
    	
			if (id.style.opacity > 0) { window.requestAnimationFrame(cow); }	// if not faded out, animate another frame 
			else id.className = 'invisible';
		}
		window.requestAnimationFrame(cow);							// starts the animation moving
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
	var surfaceArea = '86YCYZ-7CMW-8ETXD2-D727-RGMNZV';				// Placed here on 1-17-2017. Claimed on 7-1-2017.
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