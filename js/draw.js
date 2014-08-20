/**
 * A simple timer
 */

var Timer = function() {
	this.date = new Date();
}

Timer.prototype.update = function() {
	var d = new Date();
	this.date = d;
}

Timer.prototype.getMilliseconds = function() {
	return this.date.getTime();
}

Timer.prototype.getSeconds = function() {
	return Math.round(this.date.getTime() / 1000);
}


function handleKeyUp(e) {
			    	switch (e.keyCode) {
			    		case Keys.C:
			    			if (currentHero === (spritesheet.length - 1)) {
			    				currentHero = 0;
			    			} else {
			    				currentHero++;
			    			}

			    			hero.setSpritesheet(spritesheet[currentHero]);
			    			break;
			    		case Keys.LEFT:
			    		case Keys.RIGHT:
			    		case Keys.UP:
			    		case Keys.DOWN:
		                    Keys.getDown = removeFromArray(e.keyCode, Keys.getDown);
		                    break;
			    	}
			    }

			    function inArray(element, arr) {
				    for (var i = 0; i < arr.length; i++) {
				        if (arr[i] === element) {
				            return true;
				        }
				    }
				    return false;
				}

				function removeFromArray(element, arr) {
				    for (var i = 0; i < arr.length; i++) {
				        if (arr[i] == element)
				            arr.splice(i, 1);
				    }

				    return arr;
				}

				function calculateSpriteOffset(x, y) {
					if (x === 0 && y === 0) { // standing still
						hero.setOffset(0, 128);
						hero.setFrames(1);
						hero.setDuration(0);
					} else if (x > 0 && y === 0) { // East
						if (hero.offsetY !== 192) {
							hero.setOffset(0, 192);
							hero.setFrames(6);
							hero.setDuration(500);
						}
					} else if (x < 0 && y === 0) { // West
						if (hero.offsetY !== 224) {
							hero.setOffset(0, 224);
							hero.setFrames(6);
							hero.setDuration(500);
						}
					} else if (x === 0 && y > 0) { // South
						if (hero.offsetY !== 128 || hero.frames !== 4) {
							hero.setOffset(0, 128);
							hero.setFrames(4);
							hero.setDuration(500);
						}
					} else if (x === 0 && y < 0) { // North
						if (hero.offsetY !== 160) {
							hero.setOffset(0, 160);
							hero.setFrames(4);
							hero.setDuration(500);
						}
					} else if (x > 0 && y < 0) { // North East
						if (hero.offsetY !== 0) {
							hero.setOffset(0, 0);
							hero.setFrames(4);
							hero.setDuration(500);
						}
					} else if (x > 0 && y > 0) { // South East
						if (hero.offsetY !== 32) {
							hero.setOffset(0, 32);
							hero.setFrames(4);
							hero.setDuration(500);
						}
					} else if (x < 0 && y < 0) { // North West
						if (hero.offsetY !== 64) {
							hero.setOffset(0, 64);
							hero.setFrames(4);
							hero.setDuration(500);
						}
					} else if (x < 0 && y > 0) { // South West
						if (hero.offsetY !== 96) {
							hero.setOffset(0, 96);
							hero.setFrames(4);
							hero.setDuration(500);
						}
					}
				}

				function draw (timeStamp) {
					timer.update();

					c.fillStyle = '#FFFFFF';
					c.fillRect (0, 0, canvas.width, canvas.height);

					c.fillStyle = '#000000';
					c.font = '12px Arial, Sans-serif';
					c.fillText ("Use the UP, DOWN, LEFT and RIGHT keys to move", 10, 20);


					// Calculate X speed
					if (inArray(Keys.RIGHT, Keys.getDown)) {
				    	Speed.x = Speed.MAX;
				    } else if (inArray(Keys.LEFT, Keys.getDown)) {
				    	Speed.x = Speed.MAX * -1;
				    } else {
				        // No right / left keys are being pressed
				    	Speed.x = 0
				    }

				    // Calculate Y speed
				    if (inArray(Keys.DOWN, Keys.getDown)) {
				    	Speed.y = Speed.MAX;
				    } else if (inArray(Keys.UP, Keys.getDown)) {
				    	Speed.y = Speed.MAX * -1;
				    } else {
				        // No up / down keys are being pressed
				        Speed.y = 0
				    }

				    // Change the X/Y offset of the spritesheet and the "speed" of the animation depending on X/Y speed
				    calculateSpriteOffset(Speed.x, Speed.y);

				    // Make sure to restraint the character to move inside the canvas
				    if ((Position.x + Speed.x) > 0 && (Position.x + Speed.x) < (canvas.width - hero.width)) {
				    	Position.x += Speed.x;
					}

					if ((Position.y + Speed.y) > 0 && (Position.y + Speed.y) < (canvas.height - hero.height)) {
				    	Position.y += Speed.y;
					}

					hero.setPosition(Position.x, Position.y);
					hero.animate(c, timer);
					hero.draw(c);

					setTimeout(function() {
						draw(timer.getSeconds());
					}, 5);
				}
