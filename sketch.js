var bananaimg,
  obstacleimg,
  obstacleGroup,
  bananaGroup,
  bg,
  bgimg,
  score,
  playerrunning,
  player,
  inviground;

function preload() {
  bgimg = loadImage("jungle.jpg");

  bananaimg = loadImage("banana.png");

  obstacleimg = loadImage("stone.png");

  playerrunning = loadAnimation(
    "Monkey_01.png",
    "Monkey_02.png",
    "Monkey_03.png",
    "Monkey_04.png",
    "Monkey_05.png",
    "Monkey_06.png",
    "Monkey_07.png",
    "Monkey_08.png",
    "Monkey_09.png",
    "Monkey_10.png"
  );
}

function setup() {
  createCanvas(400, 400);

  inviground = createSprite(200, 390, 400, 10);
  inviground.visible = false;

  bg = createSprite(200, 200, 400, 10);
  bg.addImage("label", bgimg);
  bg.velocityX = -3;

  player = createSprite(100, 330, 10, 10);
  player.addAnimation("label1", playerrunning);
  player.scale = 0.1;

  obstacleGroup = createGroup();
  bananaGroup = createGroup();

  score = 0;
}

function draw() {
  background(220);

  inviground.depth = inviground.depth + 1;

  player.velocityY = player.velocityY + 0.8;
  player.collide(inviground);

  if (bg.x < 0) {
    bg.x = bg.width / 2;
  }

  if (bananaGroup.isTouching(player)) {
    score = score + 2;
    bananaGroup.destroyEach();
  }

  switch (score) {
    case 10:
      player.scale = 0.12;
      break;
    case 20:
      player.scale = 0.14;
      break;
    case 30:
      player.scale = 0.16;
      break;
    case 40:
      player.scale = 0.18;
      break;
    default:
      break;
  }

  if (obstacleGroup.isTouching(player)) {
    player.scale = 0.1;
    score = 0;
  }

  if (keyIsDown(UP_ARROW)) {
    player.velocityY = -10;
  }

  bananaf();
  obstaclef();

  drawSprites();

  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score, 300, 20);
}

function bananaf() {
  if (World.frameCount % 80 == 0) {
    banana = createSprite(450, random(20, 200), 10, 10);
    banana.addImage("label2", bananaimg);
    banana.scale = 0.05;
    banana.velocityX = -3;
    bananaGroup.add(banana);
    banana.lifetime = 150;
  }
}

function obstaclef() {
  if (World.frameCount % 200 == 0) {
    obstacle = createSprite(450, 360, 10, 10);
    obstacle.addImage("label3", obstacleimg);
    obstacle.scale = 0.2;
    obstacle.velocityX = -3;
    obstacleGroup.add(obstacle);
    obstacle.lifetime = 150;
  }
}
