// I used to be frightened of dying
// I used to think death was the end
// But that was before, I'm not scared anymore
// I know that my soul will transcend


// I turn my back to the wind
// To catch my breath
// Before I start off again








let bgmGroup = new Pizzicato.Group;											// Initialize global audio groups/busses
let sfxGroup = new Pizzicato.Group;


function playAudio(filename, type, pan, noFilter) {
	if (((cow.sfxVolume >= 5 && type == 'sfx') || type == 'bgm') && cow.muteAudioForIE == false) {	// Prevents SFX from loading if SFX are muted. Saves CPU
		let snd = new Pizzicato.Sound(filename + cow.audioFormat, function() {

			if (rngRange(1,10) < 3 && type == 'sfx') {						// Set up effects and add them to the signal chain one by one
				const distortion = new Pizzicato.Effects.Distortion({		// No distortion allowed on music
					gain: rngRange(20,50)/100,
				});
				snd.addEffect(distortion);
			}
	
			// if (rngRange(1,10) < 3) {									// Probably more CPU intensive than distortion and not much different
			// 	const quadrafuzz = new Pizzicato.Effects.Quadrafuzz({		// Can add too much high statics
			// 	    lowGain: rngRange(3,7)/10,
			// 	    midLowGain: rngRange(3,7)/10,
			// 	    midHighGain: rngRange(3,7)/10,
			// 	    highGain: rngRange(3,7)/10,
			// 	    mix: rngRange(5,10)/10
			// 	});
			// 	snd.addEffect(quadrafuzz);
			// }

			// if (rngRange(1,100) < 7 && type == 'sfx') {					// Sounds good but murders the CPU and audio engine
			// 	const delay = new Pizzicato.Effects.Delay({					// Each +10% chance costs about 20% more CPU at endgame
			// 		feedback: rngRange(4,8)/10,
			//     	time: rngRange(2,20)/10,
			//     	mix: rngRange(6,10)/10
			// 	});
			// 	snd.addEffect(delay);
			// }

			// if (rngRange(1,10) < 3 && type == 'sfx') {					// Sounds good but murders the CPU and audio engine
			// 	const reverb = new Pizzicato.Effects.Reverb({				// SFX also sound less muddier without it..
			// 	    time: rngRange(100,300)/100,
			// 	    decay: rngRange(100,300)/100,
			// 	    mix: rngRange(6,10)/10
			// 	});
			// 	if (rngRange(1,10) < 5) { reverb.reverse = true; }
			// 	snd.addEffect(reverb);
			// }

			if (rngRange(1,10) < 2 && noFilter != true) {					// the != saves me from having to add 'noFilter=false' to everything
				const lowPassFilter = new Pizzicato.Effects.LowPassFilter({	// noFilter is used for the evilCircles whose SFX are only bass
				    frequency: rngRange(200,600),
				    peak: rngRange(5,15)
				});
				snd.addEffect(lowPassFilter);
			}

			if (rngRange(1,10) < 2 && noFilter != true) {
				const highPassFilter = new Pizzicato.Effects.HighPassFilter({
				    frequency: rngRange(1000,5000),
				    peak: rngRange(5,15)
				});
				snd.addEffect(highPassFilter);
			}

			// if (rngRange(1,10) < 3) {									// Not noticible enough when low, sounds bad when high
			// 	const flanger = new Pizzicato.Effects.Flanger({
			// 		time: rngRange(5,7)/10,
			// 	    speed: rngRange(5,7)/10,
			// 	    depth: rngRange(1,2)/10,
			// 		feedback: rngRange(1,5)/10,
			// 	    mix: rngRange(4,6)/10
			// 	});
			// 	snd.addEffect(flanger);
			// }

			const stereoPanner = new Pizzicato.Effects.StereoPanner({		// Applied to every SFX
			    pan: (pan-450)/450											// Converts X position to panning. (0, 900) to (-1, 1)
			});
			snd.addEffect(stereoPanner);
	
			// Add, play, and remove sound.	Set volume takes place at different times for reasons below
			if (type == 'sfx') { 
				snd.volume = cow.sfxVolume/100; 
				sfxGroup.addSound(snd); 
				sfxGroup.play(); 	
				sfxGroup.removeSound(snd);
			}		
			if (type == 'bgm') { 
				bgmGroup.addSound(snd);
				bgmGroup.play();
				bgmGroup.volume = cow.bgmVolume/100;
				setTimeout(killBGM, 240000, snd);	// Remove the BGM after 4 minutes
			}
		});
	}
	function killBGM(snd) { bgmGroup.removeSound(snd); }
}








