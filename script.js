document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('star-canvas');
    const ctx = canvas.getContext('2d');

    let width, height;
    let stars = [];

    // Configuration for the star field
    const config = {
        starCount: 150, // Number of stars
        speed: 0.2,     // Movement speed
        baseRadius: 1.2 // Size of stars
    };

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }

    class Star {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.z = Math.random() * 2 + 0.5; // Depth factor
            this.alpha = Math.random() * 0.5 + 0.1; // Opacity
            this.radius = Math.random() * config.baseRadius;
        }

        update() {
            // Move star slowly upwards
            this.y -= config.speed / this.z;
            
            // If star goes off screen, reset to bottom
            if (this.y < 0) {
                this.y = height;
                this.x = Math.random() * width;
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
            ctx.fill();
        }
    }

    function init() {
        resize();
        for (let i = 0; i < config.starCount; i++) {
            stars.push(new Star());
        }
        animate();
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        stars.forEach(star => {
            star.update();
            star.draw();
        });
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resize);
    init();
});