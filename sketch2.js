
let canvasX = 1200; 
let canvasY = 1200;

let boxLimWidth = 800; 
let boxLimHeight = 800;

function setup() {
  createCanvas(1500, 1080);
  frameRate(30);
 
}



function drawFunkyRects()
{
	var randX = random(canvasX - 100, canvasX); 
	var randY = random(canvasY - 100, canvasY); 
	
	for (let i = 0; i < discoRects; i++) {
		
		if (frameCount % 6 == 0)
		{
			let c = color(random(100, 255), random(150, 255), random(0, 150)); // Define color 'c'
			fill(c); // Use color variable 'c' as fill color
			strokeWeight(15); // Don't draw a stroke around shapes
			rect(random(0, i * 66), randY - (i * 35), random(boxLimWidth), random(boxLimHeight));
			rect(random(0, i * 66), randX - (i * 35), random(boxLimWidth/3), random(boxLimHeight/3));
		}
		
   
	}
	
}


function draw() {
 
  background(220);
 
  drawFunkyRects(); 
}

// function doDead()
// {
	// deadSprite.resize(1400, 900); 
	// image(deadSprite, 50, 100); 
	
	
// }

// function doTitle()
// {
	// titleSprite.resize(1400, 900); 
	// image(titleSprite, 50, 100); 
// }


// function doPause()
// {
	// pauseSprite.resize(1400, 900); 
	// image(pauseSprite, 50, 100); 
	
// }


// function doAvalanche()
// {
	
  // TheAvalance.display(); 
  // TheAvalance.update();  	
// }


// function doDJ()
// {
	
	 // DJ_sprite.resize(1500, 600);
	// image(DJ_sprite, 0, 0); 
	
// }

// function doPlebFartInfluence()
// {
	
	// //for each active fart see if it is damaging a pleb
	
	// for (var i = 0; i < fartArray.length; i++)
	// {
		
		
		// if (fartArray[i].isConsumed === false)
		// {
			// for (var j = 0; j < plebArray.length; j++)
			// {
				// if (plebArray[j].isDead === false )
				// {
					
					// if (doDistance(fartArray[i], plebArray[j]))
					// {
						// plebArray[j].stamina -= 7; 
						
					// }
					
				// }
				
			// }	
				
			
		// }
		
		
		
		
		
	// }
	
	
// }

// function doDistance(obj1, obj2)
// {
	// var distX = abs(obj1.x - obj2.x); 
	// var distY = abs(obj1.y - obj2.y); 
	
	// if ((distX ** 2) + (distY ** 2) < 12000) 
	// {
	
		// return true; 
	// }
	// else return false; 
	
	
	
// }



// function doUI()
// {
	
	// var beerString = "BEERS DRANK: " + beerCounter;
	// var farts = "FARTS: " + fartsRemaining; 

	// textSize(50); 
	
	// text(beerString, canvasX /4 , 50 ); 
	// text(farts, canvasX / 4 * 3, 50); 
	
	
	// var plebCount = "RAVER RUINATION COUNT: " + ruinCounter; 
	// push(); 
	// textSize(60); 
	// var c = color (5, 5, 5); 
	// fill(c); 
	// text(plebCount, canvasX/2 - 250, canvasY - 250); 
	// pop(); 
	
	
// }


// function doPlebs()
// {
	
	// if ((frameCount % 100) === 0)
	// {
		// if (random(0, 10) > 6) plebArray.push(new Plebble(random(0, canvasX), random(0, canvasY), 1)); 
		
	// }
	
	
	// for (var i = 0; i < plebArray.length; i++)
	// {
		// if (plebArray[i].isDead == false) 
		// {
			// plebArray[i].update(TheAvalance.x, TheAvalance.y);
			// plebArray[i].display(); 
		// }
	// }
	
	
	
// }


// function doDanceFloor()
// {
	
	
	// for (var j = 0 ; j < 9; j++)
	// {
		
		
		// for (var i = 0; i < 30; i++)
		// {
			// var c1 = color(random(100, 255), random(150, 255), random(0, 150));
			// var c2 = color(random(100, 255), random(150, 255), random(0, 150));
			
			// rectMode(RADIUS); // Set rectMode to RADIUS
		// fill(c1); // Set fill to white
		// rect(60 * (i), canvasY/2 + (j * 60), 30, 30); // Draw white rect using RADIUS mode

		// rectMode(CENTER); // Set rectMode to CENTER
		// fill(c2); // Set fill to gray
		// rect(60 * (i), canvasY/2 + (j * 60), 30, 30); // Draw gray rect using CENTER mode
		
			
			
		// }
	
		
	// }	
	