function musicSpawnController() {
	if (!document.hidden && cow.hideMusicText == false) {					// Skip everything if the tab is backgrounded, or if we're in the credits
		let q;
		let r = rngRange(1,100);											// Select biome song or random song
		
		if (cow.endgameBarOwned == true || cow.gameClear == true) 	{ q = rngRange(1,10); } else  	// Gates some songs to Phase 2 and 3
		if (cow.diamondBarOwned == true ) 							{ q = rngRange(1,9); } else  	//
											 						{ q = rngRange(1,4); }	 	  	//

		if (cow.diamondCapacity <= 2) { r = 1; }							// Force 'Abstraction' to play first on a new game
		if (cow.endgameBarOwned == true && cow.gameClear == false && rngRange(1,10) <= 3) 	{ r=0; q=10; }  	// Higher chance of Fading Space
			else {
				const lifespan = 12
				if (r <= 33) {														// Higher weighted chance of the main biome songs
					switch (cow.currentBiome) {
						case 'biome1': displayMusicText('Bring On The Abstraction', lifespan); break;			// display the relevant song title
						case 'biome2': displayMusicText('Cold Hearted Spotlight', lifespan); break;
						case 'biome3': displayMusicText("You're My Fire", lifespan); break;
						case 'biome4': displayMusicText('Lightning is Comin For You', lifespan); break;
						case 'biome5': displayMusicText('Perfect Repetition', lifespan); break;
						case 'biome6': displayMusicText('Supersonic Eternity', lifespan); break;
						default: break;
					}
				} else {															// otherwise, select a random song title
					switch (q) {
						case 1: displayMusicText('Electric Sunrise', lifespan); break;
						case 2: displayMusicText('Crank Up The Ecstasy', lifespan); break;
						case 3: displayMusicText('Blue Passion', lifespan); break;
						case 4: displayMusicText('Red Whisper', lifespan); break;

						// Phase 2 only
						case 5: displayMusicText("Can't Stop The Punk", lifespan); break;
						case 6: displayMusicText('Far From Consequence', lifespan); break;
						case 7: displayMusicText('Chaos is Okay', lifespan); break;
						case 8: displayMusicText('Beat Paradise', lifespan); break;
						case 9: displayMusicText('trace.transcend', lifespan); break;

						// Phase 3 only
						case 10: displayMusicText('Fading Space', lifespan); break;
						default: break;
					}
				}
			}








		if (r <= 33) {													// Plays music
			switch (cow.currentBiome) {
				case 'biome1': playAudio('./Music/bota', 'bgm', 450); break;
				case 'biome2': playAudio('./Music/chs', 'bgm', 450); break;
				case 'biome3': playAudio('./Music/ymf', 'bgm', 450); break;
				case 'biome4': playAudio('./Music/licfy', 'bgm', 450); break;
				case 'biome5': playAudio('./Music/pr', 'bgm', 450); break;
				case 'biome6': playAudio('./Music/se', 'bgm', 450); break;
				default: break;
			}
		} else {
			switch (q) {
				case 1: playAudio('./Music/es', 'bgm', 450); break;
				case 2: playAudio('./Music/cute', 'bgm', 450); break;
				case 3: playAudio('./Music/bluep', 'bgm', 450); break;
				case 4: playAudio('./Music/rw', 'bgm', 450); break;

				case 5: playAudio('./Music/cstp', 'bgm', 450); break;
				case 6: playAudio('./Music/ffc', 'bgm', 450); break;
				case 7: playAudio('./Music/cio', 'bgm', 450); break;
				case 8: playAudio('./Music/beatp', 'bgm', 450); break;
				case 9: playAudio('./Music/tt', 'bgm', 450); break;

				case 10: playAudio('./Music/fs', 'bgm', 450); break;
				default: break;
			}
		}
	}

	setTimeout(musicSpawnController, rngRange(270000,430000));							// 300k = five minutes
}
































