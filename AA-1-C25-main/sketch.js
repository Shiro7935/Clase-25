const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world, backgroundImg,boat;
var canvas, angle, tower, ground, cannon;
var balls = [];
var boats = [];

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
}

function setup() {
  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES)
  angle = 15

  ground = Bodies.rectangle(0, height - 1, width * 2, 1, { isStatic: true });
  World.add(world, ground);

  tower = Bodies.rectangle(160, 350, 160, 310, { isStatic: true });
  World.add(world, tower);

  cannon = new Cannon(180, 110, 130, 100, angle);
 
}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);

  Engine.update(engine);

  
  rect(ground.position.x, ground.position.y, width * 2, 1);
 

  push();  
  imageMode(CENTER);
  image(towerImage,tower.position.x, tower.position.y, 160, 310);
  pop();
  

  for (var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i], i);
  }



  cannon.display();
  showBoat();
}

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    var cannonBall = new CannonBall(cannon.x, cannon.y);
    cannonBall.trajectory = [];
    Matter.Body.setAngle(cannonBall.body, cannon.angle);
    balls.push(cannonBall);
  }
}

function showCannonBalls(ball, index) {
  if (ball) {
    ball.display();
  }
}

function showBoat() {
  if (boats.length > 0) {

    if (boats[boats.length-1] === undefined || boats[boats.length-1].body.position.x < width-300) {

      var pos = [-40,-60,-70,-20]
      var rando = random(pos)

      var boat = new Boat(width-79, height - 60, 170, 170,rando);
      boats.push(boat)
    }

    for (var index = 0; index < boats.length; index++) {

      if (boats[index]) {
        Matter.Body.setVelocity(boats[index],{x:-0.9,y:0})
        boats[index].display();
      }

    }
  } else {
    boat = new Boat(width-79, height - 60, 170, 170,-80);
    boats.push(boat)
  }


}



function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    balls[balls.length - 1].shoot();
  }
}
