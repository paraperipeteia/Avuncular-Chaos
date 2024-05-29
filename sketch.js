let discoRects = 100;
let canvasX = 1200; 
let canvasY = 1200;

let avalancheSprite1, avalancheSprite2, plebbleSprite1; 
let lightSprite, hazeSprite; 
let fartSprite, beerSprite, DJ_sprite; 
let pauseSprite, titleSprite, deadSprite; 

let lightOffSet = 0; 
let lightRotation = 0; 
let reverseLight = false; 

let boxLimWidth = 800; 
let boxLimHeight = 800;

let TheAvalanche; 

let ruinCounter, beerCounter, fartsRemaining;
let hazeX, hazeY; 

let sprites, fartArray, beerArray, plebArray; 

let song, fartSound, dieScream; 

let AvalancheOffSetX = 150; 
let AvalancheOffSetY = 230; 

let currentGameState; 
let doMusicFlag; 

// Unused Quotes
const AVALANCHE_QUOTES = 
{
    ONE: 'GET OUT DA WAY',
    TWO: 'WHAT BE ROLLIN, PLEBS? ME!',
    THREE: 'I AM BEGUN!',
    FOUR: 'I AM THE CANNONICAL DVNO!'	
}

const MOVE = 
{
    LEFT: 'left',
    RIGHT: 'right',
    UP: 'up',
    DOWN: 'down',
    NOT_MOVING: 'not_Moving'
}

const GAME_STATE = 
{
    TITLE: 'title',
    PAUSE: 'pause',
    PLAYING: 'playing'
}

function setup() 
{
    createCanvas(1500, 1080);
    frameRate(30);

    hazeX = 0; 
    hazeY = 0; 

    song = loadSound('audio/avuncular.mp3');
    fartSound = loadSound('audio/fart.mp3'); 
    dieScream = loadSound('audio/screamPleb.mp3'); 
    DJ_sprite = loadImage('sprites/DJ_Rock.png'); 
    avalancheSprite1 =  loadImage('sprites/avalanche1.png');
    avalancheSprite2 =  loadImage('sprites/avalanche2.png');
    deadSprite = loadImage('sprites/dead.png'); 
    fartSprite = loadImage('sprites/fart.png'); 
    beerSprite = loadImage('sprites/beerbottle.png');
    pauseSprite = loadImage('sprites/pause.png'); 
    titleSprite = loadImage('sprites/title.png'); 

    song.setVolume(0.25);
    fartSound.setVolume(0.15);
    dieScream.setVolume(0.05);

    TheAvalanche = new Avalanche(50, canvasY/2, 1);

    plebbleSprite1 = loadImage('sprites/altPlebble.png'); 

    lightSprite = loadImage('sprites/light.png');
    hazeSprite = loadImage('sprites/haze.png');

    fartsRemaining = 0; //a consumed beer gives +2 farts 

    beerArray = []; 
    plebArray = []; 
    fartArray = []; 

    sprites = []; 
    sprites[0] = avalancheSprite1;
    sprites[1] = avalancheSprite2;

    currentGameState = GAME_STATE.TITLE;

    beerCounter = 0; 

    beerArray.push(new Beer(random(0, canvasX), random(canvasY/2, canvasY), 1)); 
    ruinCounter = 0; 
    doMusicFlag = false; 
}

function doReset()
{
    TheAvalanche.health = 100; 
    TheAvalanche.x = 50; 
    TheAvalanche.y = canvasY/2;

    fartsRemaining = 0; 
    beerCounter = 0; 
    ruinCounter = 0; 

    for (var i = plebArray.length ; i > 0; i--)
    {
        plebArray.pop(); 
    }

    for (var j = beerArray.length ; j > 0; j--)
    {
        beerArray.pop(); 
    }

    for (var k = fartArray.length ; k > 0; k--)
    {
        fartArray.pop(); 
    }
}

