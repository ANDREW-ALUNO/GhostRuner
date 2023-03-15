var towerImg, tower, doorImg, doorsGroup, climber, climberImg, climberGroup;
var blocoInv, blocoInvGroup, fantasma, fantasmaImg,score = 0;
var gameState = "play";

function preload() {
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  fantasmaImg = loadImage("ghost-standing.png");
}

function setup() {
  createCanvas(600, 600);

  tower = createSprite(300, 300);
  tower.addImage("tower", towerImg);
  tower.velocityY = 1;

  fantasma = createSprite(300, 300);
  fantasma.addImage(fantasmaImg);
  fantasma.scale = 0.25;

  doorsGroup = new Group();
  blocoInvGroup = new Group();
  climberGroup = new Group();
}

function draw() {
  background(0);

  if (gameState == "play") {
    score += Math.round(frameRate()/60)
    
    if (tower.y > 400) {
      tower.y = 300;
    }

    if (fantasma.isTouching(climberGroup)) {
      fantasma.velocityY = 0;
    }

    if (fantasma.isTouching(blocoInvGroup) || fantasma.y >= 600) {
      fantasma.destroy();
      gameState = "end";
    }

    fantasma.velocityY += 1;
    fantasmaControl();
    spawnDoors();
    drawSprites();
    fill("white")
    textSize(30)
    text("score: " + score,50,50)
  }
  if (gameState == "end") {
    textAlign(CENTER);
    fill("yellow");
    textSize(30);
    text("Game Over!", 300, 300);
  }
}

function spawnDoors() {
  // escreva aqui o código para gerar as portas na torre
  if (frameCount % 240 === 0) {
    var door = createSprite(200, -50);

    door.x = Math.round(random(120, 400));
    var climber = createSprite(door.x, door.y + 50);
    var blocoInv = createSprite(door.x, door.y + 60, climber.width, 10);
    door.addImage(doorImg);
    climber.addImage(climberImg);

    door.velocityY = 1;
    climber.velocityY = 1;
    blocoInv.velocityY = 1;

    //atribua lifetime à variável
    door.lifetime = 800;
    climber.lifetime = 800;
    blocoInv.lifetime = 800;

    blocoInv.visible = false;

    door.depth = fantasma.depth - 1;
    //adiciona cada porta ao grupo
    doorsGroup.add(door);
    climberGroup.add(climber);
    blocoInvGroup.add(blocoInv);
  }
}

function fantasmaControl() {
  if (keyDown("space")) {
    fantasma.velocityY = -10;
  }
  if (keyDown("left")) {
    fantasma.position.x -= 3;
  }
  if (keyDown("right")) {
    fantasma.position.x += 3;
  }
}
