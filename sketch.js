let particles = [];
let numParticles = 600;
let decayRate = 0.3; // How quickly alpha fades
let fadeOut = false;
let centerX, centerY;

function setup() {
  let canvas = createCanvas(600, 600);
  canvas.parent("canvas-container");
  background(20);
  angleMode(DEGREES);

  centerX = width / 2;
  centerY = height / 2;

  for (let i = 0; i < numParticles; i++) {
    let angle = random(360);
    let radius = randomGaussian() * 100 + 150;
    let speed = random(0.1, 0.6);
    let alpha = 255;
    particles.push({
      x: centerX + radius * cos(angle),
      y: centerY + radius * sin(angle),
      angle,
      radius,
      speed,
      alpha,
      rOffset: random(1000)
    });
  }

  // Trigger fade after a pause
  setTimeout(() => fadeOut = true, 3000);
}

function draw() {
  background(20, 20, 20, 25); // Leave trails like fading dust
  noStroke();

  for (let p of particles) {
    // Spin each particle slightly around center
    p.angle += p.speed;
    let rad = p.radius;
    p.x = centerX + rad * cos(p.angle);
    p.y = centerY + rad * sin(p.angle);

    // Draw the particle
    fill(255, 230, 200, p.alpha);
    circle(p.x, p.y, 3);

    // Slowly fade away
    if (fadeOut)
