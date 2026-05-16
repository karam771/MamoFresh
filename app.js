const canvas = document.getElementById("scroll-animation");
if (canvas) {
    const context = canvas.getContext("2d");

const frameCount = 69;
const currentFrame = index => (
  `frames/ezgif-frame-${index.toString().padStart(3, '0')}.jpg`
);

const images = [];
const airbnb = {
  frame: 0
};

// Preload images
for (let i = 1; i <= frameCount; i++) {
  const img = new Image();
  img.src = currentFrame(i);
  images.push(img);
}

// Ensure first image is loaded before drawing
images[0].onload = render;

function render() {
  const img = images[airbnb.frame];
  if (!img) return;
  
  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;
  const imgWidth = img.width;
  const imgHeight = img.height;
  
  const ratio = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
  const newWidth = imgWidth * ratio;
  const newHeight = imgHeight * ratio;
  const x = (canvasWidth - newWidth) / 2;
  const y = (canvasHeight - newHeight) / 2;
  
  context.clearRect(0, 0, canvasWidth, canvasHeight);
  context.drawImage(img, x, y, newWidth, newHeight);
}

window.addEventListener("scroll", () => {  
  const scrollTop = html.scrollTop;
  const maxScrollTop = html.scrollHeight - window.innerHeight;
  const scrollFraction = scrollTop / maxScrollTop;
  const frameIndex = Math.min(
    frameCount - 1,
    Math.ceil(scrollFraction * frameCount)
  );
  
  // Only update the hero animation within the hero section height
  // Since #hero is 300vh, we want the animation to finish around 100-150vh
  const heroHeight = document.getElementById('hero').offsetHeight;
  const heroScrollFraction = Math.min(1, window.scrollY / (heroHeight - window.innerHeight));
  const heroFrameIndex = Math.min(
    frameCount - 1,
    Math.floor(heroScrollFraction * frameCount)
  );

  requestAnimationFrame(() => {
    airbnb.frame = heroFrameIndex;
    render();
  });
});

// Resize handler
const html = document.documentElement;
function updateCanvasSize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  render();
}

window.addEventListener('resize', updateCanvasSize);
updateCanvasSize();

// Header Scroll Effect
const header = document.getElementById('main-header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Initial Render
images[0].onload = () => {
    render();
};
}
