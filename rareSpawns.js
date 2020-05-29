function rareSpawnTester() {
	let q = 0;
	for (i=0; i<180; i++) {	if (rngRange(1,200) == 7) { q++; } }
	debug.innerHTML = q;
	setTimeout(rareSpawnTester, 1500);
	// Hits per 3 minutes, rngRange 1/X. Goals are 1, 2, 9
	// 255: 2 0 1 0	1 0 4 2 0 2 1 0 0 1 2			= 1
	// 128: 1 3 2 1 2 1 4 3 1 0 2 2 1 1 0			= 1.69
	// 25:  9 4 3 2 6 X 8 9 7 9 4 7 8 7 9			= 6.8
	// 25:  6 5 8 6 8 5 X 7 6 4 8 4 7 6 9 			= 6.6
	// 20:  9 12 11 5 15 14 6 9 10 7 13 7 11 13 7 	= 9.9
}




function rareSpawnController() {
	if (cow.diamondBarOwned == false) { var q = 2048; }							// Extra low spawn rate during Phase 1
		else { var q = 200; }													// OK spawn rate during the start of phase 2
	if (cow.stardustSpawnBoost1Owned == true) { q = 100; }
	if (cow.stardustSpawnBoost2Owned == true) { q = 20; }
	if (rngRange(1, q) == 7 && !document.hidden){								// If RNG hits the magic number, and if the window isn't backgrounded
		var r = rngRange(1,12);
















		switch (r) {															// Generate the rare spawn
			case 1:
				// Perfect square diamond. Rotating.
				function spawnQuadQuad() {
					let quadQuad = new PIXI.Graphics();										// create the parent shape
					foregroundContainer.addChild(quadQuad);									// add shape to the PIXI stage

					let square1 = new PIXI.Graphics();										// create a child square
					square1.beginFill(randomColor({hue:'hax'}));
					square1.moveTo(-53, -53);
					square1.lineTo(-8, -53);
					square1.lineTo(-8, -8);
					square1.lineTo(-53, -8);
					square1.endFill();
					quadQuad.addChild(square1);

					let square2 = new PIXI.Graphics();										// create a child square
					square2.beginFill(randomColor({hue:'hax'}));
					square2.moveTo(7, -53);
					square2.lineTo(53, -53);
					square2.lineTo(53, -8);
					square2.lineTo(7, -8);
					square2.endFill();
					quadQuad.addChild(square2);

					let square3 = new PIXI.Graphics();										// create a child square
					square3.beginFill(randomColor({hue:'hax'}));
					square3.moveTo(-53, 7);
					square3.lineTo(-8, 7);
					square3.lineTo(-8, 53);
					square3.lineTo(-53, 53);
					square3.endFill();
					quadQuad.addChild(square3);

					let square4 = new PIXI.Graphics();										// create a child square
					square4.beginFill(randomColor({hue:'hax'}));
					square4.moveTo(7, 7);
					square4.lineTo(53, 7);
					square4.lineTo(53, 53);
					square4.lineTo(7, 53);
					square4.endFill();
					quadQuad.addChild(square4);

					quadQuad.x = rngRange(1,900);											// Set fixed X position
					quadQuad.y = 690;
					quadQuad.rotation = (rngRange(0,310)/100);								// Random starting rotation
					let rotateSpeed;
					if (rngRange(1,2) == 1) { rotateSpeed = 0.01 }							// Random rotation direction
					else { rotateSpeed = -0.01 }

					let sfxPlayed = false;

					function move() {
						quadQuad.y -= 0.4;													// Standard vertical movement
						quadQuad.rotation += rotateSpeed;

						if (cow.boostMultiplier > 0) {										// click boost
							quadQuad.y -= cow.boostMultiplier * 0.8;
						}

						if (quadQuad.y <= 648 && sfxPlayed == false) {						// Play SFX, early to compensate for rotation and the central anchor point
							playAudio('./SFXb/quadQuad' + rngRange(1,3), 'sfx', quadQuad.x);
							sfxPlayed = true;
						}

						if (quadQuad.y < -90) { 											// if shape is offscreen..
							quadQuad.destroy(true); 										// kill it
							cow.kongLifetimeShapes+=5;
							if (rngRange(1,2) == 1) { cow.resourceDiamonds+=5; updateResourceCounter('diamond'); }			// Random shape rewards
							else { cow.resourceSquares+=5; updateResourceCounter('square'); }
						} else { window.requestAnimationFrame(move); }						// otherwise, animate another frame and check again
					}																		//

					window.requestAnimationFrame(move);										// starts the animation moving
				}
				spawnQuadQuad();
				break;
















			case 2:
				// Swarm of Tyrian paths. Ships in a sine line formation
				function spawnDiamondShip(spawnX, direction) {
					let diam = new PIXI.Graphics();										// create a shape in the PIXI engine
					diam.beginFill(randomColor({hue:'hax'}));

					diam.moveTo(0, 0);													// places the shape at the origin for easy drawing math
					diam.lineTo(rngRange(10,30), rngRange(20,40));
					diam.lineTo(rngRange(-8,8), rngRange (80,100));
					diam.lineTo(rngRange(-30,-10), rngRange (20,40));
					diam.endFill();														// ends vertice drawing
					foregroundContainer.addChild(diam);									// add shape to the PIXI stage

					diam.x = spawnX;													// Set fixed X position
					diam.y = 650;
					diam.scale.set(0.5);
					diam.rotation = 3.14;												// Rotate 180 degrees to point up

					let counter;
					if (direction == 1) { counter = 0; }								// Starts the sinewave movement going left or right
					if (direction == 2) { counter = -3.14; }

					sfxPlayed = false;

					function move() {
						diam.y -= 3.0;													// vertical movement
						diam.x += (Math.sin(counter))*3;								// X sinewave movement
						counter += 0.03;

						if (cow.boostMultiplier > 0) {									// click boost
							diam.y -= cow.boostMultiplier * 2;
						}

						if (diam.y <= 645 && sfxPlayed == false) {						// Play SFX, plus 50 to account for rotation and scale
							playAudio('./SFX/diamond' + rngRange(1,5), 'sfx', diam.x);
							sfxPlayed = true;
						}

						if (diam.y < -40) { 											// if shape is offscreen..
							diam.destroy(true); 										// kill it
							cow.resourceDiamonds++;
							cow.kongLifetimeShapes++;
							updateResourceCounter('diamond');
						} else { window.requestAnimationFrame(move); }					// otherwise, animate another frame and check again
					}																	//

					window.requestAnimationFrame(move);									// starts the animation moving
				}

				const xSpawn = rngRange(50,850);										// Randomize the fixed x spawn position
				const direction = rngRange(1, 2);										// Randomize the sinewave direction
				const numberOfShips = rngRange(7, 20);									// Randomize the number of ships
				for (let i=0; i<numberOfShips; i++){									// Spawn ships
					setTimeout(spawnDiamondShip, 500*i, xSpawn, direction);
				}
				break;
















			case 3:
				// Constellations
				function spawnFixedStar(x, y) {
					let star = new PIXI.Graphics();										// create a shape in the PIXI engine
					star.beginFill(randomColor({hue:'monochrome'}));					// set a fill and line style, then code in the points

					star.moveTo(100,20);												// vertices
					star.lineTo(78,78);
					star.lineTo(20,78);
					star.lineTo(64,115);
					star.lineTo(40,180);
					star.lineTo(100,143);
					star.lineTo(160,180);
					star.lineTo(137,115);
					star.lineTo(180,78);
					star.lineTo(123,78);

					star.endFill();
					skyObjectContainer.addChild(star);									// add to the PIXI stage. The 1 keeps all the stars in the BG

					star.scale.set(0.05);												// make the star tiny

					star.x = x;															// moves shape to a preset location
					star.y = y;
					star.alpha = 0;														// makes sure stars don't blink once before appearing

					var q = -.001;														// variable for calculating the brightness using a sinwave
                	const lifespan = 2;

					function pulseBrightness() {
						star.alpha = (Math.sin(q));										// calculate alpha with a sinewave
						q += 1/lifespan/19;												// increment. lifespan is tuned to be in minutes

						if (cow.boostMultiplier > 0) {									// click boost
							q += 1/lifespan/6.6;										// Same calculations as normal, but faster. Click = 6% progress
						}

						if (q > 3.2) {													// if star has faded out.. (3.14 is one sinwave cycle)
							star.destroy(true);											// kill it
							cow.resourceStars++;										//
							cow.kongLifetimeShapes++;
							updateResourceCounter('star');								//
						} else { setTimeout(function() { window.requestAnimationFrame(pulseBrightness); }, 1000) } // Throttled to 1FPS
					}

					window.requestAnimationFrame(pulseBrightness);						// starts the animation moving
				}

				let constellation = rngRange(1,4);										// select constellation
				var q = rngRange(-50, 850);												// randomize location
				var r = rngRange(0, 300);

				function sfxDelayedConstellation(pan) {
					setTimeout(function() { playAudio('./SFXb/constellation' + rngRange(1,3), 'sfx', pan) }, 6000)
				}

				sfxDelayedConstellation(q);

					switch (constellation) {
					// Crux 50000CE
					case 1:
						spawnFixedStar(35+q, 19+r);
						spawnFixedStar(119+q, 9+r);
						spawnFixedStar(54+q, 34+r);
						spawnFixedStar(73+q, 97+r);
					break;

					// Cassiopeia 50000CE
					case 2:
						spawnFixedStar(20+q, 20+r);
						spawnFixedStar(34+q, 68+r);
						spawnFixedStar(113+q, 17+r);
						spawnFixedStar(163+q, 55+r);
						spawnFixedStar(141+q, 67+r);
					break;

					// Lyra 50000CE
					case 3:
						spawnFixedStar(15+q, 15+r);
						spawnFixedStar(100+q, 28+r);
						spawnFixedStar(105+q, 57+r);
						spawnFixedStar(162+q, 100+r);
						spawnFixedStar(164+q, 68+r);
					break;

					// Big Dipper 50000CE
					case 4:
						spawnFixedStar(7+q, 34+r);
						spawnFixedStar(46+q, 6+r);
						spawnFixedStar(78+q, 27+r);
						spawnFixedStar(117+q, 47+r);
						spawnFixedStar(124+q, 84+r);
						spawnFixedStar(190+q, 91+r);
						spawnFixedStar(225+q, 63+r);
					break;

					default: break;
				}
				break;
















			case 4:
				// Shooting star
				function spawnShootingStar() {
					let star = new PIXI.Graphics();										// create a shape in the PIXI engine
					star.beginFill(randomColor({hue:'monochrome'}));					// set a fill and line style, then code in the points

					star.moveTo(100,20);												// vertices
					star.lineTo(78,78);
					star.lineTo(20,78);
					star.lineTo(64,115);
					star.lineTo(40,180);
					star.lineTo(100,143);
					star.lineTo(160,180);
					star.lineTo(137,115);
					star.lineTo(180,78);
					star.lineTo(123,78);

					star.endFill();
					skyObjectContainer.addChild(star);									// add to the PIXI stage. The 1 keeps all the stars in the BG

					star.scale.set(0.05);												// make the star tiny

					star.x = rngRange(100, 800);										// moves shape to a preset location
					star.y = rngRange(-50, 250);
					star.alpha = 0;														// makes sure stars don't blink once before appearing

					var q = -.001;														// variable for calculating the brightness using a sinwave
					let xMovement;
					if (rngRange(1,2) == 1) { xMovement = 4 }							// Random xMovement direction
					else { xMovement = -4 }

					playAudio('./SFXb/fallingStar' + rngRange(1,3), 'sfx', star.x);

					function move() {
						star.alpha = (Math.sin(q));										// calculate alpha with a sinewave
						star.x += xMovement;
						star.y += 2;
						q += 0.05;														// increment. lifespan is tuned to be in minutes

						if (q > 3.2) {													// if star has faded out.. (3.14 is one sinwave cycle)
							star.destroy(true);											// kill it
							cow.resourceStars++;										//
							cow.kongLifetimeShapes++;
							updateResourceCounter('star');								//
						 } else { window.requestAnimationFrame(move); }					// otherwise, animate another frame and check again
					}

					window.requestAnimationFrame(move);									// starts the animation moving
				}
				spawnShootingStar();
				break;
















			case 5:
				// Flattish hex UFOs. Horizontal movement
				// Children of the Stars
				function spawnUFO() {
					let ufo = new PIXI.Graphics();										// create a shape in the PIXI engine
					ufo.beginFill(randomColor({hue:'monochrome'}));						// set a fill and line style, then code in the points
					ufo.moveTo(0, 0);													// places the shape at the origin for easy drawing math
					ufo.lineTo(10,0);													// Draw the vertices
					ufo.lineTo(15,5);
					ufo.lineTo(10,10);
					ufo.lineTo(0,10);
					ufo.lineTo(-5,5);
					ufo.endFill();														// ends vertice drawing
					skyObjectContainer.addChild(ufo);									// add shape to the PIXI stage

					ufo.scale.set(2);
					ufo.x = 920;														// Place the UFO offscreen
					ufo.y = rngRange(30, 400);											// random starting height
					const speedX = rngRange(2,8)/10;

					let sfxPlayed = false;


					function move() {													//
						ufo.x -= speedX;												// move left

						if (cow.boostMultiplier > 0) {									// click boost
							ufo.x -= cow.boostMultiplier * speedX * 2;
						}

						if (ufo.x <= 900 && sfxPlayed == false) {						// Play SFX, 5px early because the left isn't the origin
							playAudio('./SFXb/ufo' + rngRange(1,3), 'sfx', ufo.x);
							sfxPlayed = true;
						}

						if (ufo.x < -30) { 												// if shape is offscreen..
							ufo.destroy(true); 											// kill it
							cow.resourceHexagons++;
							cow.kongLifetimeShapes++;
							updateResourceCounter('hexagon');
						} else { window.requestAnimationFrame(move); }					// otherwise, animate another frame and check again
					}																	//

					window.requestAnimationFrame(move);									// starts the animation moving
				}

				const numberOfUFOs = rngRange(1, 3);									// Randomize the number of UFOs
				for (let i=0; i<numberOfUFOs; i++){										// Spawn UFOs
					setTimeout(spawnUFO, i*4000);										//
				}
				break;
















			case 6:
				// Hexes jump from point to point
				function spawnHexagonScanner() {
					let hex = new PIXI.Graphics();										// create a shape in the PIXI engine
					hex.beginFill(randomColor({hue:'pink'}));							// set a fill and line style, then code in the points
					hex.moveTo(0, 0);													// places the shape at the origin for easy drawing math

					hex.lineTo(10,0);
					hex.lineTo(15,9);
					hex.lineTo(10,18);
					hex.lineTo(0,18);
					hex.lineTo(-5,9);

					hex.endFill();														// ends vertice drawing that was in the switch
					hex.alpha = 0.3;
					hex.scale.set(8);
					foregroundContainer.addChild(hex);									// add shape to the PIXI stage

					hex.x = rngRange(100,800);											// Set fixed X position
					hex.y = 750;

					let counter = 0;

					let sfxPlayed = false;

					function jumpShapeX() {
						const xMovement = rngRange(-300,300);							// Same as jumpShapeY, but with extra shit to account for left/right movement
						let xCounter = 0;
						function move() {
							if (xMovement > 0)  { hex.x+=3; }
							if (xMovement <= 0) { hex.x-=3; }
							xCounter+=3;
							if (xMovement > 0 && xCounter < xMovement && hex.y > -149) { window.requestAnimationFrame(move); }
							if (xMovement <= 0 && xCounter < -xMovement && hex.y > -149) { window.requestAnimationFrame(move); }
						}
						window.requestAnimationFrame(move);								// starts the animation moving
					}

					function jumpShapeY() {
						const yMovement = rngRange(100,250);							// Define movement range for this jump
						let yCounter = 0;												// set up variable to track movement
						function move() {
							hex.y-=3;													// move
							yCounter+=3;												// increment counter
							if (yCounter < yMovement && hex.y > -149) { window.requestAnimationFrame(move); } // If movement isn't done yet and the hex isn't offscreen, keep going
							else if (hex.y <= -149) {									// This is here for quick updating of the resource counter
								cow.resourceHexagons++;
								cow.kongLifetimeShapes++;
								updateResourceCounter('hexagon');
							}
						}
						window.requestAnimationFrame(move);								// starts the animation moving
					}

					function timer() {
						counter += 1;													// Increment timer
						if ((counter % 2 === 0 || counter == 1) && hex.y > -149) { 		// Every few seconds (or once it spawns), move the hexagon
							jumpShapeX();
							jumpShapeY();
						}

						if (hex.y <= 595 && sfxPlayed == false) {						// Play SFX
							playAudio('./SFXb/hexScanner' + rngRange(1,3), 'sfx', hex.x);
							sfxPlayed = true;
						}

						if (hex.y <= -149) {											// if shape is offscreen..
							hex.destroy(true); 											// kill it
						} else { setTimeout(function() { window.requestAnimationFrame(timer); }, 1000) } // otherwise, animate another frame and check again
					}																	// Throttled to 1FPS	

					window.requestAnimationFrame(timer);								// starts the animation moving
				}

				const numberOfHexes = rngRange(2,5);
				for (let i=0; i<numberOfHexes; i++){									// Spawn scanners
					setTimeout(spawnHexagonScanner, 500*i);
				}
				break;
















			case 7:
				// Creepy small triangles with moving vertices
				function spawnCreepyTriangle(color) {
					let tri = new PIXI.Graphics();										// create a shape in the PIXI engine

					let boostSpeed;
					if (color == 'black') {
						tri.beginFill(0x000000);										// set a fill color. Solid black, or..
						boostSpeed = -6; 												// Positive or negative boost speed
					}
					else {
						tri.beginFill(randomColor({hue:color})); 						// random red/green
						boostSpeed = 2;
					}

					tri.moveTo(0, 0);													// places the shape at the origin for easy drawing math
					tri.lineTo(rngRange(15,25), rngRange(25,35));						// create randomized vertices
					tri.lineTo(rngRange(-25,-15), rngRange(25,35));						//
					tri.endFill();														// ends vertice drawing
					foregroundContainer.addChild(tri);									// add shape to the PIXI stage

					tri.x = rngRange(0, 900);
					tri.y = rngRange(671, 1800);
					const speedY = rngRange(4,20)/10;									// randomized Y speed
					tri.rotation = rngRange(1, 314)/100;								// randomized rotation

					let counter = rngRange(0, 100);										// randomize the initial state

					let sfxPlayed = false;

					function move() {
						tri.y -= speedY;												// Standard vertical movement
						tri.scale.set((Math.sin(counter/2))*2);							// Weird scaling animation
						counter += 0.05;

						if (cow.boostMultiplier > 0) {									// click boost
							tri.y -= cow.boostMultiplier * speedY * boostSpeed;
						}

						if (tri.y <= 612 && sfxPlayed == false) {						// Play SFX, 50% early to compensate for an average rotation of 90 degrees
							if (color == 'black') { playAudio('./SFXb/blackCircle' + rngRange(1,3), 'sfx', tri.x, true); }		// Black circle SFX used here
							else { playAudio('./SFXb/triCreepy' + rngRange(1,3), 'sfx', tri.x, true); }		// Using noFilter here because highPass kills this sfx too often
							sfxPlayed = true;
						}

						if (tri.y < -70) { 												// if shape is offscreen..
							tri.destroy(true); 											// kill it
							cow.resourceTriangles++;
							cow.kongLifetimeShapes++;
							updateResourceCounter('triangle');
						} else { window.requestAnimationFrame(move); }					// otherwise, animate another frame and check again
					}																	//

					window.requestAnimationFrame(move);									// starts the animation moving
				}

				let color = rngRange(1,10);												// randomize color
				if (color <= 4) { color = 'red'; } else
				if (color <= 9) { color = 'green'; } else
				if (color == 10) { color = 'black'; }									// rare chance of spooky pure black

				const numberOfTris = rngRange(5,10);									// randomize number of tri's
				for (let i=0; i<numberOfTris; i++) { spawnCreepyTriangle(color); }		// spawn tri's
				break;
















			case 8:
				// Concentric triangles launch
				function spawnNestedTriangle(spawnX, scale) {
					let tri = new PIXI.Graphics();										// create a shape in the PIXI engine
					tri.beginFill(randomColor({hue:'hax'}));

					tri.moveTo(0, 0);													// places the shape at the origin for easy drawing math
					tri.lineTo(8, 15);													// create vertices
					tri.lineTo(-8, 15);
					tri.endFill();														// ends vertice drawing
					foregroundContainer.addChild(tri);									// add shape to the PIXI stage

					tri.x = spawnX;														// Set fixed X position
					tri.y = 601 + (scale*15);
					tri.scale.set(scale);

					function move() {
						tri.y -= 2/scale;												// vertical movement, based on size

						if (cow.boostMultiplier > 0) {									// click boost
							tri.y -= cow.boostMultiplier * 2/scale * 2;
						}

						if (tri.y < scale*-16) {										// if shape is offscreen..
							tri.destroy(true); 											// kill it
							cow.resourceTriangles++;
							cow.kongLifetimeShapes++;
							updateResourceCounter('triangle');
						} else { window.requestAnimationFrame(move); }					// otherwise, animate another frame and check again
					}																	//

					window.requestAnimationFrame(move);									// starts the animation moving
				}

				function sfxDelayedTritower(pan) {
					setTimeout(function() { playAudio('./SFXb/triTower' + rngRange(1,3), 'sfx', pan) }, 1000)
				}

				const xSpawn2 = rngRange(50, 850);										// Randomize the fixed x spawn position
				const numberOfTris2 = rngRange(8, 15);									// Randomize the number of tris
				sfxDelayedTritower(xSpawn2);

				for (let i=1; i<numberOfTris2; i++){									// Spawn tris. Use i=1 instead of 0 because of scale also being used for y speed
					spawnNestedTriangle(xSpawn2, i);
				}
				break;
















			case 9:
				// A few of everything. Small, perfect shapes. Glitter
				function spawnGlitterShape(selectShape) {
					let shape = new PIXI.Graphics();									// create a shape in the PIXI engine

					shape.beginFill(randomColor({hue:'hax'}));							// random color
					shape.moveTo(0, 0);													// places the shape at the origin for easy drawing math

					switch (selectShape) {
						// Diamond
						case 1:
							shape.lineTo(8, 12);										// create vertices
							shape.lineTo(0, 24);
							shape.lineTo(-8, 12);
							break;

						// Star
						case 2:
							shape.moveTo(100,20);										// create vertices
							shape.lineTo(78,78);
							shape.lineTo(20,78);
							shape.lineTo(64,115);
							shape.lineTo(40,180);
							shape.lineTo(100,143);
							shape.lineTo(160,180);
							shape.lineTo(137,115);
							shape.lineTo(180,78);
							shape.lineTo(123,78);
							shape.scale.set(0.1);
							break;

						// Hexagon
						case 3:
							shape.lineTo(9,0);
							shape.lineTo(14,8);
							shape.lineTo(9,17);
							shape.lineTo(0,17);
							shape.lineTo(-5,8);
							break;

						// Triangle
						case 4:
							shape.lineTo(8, 15);										// create vertices
							shape.lineTo(-8, 15);
							break;

						// Circle
						case 5:
							shape.drawCircle(0, 0, 8);
							break;

						// Square
						case 6:
							shape.lineTo(15, 0);										// create vertices
							shape.lineTo(15, 15);
							shape.lineTo(0, 15);
							break;
						default: break;
				}
					shape.endFill();
					foregroundContainer.addChild(shape);								// add shape to the PIXI stage

					shape.x = rngRange(0, 900);											// random shape location
					shape.y = 630;

					const speedY = rngRange(18,22)/10;									// randomized Y speed

					let sfxPlayed = false;

					function move() {
						shape.y -= speedY;

						if (cow.boostMultiplier > 0) {									// click boost
							shape.y -= cow.boostMultiplier * speedY;
						}

						if (shape.y <= 595 && sfxPlayed == false) {
							switch (selectShape) {										// play sfx when the shape spawns. 100% squares break the audio engine lol
								case 1:	playAudio('./SFX/diamond' + rngRange(1,5), 'sfx', shape.x);	break;
								case 2:	playAudio('./SFX/star' + rngRange(1,5), 'sfx', shape.x);		break;
								case 3:	playAudio('./SFX/hexagon' + rngRange(1,5), 'sfx', shape.x);	break;
								case 4:	playAudio('./SFX/triangle' + rngRange(1,5), 'sfx', shape.x);	break;
								case 5:	playAudio('./SFX/circle' + rngRange(1,5), 'sfx', shape.x);		break;
								case 6:	playAudio('./SFX/square' + rngRange(1,5), 'sfx', shape.x); 	break;
								default: break;
							}
							sfxPlayed = true;
						}

						if (shape.y < -30) { 											// if shape is offscreen..
							shape.destroy(true); 										// kill it
							switch (selectShape) {
								case 1: cow.resourceDiamonds++; 	updateResourceCounter('diamond');	break;					// different rewards per shape
								case 2: cow.resourceStars++; 		updateResourceCounter('star');		break;
								case 3: cow.resourceHexagons++; 	updateResourceCounter('hexagon');	break;
								case 4: cow.resourceTriangles++;	updateResourceCounter('triangle');	break;
								case 5: cow.resourceCircles++; 		updateResourceCounter('circle');	break;
								case 6: cow.resourceSquares++; 		updateResourceCounter('square');	break;
								default: break;
							}
							cow.kongLifetimeShapes++;
						} else { window.requestAnimationFrame(move); }		// otherwise, animate another frame and check again
					}														//

					window.requestAnimationFrame(move);						// starts the animation moving
				}

				const numberOfGlitters = rngRange(40,80);								// randomize number of shapes
				for (let i=0; i<numberOfGlitters; i++){									// Spawn shapes
					const randomShape = rngRange(1, 6);									// Select Shape
					setTimeout(spawnGlitterShape, 500*i, randomShape);					// Fixed spawn interval
				}
				break;
















			case 10:
				// Negative overlay mask circles
				// Fake the effect by making them the grey window BG color or pure black
				// Rare - Giant fucking black circle. Full 30 second eclipse
				function spawnEvilCircle(radius, posX, speedY, spawnDelay) {
					let circ = new PIXI.Graphics();										// create a shape in the PIXI engine

					circ.beginFill(0x000000);											// set a fill color. Solid black, or..

					circ.moveTo(0, 0);													// places the shape at the origin for easy drawing math
					circ.drawCircle(0, 0, radius);
					circ.endFill();														// ends vertice drawing
					foregroundContainer.addChild(circ);									// add shape to the PIXI stage

					if (posX == 'random') { circ.x = rngRange(0, 900); }				// Random X spawn..
					else { circ.x = posX; }												// or fixed X spawn
					circ.y = radius + spawnDelay + 601;

					let sfxPlayed = false;

					function move() {
						circ.y -= speedY;												// Standard vertical movement

						if (cow.boostMultiplier > 0) {									// click boost
							circ.y -= cow.boostMultiplier * speedY * -3;
						}

						if (circ.y <= 625 && sfxPlayed == false) {						// Play SFX
							playAudio('./SFXb/blackCircle' + rngRange(1,3), 'sfx', circ.x, true);
							sfxPlayed = true;
						}

						if (circ.y < -radius) {											// if shape is offscreen..
							circ.destroy(true); 										// kill it
							cow.resourceCircles++;
							cow.kongLifetimeShapes++;
							updateResourceCounter('circle');
						} else { window.requestAnimationFrame(move); }					// otherwise, animate another frame and check again
					}																	//

					window.requestAnimationFrame(move);									// starts the animation moving
				}

				const select = rngRange(1,100);

				if (select <= 98) {
					const numberOfCircles = rngRange(10,20);							// randomize number of circles's
					for (let i=0; i<numberOfCircles; i++) { spawnEvilCircle(30, 'random', rngRange(4,20)/10, rngRange(671, 1800)); }	// spawn a swarm of circles
				} else
				if (select <= 100) {
					spawnEvilCircle(1200, 450, 0.4, 0); 			// spawn a big monster circle
					cow.kongStrayNightmareDiscovered = true;		// this is the rarest thing in the game
					playAudio('./Music/sn', 'bgm', 450);			// so congrats if you ever see it
					displayMusicText('Stray Nightmare', 12);
				}
				break;
















			case 11:
				// PAINT tetriminoes
				// Looks very badass with 100% opacity black fill
				// Crazy Diamond mix
				function spawnTrace() {
					const shape = rngRange(1, 8);
					let paint = new PIXI.Graphics();									// create a shape in the PIXI engine
					paint.beginFill(0x000000, 0);										// empty, transparant fill color

					switch (shape) {
						// 0.8x0.8 square
						case 1:
							paint.lineStyle(4, randomColor({luminosity:'light', hue:'blue'}), 0.5);
							paint.moveTo(-15, -15);
							paint.lineTo(15, -15);
							paint.lineTo(15, 15);
							paint.lineTo(-15, 15);
							paint.lineTo(-15, -15);
							break;

						// 2x2 square
						case 2:
							paint.lineStyle(4, randomColor({luminosity:'light', hue:'green'}), 0.5);			// line style
							paint.moveTo(-40, -40);
							paint.lineTo(40, -40);
							paint.lineTo(40, 40);
							paint.lineTo(-40, 40);
							paint.lineTo(-40, -40);
							break;

						// 3x3 square
						case 3:
							paint.lineStyle(4, randomColor({luminosity:'light', hue:'blue'}), 0.5);
							paint.moveTo(-60, -60);
							paint.lineTo(60, -60);
							paint.lineTo(60, 60);
							paint.lineTo(-60, 60);
							paint.lineTo(-60, -60);
							break;

						// 2x width circle
						case 4:
							paint.lineStyle(4, randomColor({luminosity:'light', hue:'red'}), 0.5);
							paint.moveTo(0, 0);
							paint.drawCircle(0, 0, 40);
							break;

						// 0.7x width triangle (ratio 6:7 x:y)
						case 5:
							paint.lineStyle(4, randomColor({luminosity:'light', hue:'green'}), 0.5);
							paint.moveTo(0, 18);
							paint.lineTo(21, -18);
							paint.lineTo(-21, -18);
							paint.lineTo(0, 18);
							break;

						// 1.3x width triangle
						case 6:
							paint.lineStyle(4, randomColor({luminosity:'light', hue:'red'}), 0.5);
							paint.moveTo(0, 30);
							paint.lineTo(35, -30);
							paint.lineTo(-35, -30);
							paint.lineTo(0, 30);
							break;

						// 1x4 bar
						case 7:
							paint.lineStyle(4, randomColor({luminosity:'light', hue:'red'}), 0.5);
							paint.moveTo(-20, -80);
							paint.lineTo(20, -80);
							paint.lineTo(20, 80);
							paint.lineTo(-20, 80);
							paint.lineTo(-20, -80);
							break;

						// S block, facing right
						case 8:
							paint.lineStyle(4, randomColor({luminosity:'light', hue:'green'}), 0.5);
							paint.moveTo(20, 40);
							paint.lineTo(20, 0);
							paint.lineTo(60, 0);
							paint.lineTo(60, -40);
							paint.lineTo(-20, -40);
							paint.lineTo(-20, 0);
							paint.lineTo(-60, 0);
							paint.lineTo(-60, 40);
							paint.lineTo(20, 40);
							break;

						default: break;
					}

					paint.endFill();													// ends vertice drawing
					skyObjectContainer.addChild(paint);									// add shape to the PIXI stage

					paint.x = rngRange(-500, 700);										// Randomly place the tetris offscreen
					paint.y = rngRange(690, 800);										// Random starting height
					paint.rotation = (rngRange(0,310)/100);								// Random starting rotation
					const speedX = rngRange(6, 10)/10;									// Random X speed
					const speedY = rngRange(6, 8)/10;									// Random Y speed
					let rotateSpeed = rngRange(-4,4)/100;								// Random rotation speed
					if (rotateSpeed == 0) { rotateSpeed = 0.01; }

					function move() {
						paint.x += speedX;												// move right
						paint.y -= speedY;												// move right
						paint.rotation += rotateSpeed;									// rotate

						if (cow.boostMultiplier > 0) {									// click boost
							paint.x += cow.boostMultiplier * speedX * 2;
							paint.y -= cow.boostMultiplier * speedY * 2;
						}

						if (paint.y < -90 || paint.x > 990) {	 						// if shape is offscreen..
							paint.destroy(true); 										// kill it
							switch (shape) {
								case 1: cow.resourceSquares++; updateResourceCounter('square');		break;					// different rewards per shape
								case 2: cow.resourceSquares++; updateResourceCounter('square');		break;
								case 3: cow.resourceSquares++; updateResourceCounter('square');		break;
								case 4: cow.resourceCircles++; updateResourceCounter('square');		break;
								case 5: cow.resourceTriangles++; updateResourceCounter('triangle');	break;
								case 6: cow.resourceTriangles++; updateResourceCounter('triangle');	break;
								case 7: cow.resourceSquares+=4; updateResourceCounter('square');	break;
								case 8: cow.resourceSquares+=4; updateResourceCounter('square');	break;
								default: break;
							}
							cow.kongLifetimeShapes++;
						} else { window.requestAnimationFrame(move); }					// otherwise, animate another frame and check again
					}																	//

					window.requestAnimationFrame(move);									// starts the animation moving
				}

				setTimeout(function() { playAudio('./SFXb/paint' + rngRange(1,3), 'sfx', 250) }, 8000)

				const numberOfTraces = rngRange(5, 15);									// Randomize the number of shapes
				for (let i=0; i<numberOfTraces; i++){									// Spawn shapes
					setTimeout(spawnTrace, i*4000);										//
				}
				break;
















			case 12:
				// Cute squares
				function spawnCuteSquare() {
					let square = new PIXI.Graphics();										// create a shape in the PIXI engine
					square.beginFill(randomColor({hue:'hax'}));								// set a fill and line style, then code in the points
					square.moveTo(0, 0);													// places the shape at the origin for easy drawing math

					square.lineTo(20, 0);
					square.lineTo(20, 20);
					square.lineTo(0, 20);

					square.endFill();														// ends vertice drawing that was in the switch
					foregroundContainer.addChild(square);									// add shape to the PIXI stage

					square.x = rngRange(1,900);												// Set fixed X position
					square.y = 640;

					let sfxPlayed = false;

					function move() {
						square.y -= 0.4;													// Standard vertical movement

						if (cow.boostMultiplier > 0) {										// click boost
							square.y -= cow.boostMultiplier * 0.8;
						}

						if (square.y <= 595 && sfxPlayed == false) {						// Play SFX
							playAudio('./SFXb/cuteSquare' + rngRange(1,3), 'sfx', square.x);
							sfxPlayed = true;
						}

						if (square.y < -70) { 												// if shape is offscreen..
							square.destroy(true); 											// kill it
							cow.resourceSquares++;
							cow.kongLifetimeShapes++;
							updateResourceCounter('square');
						} else { window.requestAnimationFrame(move); }						// otherwise, animate another frame and check again
					}																		//

					window.requestAnimationFrame(move);										// starts the animation moving
				}
				spawnCuteSquare();
				break;
			default: break;
		}




































		if (cow.endgameBarOwned == true) {									// If Phase 3 is active..
			switch (q) {													// Collect endgame shapes
				case 1: cow.resourceEndgameBarDiamonds	+=36; 	break;
				case 2: cow.resourceEndgameBarDiamonds	+=36; 	break;
				case 3: cow.resourceEndgameBarStars		+=72; 	break;
				case 4: cow.resourceEndgameBarStars		+=72; 	break;
				case 5: cow.resourceEndgameBarHexagons	+=90; 	break;
				case 6: cow.resourceEndgameBarHexagons	+=90; 	break;
				case 7: cow.resourceEndgameBarTriangles +=200; 	break;
				case 8: cow.resourceEndgameBarTriangles	+=200; 	break;
				case 9: cow.resourceEndgameBarCircles	+=108;	break;
				case 10: cow.resourceEndgameBarCircles	+=108;	break;
				case 11: cow.resourceEndgameBarSquares	+=350; 	break;
				case 12: cow.resourceEndgameBarSquares	+=350; 	break;
				default: break;
			}
		} else if (cow.diamondBarOwned == true) {							// If Phase 2 is active..
			switch (cow.currentBiome) {										// Collect biome specefic stardust
				case 'biome1': cow.resourceStardustBiome1++; break;
				case 'biome2': cow.resourceStardustBiome2++; break;
				case 'biome3': cow.resourceStardustBiome3++; break;
				case 'biome4': cow.resourceStardustBiome4++; break;
				case 'biome5': cow.resourceStardustBiome5++; break;
				case 'biome6': cow.resourceStardustBiome6++; break;
				default: break;
			}
		}
		cow.resourceStardust +=1;
		updateResourceCounter('stardust');
	}
	setTimeout(rareSpawnController, 1000);
}