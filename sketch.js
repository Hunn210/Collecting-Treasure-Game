// Game states
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var sword, fruit, monster, fruitGroup, enemyGroup, score, r, randomFruit;

var swordImage, fruit1, fruit2, fruit3, fruit4, monsterImage, gameOverImage;

var knifeSwooshSound, gameOverSound;

function preload(){
  
  swordImage = loadImage("sword.png");
  monsterImage = loadAnimation("alien1.png","alien2.png");
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameOverImage = loadImage("gameover.png");
  knifeSwooshSound = loadSound("knifeSwooshSound.mp3");
  gameOverSound = loadSound("gameover.mp3")
}

function setup(){
  // to create the canvas
  createCanvas(500,500);
  
  // creating sword
  sword = createSprite(200,200,10,10);
  sword.addImage(swordImage);
  sword.scale = 0.5;
  
  // set a collider for sword
  sword.setCollider("circle", 0,0,20);
  
  //Score variables ang groups
  score = 0;
  fruitGroup = createGroup();
  enemyGroup = createGroup();
}

function draw(){
  // adding the background
  background("lightblue");
  
  if(gameState === PLAY){
    
    // Call the fruit and enemy function
  fruits();
  Enemy();
    
   // move sword with mouse
  sword.y = World.mouseY;
  sword.x = World.mouseX;
    
    // Increase score if sword touching fruit
    if(fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      score=score+2;
      knifeSwooshSound.play();
    }
  else
    {
  // Go to end stage if sword touching enemy
    if(enemyGroup.isTouching(sword)){
      gameState = END;
      
      fruitGroup.destroyEach();
      enemyGroup.destroyEach();
      fruitGroup.setVelocityXEach(0);
      enemyGroup.setVelocityXEach(0); 
      gameOverSound.play();
      
      // Change the animation of sword to gameover and reset its position
        sword.addImage(gameOverImage);
        sword.x=250;
        sword.y=250;
      }  
    }
  }
  
  drawSprites();
  
  //Display score
  text("Score : "+ score,250,30);
}

function fruits(){
  if(World.frameCount%80===0){
    fruit=createSprite(400,200,20,20);
    fruit.scale=0.2;
     //fruit.debug=true;
     r=Math.round(random(1,4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }
    
    fruit.y=Math.round(random(50,340));
   
    fruit.velocityX=-7;
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
  }
}

function Enemy(){
  if(World.frameCount%200===0){
    monster=createSprite(400,200,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y=Math.round(random(100,300));
    monster.velocityX=-8;
    monster.setLifetime=50;
    
    enemyGroup.add(monster);
  }
}