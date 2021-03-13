var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;
var PLAY = 1;
var END = 0;
var gameState = 1;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
}

function setup(){
  
  createCanvas(400,600);
// Moving background
path=createSprite(200,200);
path.addImage(pathImg);
path.velocityY = 4;

//creating boy running
boy = createSprite(70,530,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.addAnimation("theEnd",endImg);
boy.setCollider("circle",0,0,400);
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

}

function draw() {  
  background(0);
  
  if(gameState === PLAY){
    
    boy.changeAnimation("SahilRunning");
    boy.scale = 0.08;
  boy.y = 530;
  boy.x = World.mouseX;
    
  edges= createEdgeSprites();
  boy.collide(edges);
    
path.velocityY = 4;  
  //code to reset the background
  if(path.y > 400 ){
    path.y = height/2;
  }
  
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection = treasureCollection+50;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection = treasureCollection+150;
      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection = treasureCollection+100;
      
    }else{
      if(swordGroup.isTouching(boy)) {
        gameState = END;
        
    }
  }
}
    if(gameState === END){
      
        boy.changeAnimation("theEnd");
        boy.x = 200;
        boy.y = 300;
        boy.scale = 0.5;
        
        swordGroup.destroyEach();
        cashG.destroyEach();
        jwelleryG.destroyEach();
        diamondsG.destroyEach();
        
        swordGroup.setVelocityYEach(0);
        cashG.setVelocityYEach(0);
        jwelleryG.setVelocityYEach(0);
        diamondsG.setVelocityYEach(0);
        path.velocityY = 0;
      
        if(keyDown("Space")){
          gameState = PLAY;
          treasureCollection = 0;
        }
    }  

  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,150,30);

}

function createCash() {
  if (World.frameCount % 75 == 0) {
  var cash = createSprite(Math.round(random(75, 145),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 200;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 150 == 0) {
  var diamonds = createSprite(Math.round(random(150, 220),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 200;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 225 == 0) {
  var jwellery = createSprite(Math.round(random(225, 290),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = 200;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 300 == 0) {
  var sword = createSprite(Math.round(random(300, 375),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 200;
  swordGroup.add(sword);
  }
}