function initializeVolumeDisplays() {
	bgmDisplay.innerHTML = cow.bgmVolume;
	sfxDisplay.innerHTML = cow.sfxVolume;
}




// NOTES ON VOLUME
// sfxGroup.volume doesn't work because of the removeSound() thing on line 91
// SFX works if you instead modify each individual snd volume before it gets added to the group
// BGM modifies the group instead, so that you can change volume during a song

function increaseVolume(bus) {
	let q;
	let r;

	switch (bus) {
		case 'bgm': q=bgmGroup; r=cow.bgmVolume; break;
		case 'sfx': q=sfxGroup; r=cow.sfxVolume; break;
		default: break;
	}

	if (r < 99) {
		switch (bus) {
			case 'bgm': cow.bgmVolume += 10; bgmDisplay.innerHTML = cow.bgmVolume; r=cow.bgmVolume; hoverRNGColor(increaseBGMvolumeButton); break;
			case 'sfx': cow.sfxVolume += 10; sfxDisplay.innerHTML = cow.sfxVolume; r=cow.sfxVolume; hoverRNGColor(increaseSFXvolumeButton); break;
			default: break;
		}

		q.volume += 0.1;						// Set volume to target
		if (r >= 100) { q.volume = 1; }
		saveGame();
	}
}




function decreaseVolume(bus) {
	let q;
	let r;

	switch (bus) {
		case 'bgm': q=bgmGroup; r=cow.bgmVolume; break;
		case 'sfx': q=sfxGroup; r=cow.sfxVolume; break;
		default: break;
	}

	if (r > 1) {
		switch (bus) {
			case 'bgm': cow.bgmVolume -= 10; bgmDisplay.innerHTML = cow.bgmVolume; r=cow.bgmVolume; hoverRNGColor(decreaseBGMvolumeButton); break;
			case 'sfx': cow.sfxVolume -= 10; sfxDisplay.innerHTML = cow.sfxVolume; r=cow.sfxVolume; hoverRNGColor(decreaseSFXvolumeButton); break;
			default: break;
		}

		q.volume -= 0.1;						// Set volume to target
		if (r <= 0) { q.volume = 0; }
		saveGame();
	}
}








function browserAudioCheck() {
	// Check for IE
	if (navigator.appName == 'Microsoft Internet Explorer' || !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv:11/))) {
		alert("Developer's note: This game doesn't support audio on Internet Explorer. Please consider using a more modern web browser like Firefox or Chrome.");
		cow.muteAudioForIE = true;
	} else { cow.muteAudioForIE = false; }							// Extra security for Windows Chrome

	// Check for Safari
	if (navigator.userAgent.indexOf('Safari') > -1 && navigator.vendor.indexOf('Apple') > -1) { cow.audioFormat = '.caf'; }
	else { cow.audioFormat = '.opus'; }

	// Prevent Automuted audio
	// For now this is only needed in Safari, but it might future proof other browsers too
	// So all browsers will do this
	document.addEventListener('click', preventAutomutedAudio);
}


function preventAutomutedAudio() {
	const myAudio = new Audio('./SFX/diamond' + rngRange(1,5) + cow.audioFormat);
	myAudio.play();
	document.removeEventListener('click', preventAutomutedAudio);
}