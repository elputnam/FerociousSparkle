let sparks = [];
let x; 
let y; 

var capturer = new CCapture({
  format:'webm', 
  workersPath: 'js/',
  framerate: 10
});

function setup() {
  createCanvas(1920, 1080);
  colorMode(HSB, 360, 100, 100, 100);
  x = width/2;
  y = height/2;
  background(0)
  frameRate(10);
}

function draw() {
  background(0, 1);
  if (frameCount==1) capturer.start(); //
  // background(random(10), 100, random(100), 1);

  //array of sparks
  sparks.push(new Element(createVector(x, y)));
  for(let i = sparks.length - 1; i >= 0; i--){
    let s = sparks[i];
    s.run();
    if (s.ghost()){
      sparks.splice(i, 1);
      }
    }

  if (frameCount%30==0){
    x = random(width);
    y = random(height);
  }

  capturer.capture(document.getElementById('defaultCanvas0'));  
  if (frameCount==500){
    save_record();
  }
  print(frameCount);
  }

class Element {
  constructor(loc) {
    this.accel = createVector(random(-0.05, 0.05), random(-0.05, 0.05));
    this.vel = createVector(random(-1,1), random(-1,1));
    this.loc = loc.copy();
    this.lifespan = 255.0;
    this.H1 = 175;
  }

  run(){
    this.update();
    this.display();
  }

  //movements of squares
  update(){
    this.vel.add(this.accel);
    this.loc.add(this.vel);
    this.lifespan -= random(1,3);
  }

  //show squares
  display(){
    noStroke();
    rectMode(CENTER)
    //fill(this.H1, random(100), random(100), this.lifespan);
    fill(255, this.lifespan);
    ellipse(this.loc.x, this.loc.y, random(5,10), random(5,10));
  }

  //make the squares disappear when faded out
  ghost(){
    if (this.lifespan < 0.0){
      return true;
    } else {
      return false;
    }
  }
}

// //function mousePressed(){
//   background(random(300, 360), 100, random(50));
// }

// //function touchStarted(){
//   background(random(300, 360), 100, random(50));
// }

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

function save_record() {
  capturer.save();
}