function drawFunkyRects()
{
    var randX = random(canvasX - 100, canvasX); 
    var randY = random(canvasY - 100, canvasY); 

    for (let i = 0; i < discoRects; i++) 
    {
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

function keyPressed() 
{
    if (keyCode === LEFT_ARROW) 
    {

        TheAvalanche.MOVE = MOVE.LEFT; 
    } 
    else if (keyCode === RIGHT_ARROW)
    {
        TheAvalanche.MOVE = MOVE.RIGHT; 
    }   
    else if (keyCode === 38)
    {
        TheAvalanche.MOVE = MOVE.UP; 

    }
    else if (keyCode === 40)
    {
        TheAvalanche.MOVE = MOVE.DOWN;

    }
    else if (keyCode === 70 && fartsRemaining > 0) 
    {
        fartsRemaining--; 
        fartArray.push(new Fart());
        fartSound.play(); 
    } 
    else if (keyCode == 13)// 13 === ENTER
    {
        switch (currentGameState)
        {
            case GAME_STATE.TITLE:
                if (doMusicFlag === false)
                {
                    song.loop(); 
                    song.play();
                    doMusicFlag = true; 				  
                }				
                currentGameState = GAME_STATE.PLAYING; 
                break;

            case GAME_STATE.PLAYING:
                currentGameState = GAME_STATE.PAUSE; 	
                break;

            case GAME_STATE.PAUSE:
                currentGameState = GAME_STATE.PLAYING; 
                break;

            case GAME_STATE.DEAD: 
                currentGameState = GAME_STATE.TITLE;
                doReset();
                break;
        }
    }
    else TheAvalanche.MOVE = MOVE.NOT_MOVING;
    return false; 
}

function keyReleased()
{
    TheAvalanche.MOVE = MOVE.NOT_MOVING; 
}

function draw() 
{
    background(220);
    doDJ();
    doDanceFloor(); 
    if (currentGameState === GAME_STATE.PLAYING)
    {
        doFarts(); 
        doPlebs(); 
        doBeer();   
        doPlebFartInfluence(); 
        doAvalanche();   
        doLights();    
        doUI();
    }  
    else if (currentGameState === GAME_STATE.TITLE)
    {
        doTitle(); 
    }	
    else if (currentGameState === GAME_STATE.PAUSE)
    {
        doPause(); 
    }
    else if (currentGameState === GAME_STATE.DEAD)
    {
        doDead(); 
    }
}

function doDead()
{
    deadSprite.resize(1400, 900); 
    image(deadSprite, 50, 100); 
}

function doTitle()
{
    titleSprite.resize(1400, 900); 
    image(titleSprite, 50, 100); 
}

function doPause()
{
    pauseSprite.resize(1400, 900); 
    image(pauseSprite, 50, 100); 
}

function doAvalanche()
{
    TheAvalanche.display(); 
    TheAvalanche.update();  	
}

function doDJ()
{
    DJ_sprite.resize(1500, 600);
    image(DJ_sprite, 0, 0); 
}

function doPlebFartInfluence()
{
    //for each active fart see if it is damaging a pleb
    for (var i = 0; i < fartArray.length; i++)
    {
        if (fartArray[i].isConsumed === false)
        {
            for (var j = 0; j < plebArray.length; j++)
            {
                if (plebArray[j].isDead === false )
                {
                    if (doDistance(fartArray[i], plebArray[j]))
                    {
                        plebArray[j].stamina -= 7; 
                    }
                }
            }	
        }
    }
}

function doDistance(obj1, obj2)
{
    var distX = abs(obj1.x - obj2.x); 
    var distY = abs(obj1.y - obj2.y); 

    console.log("Total Distance: " + (distX + distY));
    return ((distX) + (distY) < 325);
}

function doUI()
{
    var beerString = "BEERS DRANK: " + beerCounter;
    var farts = "FARTS: " + fartsRemaining; 
    textSize(50); 
    text(beerString, canvasX /4 , 50 ); 
    text(farts, canvasX / 4 * 3, 50); 
    var plebCount = "RAVER RUINATION COUNT: " + ruinCounter; 
    push(); 
    textSize(60); 
    var c = color (5, 5, 5); 
    fill(c);
    strokeWeight(150);
    textStyle(BOLD);
    text(plebCount, canvasX/2 - 250, canvasY - 250); 
    pop(); 
}

function doPlebs()
{
    if ((frameCount % 100) === 0)
    {
        if (random(0, 10) > 6) plebArray.push(new Plebble(random(0, canvasX), random(0, canvasY), 1)); 
    }

    for (var i = 0; i < plebArray.length; i++)
    {
        if (plebArray[i].isDead == false) 
        {
            plebArray[i].update(TheAvalanche.x, TheAvalanche.y);
            plebArray[i].display(); 
        }
    }
}

function doDanceFloor()
{
    for (var j = 0 ; j < 9; j++)
    {
        for (var i = 0; i < 30; i++)
        {
            var c1 = color(random(100, 255), random(150, 255), random(0, 150));
            var c2 = color(random(100, 255), random(150, 255), random(0, 150));

            rectMode(RADIUS); // Set rectMode to RADIUS
            fill(c1); // Set fill to white
            rect(60 * (i), canvasY/2 + (j * 60), 30, 30); // Draw white rect using RADIUS mode

            rectMode(CENTER); // Set rectMode to CENTER
            fill(c2); // Set fill to gray
            rect(60 * (i), canvasY/2 + (j * 60), 30, 30); // Draw gray rect using CENTER mode
        }
    }	
}

function doBeer()
{
    if ((frameCount % 100) === 0)
    {
        if (random(0, 10) > 6) beerArray.push(new Beer(random(0, canvasX), random(canvasY/2, canvasY), 1)); 
    }

    for (var i = 0; i < beerArray.length; i++)
    {
        if (beerArray[i].isConsumed == false)
        {
            beerArray[i].update(TheAvalanche.x, TheAvalanche.y); 
            beerArray[i].display();  
        }
    }
}

function doFarts()
{
    for (var i = 0; i < fartArray.length; i++)
    {
        if (!fartArray[i].isConsumed){
            fartArray[i].update(); 
            fartArray[i].display(); 
        }
    }
}

function doLights()
{
    if (lightRotation < 90 && !reverseLight) lightRotation += 1; 
    else if (lightRotation >= 90) reverseLight = true; 

    if (lightRotation > 0 && reverseLight) lightRotation -= 1; 
    else if (reverseLight && lightRotation <= 0) reverseLight = false; 

    push(); 
    rotate(radians(lightRotation));

    image(lightSprite, -5 + lightOffSet, -100, 1000, 1500);
    pop(); 
    push(); 
    translate(1000, -100); 
    rotate(radians(lightRotation));

    image(lightSprite, lightOffSet, 0, 800, 1400);
    pop(); 
}


function doHaze()
{
    image(hazeSprite, hazeX, hazeY, 1000, 1400);  
    hazeX += 2; 
    if (hazeX > canvasX * 2) hazeX = -(canvasX * 2); 
}

class Avalanche 
{
    constructor(x, y, scale) 
    {
        this.sprite = avalancheSprite1; 
        this.x = x;
        this.y = y;
        this.scale = scale;
        this.speed = 10;
        this.MOVE = MOVE.NOT_MOVING;
        this.spriteNum = 0; 
        this.health = 100;  
        this.prevMOVE = MOVE.NOT_MOVING;
        this.mostRecentMoveDirection = MOVE.RIGHT;
    }

    moveForward() 
    {
        this.x += this.speed;
        this.prevMOVE = this.MOVE; 
        this.MOVE = MOVE.RIGHT; 
        this.mostRecentMoveDirection = MOVE.RIGHT;
    }

    update()
    {
        if (this.health <= 0) 
        {
            currentGameState = GAME_STATE.DEAD; 
        }

        if(this.MOVE === MOVE.LEFT && this.x > -150) this.moveBackward();
        else if (this.MOVE === MOVE.RIGHT && this.x < canvasX + 150) this.moveForward(); 
        else if (this.MOVE === MOVE.UP && this.y > 0) this.moveUp(); 
        else if (this.MOVE === MOVE.DOWN && this.y < canvasY) this.moveDown(); 

        if (this.MOVE != MOVE.NOT_MOVING)
        {
            this.spriteNum += 1; 
            this.spriteNum = this.spriteNum % 2;  
        }
    }

    moveBackward()
    {
        this.x -= this.speed; 
        this.prevMove = this.MOVE
        this.MOVE = MOVE.LEFT;
        this.mostRecentMoveDirection = MOVE.LEFT;
    }

    moveDown()
    {
        this.y += this.speed;
        if (this.y > canvasY - 350)
        {
            this.y = canvasY - 350;
        }
    }

    moveUp()
    {
        if (this.y > canvasY/6) this.y -= this.speed; 
        else this.y = canvasY/6;
    }

    display() {
        if (this.MOVE === MOVE.LEFT)
        {
            push(); 
            scale(-1, 1); 
            image(sprites[this.spriteNum],- this.x - 166 , this.y); 
            pop(); 
        }
        else if (this.MOVE === MOVE.RIGHT)
        {
            scale (1, 1); 
            image(sprites[this.spriteNum], this.x, this.y);	
        } 
        else 
        {
            if (this.mostRecentMoveDirection === MOVE.LEFT)
            {
                push(); 
                scale (-1, 1);
                image(sprites[this.spriteNum],-this.x - 166, this.y); 
                pop(); 
            }	
            else image(sprites[this.spriteNum], this.x, this.y);	
        }

        push(); 
        var c = color(0, 0, 0);
        fill(c); 
        var healthText = "HEALTH: " + this.health;
        textSize(32);
        textStyle(BOLD);
        text(healthText, this.x, this.y); 
        pop(); 
    }
}

class Plebble
{
    constructor(x, y, scale)
    {
        this.sprite = plebbleSprite1;
        this.x = x;
        this.y = y;
        this.scale = scale;
        this.speed = 14;
        this.MOVE = MOVE.NOT_MOVING; 
        this.stamina = 100; 
        this.isDead = false; 
    }

    moveForward() {
        this.x += this.speed;
    }

    update(targetX, targetY)
    {
        var distX = abs(this.x - targetX); 
        var distY = abs(this.y - targetY); 

        if ((distX ** 2) + (distY ** 2) > 15000) 
        {

            if (this.x > targetX) this.x -= 2; 
            else this.x += 2; 

            if (this.y > targetY) this.y -= 2; 
            else this.y += 2;  
        }
        else 
        {
            TheAvalanche.health -= 1; 
        }

        if (this.stamina <= 0)
        {
            this.isDead = true; 
            ruinCounter++; 
            dieScream.play(); 
        }
    }

    moveBackward()
    {
        this.x -= this.speed; 
    }

    display()
    {
        var disText = "STAMINA: " + this.stamina;
        image(plebbleSprite1, this.x, this.y); 
        push(); 
        // color should be orange     
        textFont('Courier New', 10);
        fill(255);
        stroke(0);
        strokeWeight(4);
        var c = color(255, 165, 0); 
        fill(c);
        textSize(32);
        textStyle(BOLD);
        text(disText, this.x, this.y + 350);
        pop(); 
    }
}

class Beer 
{
    constructor(x, y, scale)
    {
        this.sprite = beerSprite;
        this.x = x;
        this.y = y;
        this.scale = scale;
        this.isConsumed = false; 
    }

    update(targetX, targetY)
    {
        var distX = abs(this.x - (targetX + AvalancheOffSetX)); 
        var distY = abs(this.y - (targetY + AvalancheOffSetY)); 

        if ((distX) + (distY) < 210) 
        {
            this.isConsumed = true; 
            fartsRemaining += 2; 
            beerCounter++; 
        }
    }

    display()
    {
        this.sprite.resize(170 / 4, 622 /4);
        image(this.sprite, this.x, this.y); 
    }
}

class Fart 
{
    constructor() 
    {
        this.sprite = fartSprite;
        this.x = TheAvalanche.x - 190;
        this.y = TheAvalanche.y + 175;
        this.scale = scale;
        this.isConsumed = false;
        this.TTL =  1.25; 	
    }

    update(targetX, targetY)
    {
        this.y = TheAvalanche.y + 200;

        if (TheAvalanche.mostRecentMoveDirection === MOVE.LEFT)
        {
            this.x = TheAvalanche.x + 400;
        }
        else
        {
            this.x = TheAvalanche.x - 200; 
        }

        this.TTL -= 0.02; 
        if (this.TTL <= 0.0) this.isConsumed = true; 
    }

    display()
    {
        if (TheAvalanche.mostRecentMoveDirection == MOVE.LEFT)
        {
            push(); 
            scale(-1, 1); 
            image(this.sprite, -this.x, this.y); 
            pop();
        }
        else image(this.sprite, this.x, this.y); 
    }
}