// }

// function doBeer()
// {
	// if ((frameCount % 100) === 0)
	// {
		// if (random(0, 10) > 6) beerArray.push(new Beer(random(0, canvasX), random(canvasY/2, canvasY), 1)); 
		
	// }
	
	// for (var i = 0; i < beerArray.length; i++)
	// {
		// if (beerArray[i].isConsumed == false)
		// {
			// beerArray[i].update(TheAvalance.x, TheAvalance.y); 
			// beerArray[i].display();  
			
		// }
		
		
	// }
	
// }


// function doFarts()
// {
	
	// for (var i = 0; i < fartArray.length; i++)
	// {
		
		// if (!fartArray[i].isConsumed){
			// fartArray[i].update(); 
			// fartArray[i].display(); 
			// //image(fartSprite, fartArray[i].x, fartArray[i].y); 
			
		// }
	// }
// }





// function doLights()
// {
	
	// /* if (!reverseLight) lightOffSet += 10; 
	// if (reverseLight) lightOffSet -= 10;  */
	
	
	
	// if (lightRotation < 90 && !reverseLight) lightRotation += 1; 
	// else if (lightRotation >= 90) reverseLight = true; 
	
	// if (lightRotation > 0 && reverseLight) lightRotation -= 1; 
	// else if (reverseLight && lightRotation <= 0) reverseLight = false; 
	
	// //rotate(PI * lightRotation); 
	// push(); 
	// rotate(radians(lightRotation));
	
	// image(lightSprite, -5 + lightOffSet, -100, 1000, 1500);
	// pop(); 
	// push(); 
	// translate(1000, -100); 
	// rotate(radians(lightRotation));
	
	// image(lightSprite, lightOffSet, 0, 800, 1400);
	// pop(); 
// }


// function doHaze()
// {
	// image(hazeSprite, hazeX, hazeY, 1000, 1400);  
	
	// hazeX += 2; 
	
	// if (hazeX > canvasX * 2) hazeX = -(canvasX * 2); 
	
// }


// class Avalanche {
  // constructor(x, y, scale) {
    // this.sprite = avalancheSprite1; 
	// this.x = x;
    // this.y = y;
    // this.scale = scale;
    // this.speed = 10;
	// this.MOVE = MOVE.NOT_MOVING;
	// this.spriteNum = 0; 
	// this.health = 100;  
	// this.prevMOVE = MOVE.NOT_MOVING; 
  // }

  // moveForward() {
    // this.x += this.speed;
	// this.prevMOVE = this.MOVE; 
	// this.MOVE = MOVE.RIGHT; 
    // //this.y += speed;
  // }

  // update()
  // {
	   
	  // if (this.health <= 0) 
	  // {
		  // currentGameState = GAME_STATE.DEAD; 
		  
	  // }
	  

	  // if(this.MOVE === MOVE.LEFT && this.x > 0) this.moveBackward();
	  // else if (this.MOVE === MOVE.RIGHT && this.x < canvasX) this.moveForward(); 
	  // else if (this.MOVE === MOVE.UP && this.y > 0) this.moveUp(); 
	  // else if (this.MOVE === MOVE.DOWN && this.y < canvasY) this.moveDown(); 
	  
	  
	  // if (this.MOVE != MOVE.NOT_MOVING)
	  // {
	  // this.spriteNum += 1; 
	  // this.spriteNum = this.spriteNum % 2;  
	  
	  // }
  // }
  
  // moveBackward()
  // {
	  // this.x -= this.speed; 
	  // this.prevMove = this.MOVE; 
	  // this.MOVE = MOVE.LEFT;
	
  // }
  
  // moveDown()
  // {
	  
	  // this.y += this.speed; 
	  
  // }
  
  // moveUp()
  // {
	  // if (TheAvalance.y > canvasY/5) this.y -= this.speed; 
	  // else (TheAvalance.y = canvasY/5);
  // }
  
  // display() {
    
	// if (this.MOVE === MOVE.LEFT)
	// {
		// push(); 
		// scale(-1, 1); 
		// image(sprites[this.spriteNum],- this.x - 166 , this.y); 
		// pop(); 
	// }
	// else if (this.MOVE === MOVE.RIGHT)
	// {
		// scale (1, 1); 
		// image(sprites[this.spriteNum], this.x, this.y);	
	// } 
	// else 
	// {
	// if (this.prevMOVE === this.LEFT)
	// {
		// push(); 
		// scale (-1, 1);
		// image(sprites[this.spriteNum],- this.x - 166 , this.y); 
		// pop(); 
	// }	
	// else image(sprites[this.spriteNum], this.x, this.y);	
	// }
	
	// push(); 
	// var c = color(0, 0, 0);
	// fill(c); 
	// var healthText = "HEALTH: " + this.health;
	// textSize(32); 
	
	// text(healthText, this.x, this.y); 
	// pop(); 
  // }
