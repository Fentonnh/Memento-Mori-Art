let particles = [];
let numParticles = 600;
let centerX, centerY;
let fadeOut = false;

function setup() {
  let canvas = createCanvas(600, 600);
  canvas.parent("canvas-container");
  background(20);
  angleMode(RADIANS);

  centerX = width / 2;
  centerY = height / 2;

  for (let i = 0; i < numParticles; i++) {
    let angle = random(TWO_PI);
    let radius = randomGaussian() * 80 + 150;
    particles.push({
      angle: angle,
      radius: radius,
      speed: random(0.001, 0.01),
      alpha: 255,
      decayRate: random(0.3, 1.2),
      size: random(2, 4)
    });
  }

  setTimeout(() => fadeOut = true, 3000);
}

function draw() {
  background(20, 20, 20, 40);

  noStroke();

  for (let p of particles) {
    // Convert polar to cartesian
    let x = centerX + p.radius * cos(p.angle);
    let y = centerY + p.radius * sin(p.angle);

    fill(255, 230, 200, p.alpha);
    circle(x, y, p.size);

    // Animate
    if (fadeOut) {
      p.radius -= 0.2;  // Spiral inward
      p.alpha -= p.decayRate;
      p.alpha = max(p.alpha, 0);
    }

    p.angle += p.speed;
  }
}

document.getElementById("save-btn").addEventListener("click", () => {
  saveCanvas('memento-mori', 'png');
});
