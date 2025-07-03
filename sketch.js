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
      size: random(2, 4),
      jitterStrength: random(0.2, 1),
      shimmerOffset: random(TWO_PI),
    });
  }

  setTimeout(() => fadeOut = true, 3000);
}

function draw() {
  // Faintly persist the past
  fill(20, 20, 20, 25);
  rect(0, 0, width, height);

  noStroke();

  for (let p of particles) {
    // Add shimmer effect as alpha fades
    let shimmer = map(sin(frameCount * 0.1 + p.shimmerOffset), -1, 1, 0.9, 1.1);

    // Jitter slightly on decay
    let jitterX = 0;
    let jitterY = 0;
    if (fadeOut && p.alpha < 180) {
      jitterX = random(-p.jitterStrength, p.jitterStrength);
      jitterY = random(-p.jitterStrength, p.jitterStrength);
    }

    // Convert polar to cartesian
    let x = centerX + p.radius * cos(p.angle) + jitterX;
    let y = centerY + p.radius * sin(p.angle) + jitterY;

    fill(255, 230, 200, p.alpha * shimmer);
    circle(x, y, p.size);

    // Animate decay
    if (fadeOut) {
      p.radius -= 0.2; // spiral inward
      p.alpha -= p.decayRate;
      p.alpha = max(p.alpha, 0);
    }

    p.angle += p.speed;
  }
}

document.getElementById("save-btn").addEventListener("click", () => {
  saveCanvas('memento-mori', 'png');
});