// }


// class Plebble
// {
	
	// constructor(x, y, scale) {
    // this.sprite = plebbleSprite1;
	// this.x = x;
    // this.y = y;
    // this.scale = scale;
    // this.speed = 14;
	// this.MOVE = MOVE.NOT_MOVING; 
	// this.stamina = 100; 
	// this.isDead = false; 
  // }

  // moveForward() {
    // this.x += this.speed;
	
    // //this.y += speed;
  // }

  // update(targetX, targetY)
  // {
	// var distX = abs(this.x - targetX ); 
	// var distY = abs(this.y - targetY ); 
	
	// if ((distX ** 2) + (distY ** 2) > 15000) 
	// {
	
		// if (this.x > targetX) this.x -= 2; 
		// else this.x += 2; 
		
		// if (this.y > targetY) this.y -= 2; 
		// else this.y += 2;  
	// }
	// else 
	// {
		
		// //do damage to main player 
		
		// TheAvalance.health -= 1; 
		
	// }
	
	// if (this.stamina <= 0)
	// {
		// this.isDead = true; 
		// ruinCounter++; 
		// dieScream.play(); 
	// }
	
	
	
  // }
  
  // moveBackward()
  // {
	  // this.x -= this.speed; 
	
  // }
	

	
	// display()
	// {
		// var disText = "STAMINA: " + this.stamina;
		// image(plebbleSprite1, this.x, this.y); 
		
		// push(); 
		// var c = color(255, 255, 25); 
		// fill(c); 
		// text(disText, this.x, this.y + 350);
		// pop(); 
	// }
	
	
// }


// class Beer 
// {
	// constructor(x, y, scale) {
    // this.sprite = beerSprite;
	// this.x = x;
    // this.y = y;
    // this.scale = scale;
	// this.isConsumed = false; 
  // }

  // update(targetX, targetY)
  // {
	// var distX = abs(this.x - (targetX + AvalancheOffSetX) ); 
	// var distY = abs(this.y - (targetY + AvalancheOffSetY) ); 
	
	// if ((distX ** 2) + (distY ** 2) < 12500) 
	// {
	
		// this.isConsumed = true; 
		// fartsRemaining += 2; 
		// beerCounter++; 
	// }
	
  // }
  

	// display()
	// {
		// this.sprite.resize(170 / 4, 622 /4);
		// image(this.sprite, this.x, this.y); 
	// }
	
	
// }


// class Fart 
// {
	// constructor() {
    // this.sprite = fartSprite;
	// this.x = TheAvalance.x - 190;
    // this.y = TheAvalance.y + 175;
    // this.scale = scale;
	// this.isConsumed = false;
	// this.TTL =  1.25; 	
  // }

  // update(targetX, targetY)
  // {
	// this.x = TheAvalance.x - 200;  
	// this.y = TheAvalance.y + 200;
	
	// if (TheAvalance.MOVE === MOVE.LEFT)
	// {
		
		// this.x += 400
		
		
	// }
	
	
	
	// this.TTL -= 0.02; 
	
	// if (this.TTL <= 0.0) this.isConsumed = true; 
	
  // }
  

	// display()
	// {
		
		// if (TheAvalance.MOVE == MOVE.LEFT)
		// {
			// push(); 
			// scale(-1, 1); 
			// image(this.sprite, - this.x - 200, this.y); 
			// pop();
		// }
		// else image(this.sprite, this.x, this.y); 
	// }
	
	
// }




