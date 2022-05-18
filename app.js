//window.addEventListener("contextmenu",e => e.preventDefault())

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

// VARIABLES
const angleVelocity = fxrand() + 1;
const cosAddition = Math.floor(50 * fxrand()) + 1;

const particleSize = 10;
let angle = 0;
let colorScheme;
// VARIABLES

function resizeCanvas(canvas, w, h){
  canvas.width = w || window.innerWidth;
  canvas.height = h || window.innerHeight;
}
resizeCanvas(canvas);

function clearCanvas(){
  context.clearRect(0, 0, canvas.width, canvas.height);
}

const imageData = new Image();

function choseImage(){
  const c = fxrand();
  if(c > 0.6){
    imageData.src = river;
    colorScheme = 'river';
    // console.log('river');
    imageData.addEventListener('load', () => {load()})
    return;
  }
  if(c > 0.3){
    imageData.src = desert;
    colorScheme = 'desert';
    // console.log('desert');
        imageData.addEventListener('load', () => {load()})
    return;
  }
  if(c > 0){
    imageData.src = island;
    colorScheme = 'island';
    // console.log('island');
        imageData.addEventListener('load', () => {load()})
    return;
  }

}

function captureParticle(x, y, particleSize){
  return context.getImageData(x, y, particleSize, particleSize);
}

function createParticleArray(particleSize){
  const columns = Math.floor(canvas.width / particleSize);
  const rows = Math.floor(canvas.height / particleSize);
  const particles = [];
  for(let c = 0; c <= columns; c++){
    const x = c * particleSize;
    const y = Math.floor(rows * fxrand()) * particleSize;
    const cp = captureParticle(x, y, particleSize);
    particles.push({x, y, cp});
  }
  return particles;
}

function drawParticles(particleArray){
  particleArray.forEach(e => {
    context.putImageData(e.cp, e.x, e.y);
  });
}

function updateParticles(particleArray){
  particleArray.forEach(e => {
    e.y += fxrand();
    e.x += Math.cos(angle) * cosAddition;
    angle += angleVelocity;
  });
}

function checkParticles(particleArray){
  particleArray.forEach(e => {
    e.y > canvas.height ? e.y = 0 : null;
  })
}

choseImage();


function load(){
  context.drawImage(imageData, 0, 0, canvas.width, canvas.height);
  const particleArray = createParticleArray(particleSize);
  clearCanvas();
    function loop(){
      requestAnimationFrame(loop);
        checkParticles(particleArray);
        drawParticles(particleArray);
        updateParticles(particleArray);
    }
  loop();
}

const aVout = angleVelocity.toFixed(2);

window.$fxhashFeatures = {
  "Color Scheme": colorScheme,
  "Cosine Addition": cosAddition,
  "Angular Velocity": aVout
  // here define the token features
}
