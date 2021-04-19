var boy, boyImage,boystopImage, ground, groundImage;
var invisibleGround, obs1, obs2, obs3;
var obstacle1Image, obstacle2Image, obstacle3Image;
var obs1Group,obs2Group, obs3Group,coinsGroup;
var score = 0
var gameState = "play";
var coin;

function preload(){
  boyImage = loadAnimation("Y1.png","Y2.png","Y3.png","Y4.png","Y5.png","Y6.png","Y7.png");
  boystopImage = loadAnimation("Y1.png");
  coin = loadAnimation("C1.png","C2.png","C3.png","C4.png","C5.png","C6.png");
 groundImage= loadImage("Ground_2.png"); 
  obstacle1Image = loadImage("obstacle1.png");
  obstacle2Image = loadImage("obstacle2.png");
  obstacle3Image = loadImage("water.png");

}
function setup() {
  createCanvas(600, 200);
  
  ground = createSprite(0,180,600,200);
  ground.addImage("bckgrd",groundImage);
  ground.velocityX = -4;
  
  boy = createSprite(50,140,40,40);
  boy.addAnimation("boy_running",boyImage);
  boy.addAnimation("boy_stop",boystopImage);
  boy.scale = 0.5;
  
  invisibleGround =createSprite(0,150,600,10);
  invisibleGround.visible = false;
  
  coinsGroup = new Group();
  obs1Group = new Group();
  obs2Group = new Group();
  obs3Group = new Group();
  
  boy.setCollider("circle",0,0,25);
  
//  boy.debug=true;
    
  
}

function draw() {
  background("white");
  if(gameState == "play"){
    
  ground.velocityX = -4;
  
  if(ground.x <0){
    ground.x = ground.width/2;
  }
  
  if(keyDown("space") && boy.y>80){
    boy.velocityY = -10;
  }
  boy.velocityY = boy.velocityY+0.5;
  
  boy.collide(invisibleGround);
  
  spawnObstacle();
  spawnCoins();
  
  if(coinsGroup.isTouching(boy)){
    score = score+2;
    coinsGroup.destroyEach();
  }
  if(obs1Group.isTouching(boy)||obs2Group.isTouching(boy)||obs3Group.isTouching(boy)){
    gameState = "end";
  }
} else if(gameState == "end"){
      ground.velocityX = 0;
      boy.velocityY = 0;
      obs1Group.setVelocityXEach(0);
      obs1Group.setLifetimeEach(-1);
      obs2Group.setVelocityXEach(0);
      obs2Group.setLifetimeEach(-1);
      obs3Group.setVelocityXEach(0);
      obs3Group.setLifetimeEach(-1);
      coinsGroup.setVelocityXEach(0);
      coinsGroup.destroyEach();
      boy.changeAnimation("boy_stop",boystopImage);
      
}
  drawSprites();
text("Score:"+score,500,20);
  if(gameState == "end"){
    strokeWeight(4);
    fill("red");
    text("Game Over",300,100);
  }
}

function spawnObstacle(){
  if(frameCount % 300 ===0){
     
//generate random obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle1();
              break;
      case 2: obstacle2();
              break;
      case 3: obstacle3();
              break;
      default: break;
    }

  }
} 

function obstacle1(){
  obs1 = createSprite(600,150);
  obs1.addImage("obs1",obstacle1Image);
  obs1.velocityX = -4;
  obs1.scale = 0.2;
  obs1.lifetime = 200;
  obs1.debug = true;
  obs1Group.add(obs1);
  
}
function obstacle2(){
  obs2 = createSprite(600,140);
  obs2.addImage("obs2",obstacle2Image);
  obs2.velocityX = -4;
  obs2.scale = 0.15;
  obs2.lifetime = 200;
  obs2.debug = true;
  obs2Group.add(obs2);
  
}
function obstacle3(){
  obs3 = createSprite(600,160);
  obs3.addImage("obs3",obstacle3Image);
  obs3.velocityX = -4;
  obs3.scale = 0.8;
  obs3.lifetime = 200;
  obs3.debug = true;
  obs3Group.add(obs3);
  
}
function spawnCoins() {
  //write code here to spawn the clouds
  if (frameCount % 180 === 0) {
    var coins = createSprite(600,120,40,10);
    coins.y = Math.round(random(50,100));
    coins.addAnimation("coin",coin);
    coins.scale = 0.1;
    coins.velocityX = -3;
    
     //assign lifetime to the variable
    coins.lifetime = 200;
    
    //adjust the depth
    coins.depth = boy.depth;
    coins.depth = boy.depth + 1;
    
    //add each cloud to the group
    coinsGroup.add(coins);
  }
  
}