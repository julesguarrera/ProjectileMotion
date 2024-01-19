//acks:my physics hw for equations, scovs 
let time;
let counter = 0;
let score = 0;
let button;
let velocity;
let theta;
let startingY;
let launchObject;
let resetButton;
let targetLocation;

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
  //getInput()
  welcome = loadImage("welcome.png");
  cannon = loadImage("cannon.png");
  target = loadImage("target.png");
  field = loadImage("field.png");
  circus = loadImage("circus.jpg");
  library = loadImage("library.jpg");
  tennis = loadImage("tennis.jpg");
  win = loadImage("win.png");
  success = loadSound("success.mp3");
  targetButton = createButton("target");
  targetButton.position(97, 30);
  targetButton.mousePressed(getLocation);
  button = createButton("get input");
  button.position(97, 55);
  button.mousePressed(getInput);
}

function getLocation() {
  targetLocation = int(prompt("where (on the x axis) do you want the target"));
}

function getInput() {
  startingY = int(prompt("what is starting Y position"));
  velocity = int(prompt("what is velocity"));
  theta = int(prompt("what is the angle"));
  launchObject = prompt(
    "what object do you want to launch: soccer, tennis, person, books"
  );
  time = 0;
}

function reset() {
  image(welcome, 0, 0, 400, 400);
  button = createButton("get input");
  button.position(97, 55);
  button.mousePressed(getInput);
  targetButton = createButton("target");
  targetButton.position(97, 30);
  targetButton.mousePressed(getLocation);
  image(target, targetLocation, 340, 100, 40);
  cannonImage();
  makeGrid(true);
  text("score = " + score, 100, 20);
}

function draw() {
  image(welcome, 0, 0, 400, 400);
  image(target, targetLocation, 340, 100, 40);
  updateData();
  showData(xPos, yPos, xPosR, yPosR);
  let fr = 10;
  frameRate(fr);
  vectorLines();
  drawCompLines(xPos, yPos, xComponent, yComponent);
  cannonImage();
  makeGrid(true);
  if (
    xPos > targetLocation - 20 &&
    xPos < targetLocation + 10 &&
    yPos > -5 &&
    yPos < 15
  ) {
    image(win, 0, 0, 400, 400);
    score = score + 1;
    fill(84, 46, 75);
    text("score = " + score, 100, 20);
    success.play();
  }
  if (yPos < -60) {
    reset();
  }
}

function makeGrid(lines) {
  if (lines == true) {
    fill(255);
    strokeWeight(3.4);
    stroke(84, 46, 75);
    text("0", 20, 375);
    for (i = 50; i <= 400; i = i + 50) {
      line(10, 0, 10, 400);
      textSize(15);
      text(i, 20, 380 - i);
      counter = counter + 1;
      for (y = 10; y < height; y = y + 15) {
        line(5, y, 15, y);
      }
    }
    for (i = 50; i <= 400; i = i + 50) {
      line(0, 385, 400, 385);
      textSize(15);
      text(i, 14 + i, 375);
      counter = counter + 1;
      for (x = 10; x < width; x = x + 15) {
        line(x, 390, x, 380);
      }
    }
  }
}

function updateData() {
  xPos = 0 + velocity * cos(theta) * time;
  yPos = startingY + velocity * sin(theta) * time + -4.9 * time ** 2;
  xPosR = round(xPos, 0);
  yPosR = round(yPos, 0);
  time = time + .1;
  timeR = round(time,2)
}

function vectorLines() {
  xComponent = velocity * cos(theta);
  yComponent = velocity * sin(theta) + -9.8 * time;
}
function drawCompLines(xPos, yPos, xComponent, yComponent) {
  strokeWeight(0.5);
  line(xPos + 47, 365 - yPos, xPos + 47 + xComponent, 365 - yPos);
  triangle(
    xPos + xComponent + 45,
    365 - yPos - 5,
    xPos + xComponent + 55,
    365 - yPos,
    xPos + xComponent + 45,
    365 - yPos + 5
  );
  line(xPos + 47, 365 - yPos, xPos + 47, 365 - yPos - yComponent);
  if (yComponent > 0) {
    triangle(
      xPos + 42,
      365 - yPos - yComponent,
      xPos + 47,
      365 - yPos - yComponent - 10,
      xPos + 52,
      365 - yPos - yComponent
    );
  } else {
    triangle(
      xPos + 42,
      365 - yPos - yComponent,
      xPos + 47,
      365 - yPos - yComponent + 10,
      xPos + 52,
      365 - yPos - yComponent
    );
  }
}

function showData(xPos, yPos, xPosR, yPosR) {
  noStroke();
  if (launchObject == "soccer") {
    image(field, -250, 0, 650, 500);
    image(target, targetLocation, 340, 100, 40);
    fill(249, 247, 250);
    rect(225, 2, 140, 70);
    textSize(20);
    text("⚽", xPos + 40, height - yPos - 20);
    textSize(12);
    stroke(249, 247, 250);
    fill(0);
    strokeWeight(10);
    text("x position: " + xPosR, 250, 20);
    text("y position: " + yPosR, 250, 40);
    text("time: " + timeR, 250, 60);
    print(
      "at " +
        timeR +
        " seconds, x postion is " +
        xPosR +
        " and y position is " +
        yPosR
    );
    return [xPos, yPos, xPosR, yPosR];
  }
  if (launchObject == "tennis") {
    image(tennis, 0, 0, 400, 400);
    image(target, targetLocation, 340, 100, 40);
    fill(249, 247, 250);
    rect(225, 2, 140, 70);
    textSize(20);
    text("🎾", xPos + 40, height - yPos - 20);
    textSize(12);
    stroke(249, 247, 250);
    fill(0);
    strokeWeight(10);
    text("x position: " + xPosR, 250, 20);
    text("y position: " + yPosR, 250, 40);
    text("time: " + timeR, 250, 60);
    print(
      "at " +
        timeR +
        " seconds, x postion is " +
        xPosR +
        " and y position is " +
        yPosR
    );
    return [xPos, yPos, xPosR, yPosR];
  }
  if (launchObject == "person") {
    image(circus, 0, 0, 400, 400);
    image(target, targetLocation, 340, 100, 40);
    fill(249, 247, 250);
    rect(225, 2, 140, 70);
    textSize(40);
    text("🚶", xPos + 40, height - yPos - 20);
    textSize(12);
    stroke(249, 247, 250);
    fill(0);
    strokeWeight(10);
    text("x position: " + xPosR, 250, 20);
    text("y position: " + yPosR, 250, 40);
    text("time: " + timeR, 250, 60);
    print(
      "at " +
        timeR +
        " seconds, x postion is " +
        xPosR +
        " and y position is " +
        yPosR
    );
    return [xPos, yPos, xPosR, yPosR];
  }
  if (launchObject == "books") {
    image(library, 0, 0, 600, 400); //my old school's library :)
    image(target, targetLocation, 340, 100, 40);
    fill(249, 247, 250);
    rect(225, 2, 140, 70);
    textSize(25);
    text("📚", xPos + 40, height - yPos - 20);
    textSize(12);
    stroke(249, 247, 250);
    fill(0);
    strokeWeight(10);
    text("x position: " + xPosR, 250, 20);
    text("y position: " + yPosR, 250, 40);
    text("time: " + timeR, 250, 60);
    print(
      "at " +
        timeR +
        " seconds, x postion is " +
        xPosR +
        " and y position is " +
        yPosR
    );
    return [xPos, yPos, xPosR, yPosR, timeR];
  }
}
function cannonImage() {
  image(cannon, 10, 290, 90, 90);
}
