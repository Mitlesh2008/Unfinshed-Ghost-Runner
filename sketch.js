 var ghost,ghostRunning,ghostCollided;

 var PLAY = 1;
 var END = 0;
 var gameState = PLAY;

 var grasspath;
 var grasspathImg;
 var cloud,cloudImg;
 var moon,moonImg;

 var gameOver,gameOverImg;
 var restart,restartImg;

 var traps;

 var tree1;
 var tree2;
 var tree3;
 var tree4;
 var tree5;
 var tree6;

 var boulder1;
 var boulder2;
 var boulder3;
 
 var trapsGroup;
 var cloudGroup;

 var score = 0

 function preload() {

 ghostRunning = loadAnimation("ghost1.png","ghost2.png","ghost3.png");
 ghostCollided = loadAnimation("ghostcollided.png");

 grasspathImg = loadImage("grasspath1.png");
 cloudImg = loadImage("cloud1.png");
 moonImg = loadImage("moon1.png");

 tree1 = loadImage("tree1.png");
 tree2 = loadImage("tree2.png");
 tree3 = loadImage("trees1.png");
 tree4 = loadImage("trees2.png");
 tree5 = loadImage("trees3.png");
 tree6 = loadImage("trees4.png");
 
 boulder1 = loadImage("boulder1.png");
 boulder2 = loadImage("boulders1.png");
 boulder3 = loadImage("boulders2.png");

 gameOverImg = loadImage("gameover1.png");
 restartImg = loadImage("restartbutton1.png");

 }

 function setup(){

 createCanvas(1340,600);

 ghost = createSprite(100,510,30,50)
 ghost.addAnimation("Running", ghostRunning)
 ghost.addAnimation("collided", ghostCollided);
 ghost.scale = 0.3

 grasspath = createSprite(200,530,600,20);
 grasspath.addImage("path" ,grasspathImg);
 grasspath.velocityX = -8
 grasspath.x = grasspath.width/10
 grasspath.scale = 0.2

 gameOver = createSprite(594,225);
 gameOver.addImage(gameOverImg);
 gameOver.scale = 5

 restart = createSprite(591,275);
 restart.addImage(restartImg);
 restart.scale = 0.3

 moon = createSprite(1180,40,20,20)
 moon.addImage(moonImg);

 trapsGroup = new Group();
 cloudGroup = new Group();

 ghost.debug = true;
 ghost.setCollider("rectangle",0,0,210,280)
 
 
 }
   
 function draw(){

 background("black");

 //text (mouseX+","+mouseY,mouseX,mouseY);
 text ("score: "+score,1213,226)
 text.size = 20

 if (gameState === PLAY){

 gameOver.visible = false
 restart.visible = false

 score = score+ Math.round(frameCount/60)

 if (keyDown("space") && ghost.y >= 340) {
  ghost.velocityY = -21
 }

 ghost.velocityY = ghost.velocityY + 0.9

 if (grasspath.x < 0) {
  grasspath.x = grasspath.width/10
 }

 grasspath.velocityX = -(8 + 3*score/100)

 ghost.collide(grasspath);

 forestTraps();
 clouds();

 if (trapsGroup.isTouching(ghost)) {
   gameState = END
  }
 }
  else if (gameState === END) {

 gameOver.visible = true;
 restart.visible = true;
 
 grasspath.velocityX = 0;
 ghost.velocityY = 0;

 ghost.changeAnimation("collided",ghostCollided)

 trapsGroup.setLifetimeEach(-1);
 cloudGroup.setLifetimeEach(-1);

 trapsGroup.setVelocityXEach(0);
 cloudGroup.setVelocityXEach(0);

  }  

 //console.log(ghost.y);

 drawSprites();
}

 function clouds() {

 if (frameCount % 200 === 0) {

 cloud = createSprite (1303,100,40,10);
 cloud.velocityX = -2
 cloud.addImage(cloudImg);
 cloud.scale = 0.8
 cloud.y = Math.round(random(10,100));
 cloud.depth = ghost.depth;
 ghost.depth = ghost.depth+1;

 cloud.depth = moon.depth;
 //console.log (ghost.depth,cloud.depth);
 moon.depth = moon.depth-1

 cloud.lifetime = 720;
 cloudGroup.add(cloud);  

  }
 }

 function forestTraps () {

 if (frameCount % 100 === 0){

 traps = createSprite(1278,406,10,40)
 traps.velocityX = -(7 + score/100);

 traps.velocityX = traps.velocityX + 0.9
 
 var rand = Math.round(random(1,9));

 switch (rand) {

 case 1 : traps.addImage(tree1);
 break;

 case 2 : traps.addImage(tree2);
 break;

 case 3: traps.addImage(tree3);
 break;

 case 4 : traps.addImage(tree4);
 break;

 case 5 : traps.addImage(tree5);
 break;

 case 6 : traps.addImage(tree6);
 break;

 case 7 : traps.addImage(boulder1);
 break;

 case 8 : traps.addImage(boulder2);
 break;

 case 9 : traps.addImage(boulder3);
 break;

 default : break;

 }

 traps.scale = 0.7;
 traps.lifetime = 720;
 trapsGroup.add(traps);

   }
 }