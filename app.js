const canvas = document.getElementById("scroll-animation");
if (canvas) {
    const context = canvas.getContext("2d");
    const heroContent = document.querySelector('.hero-content');

    const frameCount = 55; // Reduced from 69 for a snappier ending
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

    function render() {
        const img = images[airbnb.frame];
        if (!img || !img.complete) return;
        
        const dpr = window.devicePixelRatio || 1;
        const canvasWidth = canvas.clientWidth * dpr;
        const canvasHeight = canvas.clientHeight * dpr;
        
        if (canvas.width !== canvasWidth || canvas.height !== canvasHeight) {
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;
        }

        const imgWidth = img.width;
        const imgHeight = img.height;
        
        const ratio = Math.max(canvas.width / imgWidth, canvas.height / imgHeight);
        const newWidth = imgWidth * ratio;
        const newHeight = imgHeight * ratio;
        const x = (canvas.width - newWidth) / 2;
        const y = (canvas.height - newHeight) / 2;
        
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = 'high';
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, x, y, newWidth, newHeight);
    }

    window.addEventListener("scroll", () => {  
        const scrollTop = window.scrollY;
        const heroHeight = document.getElementById('hero').offsetHeight;
        const windowHeight = window.innerHeight;
        
        // Hero Scroll Progress
        const progress = Math.min(1, scrollTop / (heroHeight - windowHeight));
        
        // Animation Sync
        const frameIndex = Math.min(
            frameCount - 1,
            Math.floor(progress * frameCount)
        );

        requestAnimationFrame(() => {
            // Text Sync (Fade out and scale up slightly as we scroll down)
            const textProgress = Math.min(1, progress / 0.4);
            if (heroContent) {
                heroContent.style.opacity = 1 - textProgress;
                heroContent.style.transform = `translate3d(-50%, calc(-50% - ${textProgress * 50}px), 0) scale(${1 + textProgress * 0.1})`;
            }
            
            airbnb.frame = frameIndex;
            render();
        });
    });

    // Resize handler
    function updateCanvasSize() {
        render();
    }

    window.addEventListener('resize', updateCanvasSize);
    
    // Initial Render
    images[0].onload = () => {
        render();
    };
    
    // Fallback if already loaded
    if (images[0].complete) render();
}

// Header Scroll Effect
const header = document.getElementById('main-header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});
