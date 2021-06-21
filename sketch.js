var PLAY =1;
var END =0;
var gameState= 1;
var score=0;

var sword,fruit1,fruit2,fruit3,fruit4,monster1,monster2;
var swordImage,monsterImage,gameoverImage,bgImage;
var fruitsGroup,enemyGroup;
var gameover;


function preload(){
  fruit1=loadImage("fruit1.png");
  fruit2=loadImage("fruit2.png");
   fruit3=loadImage("fruit3.png");
   fruit4=loadImage("fruit4.png");
  monsterImage1=loadImage("alien1.png");
    monsterImage2=loadImage("alien2.png");
 bgImage=loadImage("bg.jpg")

  swordImage = loadImage("sword.png");
  gameoverImage = loadImage("gameover.png");
  
 
}

function setup(){
  createCanvas(600, 600);
 
  sword= createSprite(50,200,20,20);
  sword.addImage(swordImage);
  sword.scale=0.5;
  
  gameover = createSprite(300,200);
  gameover.addImage(gameoverImage);
  gameover.scale=1;
 
  score=0;
  fruitsGroup = createGroup();
  enemyGroup = createGroup();
}


function draw(){
  background(bgImage);
  
  textSize(30);
  text("Score:"+ score,400,50);
  
  if(gameState===PLAY){
    gameover.visible= false;
    fruits();
    enemy();
    
    fruitsGroup.velocityX = -(6+score/100);
    enemyGroup.velocityX = -(6+score/100);
    
    sword.y=World.mouseY;
    sword.x=World.mouseX;
  }
  
     
 if(fruitsGroup.isTouching(sword)){
   fruitsGroup.destroyEach();
   score=score+2;
 }
  
  if(enemyGroup.isTouching(sword)){
    enemyGroup.destroyEach();
    gameState =END;
  }
  else if (gameState===END){
    gameover.visible=true;
    gameover.scale=1;
    sword.visible=false;
    score=0;
    
  }
  
  if(mousePressedOver(gameover)){
    gameState=PLAY;
    sword.visible=true;
  }
drawSprites();
}
function fruits(){
  if(World.frameCount%80===0){
    position = Math.round(random(1,2))
     fruit=createSprite(400,200,20,20);
    fruit.velocityX=-9;
  
  rand = Math.round(random(1,4))
   
 if(rand==1){
   fruit.x=400;
   fruit.velocityX=-(7+(score/4))
 }else if(rand==2){
   fruit.x=0;
   fruit.velocityX=(7+score/4)
 }
 

    var num= Math.round(random(1,4));
    switch (num){
      case 1:
        fruit.addImage(fruit1);
        break;
        case 2:
        fruit.addImage(fruit2);
        break;
        case 3:
        fruit.addImage(fruit3);
        break;
      case 4:
        fruit.addImage(fruit4);
    }
   fruit.y=Math.round(random(50,340));
    fruit.setLifetime=200;
    fruitsGroup.add(fruit);
    fruit.scale=0.2
    //fruit.debug=true;
  
  }
}
function enemy() {
  
   if(World.frameCount%200 === 0) { 
     
     monster1=createSprite(600,200,20,20);
     monster1.addImage("moving", monsterImage1);
     monster1.y=Math.round(random(25,275)); 
     monster1.velocityX=-10;
     monster1.setlifetime=50;

     enemyGroup.add(monster1);  

   }
  
   if(World.frameCount%200 === 0) {
     
     monster2=createSprite(800,200,20,20);
     monster2.addImage("moving2", monsterImage2);
     monster2.y=Math.round(random(325,575));
     monster2.velocityX=-10;
     monster2.setlifetime=50;
     enemyGroup.add(monster2);
     
   }
   
}