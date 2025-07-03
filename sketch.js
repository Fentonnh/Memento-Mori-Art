let particles = [];
let numParticles = 600;
let decayRate = 0.005;
let fadeOut = false;

function setup() {
  let canvas = createCanvas(600, 600);
  canvas.parent("canvas-container");
  background(20);

  angleMode(DEGREES);
  for (let i = 0; i < numParticles; i++) {
    let angle = random(360);
    let radius = randomGaussian() * 100 + 150;
    let x = width / 2 + radius * cos(angle);
    let y = height / 2 + radius * sin(angle);
    let col = color(255, 230, 200, 255);
    particles.push({ x, y, alpha: 255, col });
  }

  setTimeout(() => {
    fadeOut = true;
  }, 4000); // Wait 4 seconds before starting to decay
}

function draw() {
  noStroke();
  background(20, 20, 20, 20); // slow background blending
  for (let p of particles) {
    fill(p.col.levels[0], p.col.levels[1], p.col.levels[2], p.alpha);
    circle(p.x, p.y, 4);
    if (fadeOut && p.alpha > 0) {
      p.alpha -= decayRate * 255;
    }
  }
}

function mousePressed() {
  // Optional: accelerate decay with mouse click
  decayRate += 0.002;
}

document.getElementById("save-btn").addEventListener("click", () => {
  saveCanvas('memento-mori', 'png');
});
