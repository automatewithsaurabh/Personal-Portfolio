
// Antigravity Particle System
class ParticleSystem {
    constructor() {
        this.container = document.getElementById('particles');
        if (!this.container) return;

        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.container.appendChild(this.canvas);

        this.particles = [];
        // Colors inspired by Google Antigravity + Purple theme
        this.colors = ['#8b5cf6', '#6366f1', '#ec4899', '#facc15', '#ffffff', '#3b82f6'];
        this.mouse = { x: null, y: null, radius: 150 };

        this.resize();
        this.init();
        this.animate();

        window.addEventListener('resize', () => this.resize());
        document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        document.addEventListener('mouseleave', () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.init();
    }

    handleMouseMove(e) {
        this.mouse.x = e.clientX; // Ensure clientX is used for canvas relative to viewport
        this.mouse.y = e.clientY;
    }

    init() {
        this.particles = [];
        const numberOfParticles = (this.canvas.width * this.canvas.height) / 7000; // Adjust density

        for (let i = 0; i < numberOfParticles; i++) {
            const size = Math.random() * 2 + 1;
            const x = Math.random() * (this.canvas.width - size * 2) + size;
            const y = Math.random() * (this.canvas.height - size * 2) + size;
            const directionX = (Math.random() * 2) - 1;
            const directionY = (Math.random() * 2) - 1;
            const color = this.colors[Math.floor(Math.random() * this.colors.length)];

            this.particles.push(new Particle(x, y, directionX, directionY, size, color, this));
        }
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let i = 0; i < this.particles.length; i++) {
            this.particles[i].update();
        }
    }
}

class Particle {
    constructor(x, y, dx, dy, size, color, system) {
        this.x = x;
        this.y = y;
        this.dx = dx * 0.8;
        this.dy = dy * 0.8;
        this.size = size;
        this.color = color;
        this.baseX = x;
        this.baseY = y;
        this.system = system;
        this.density = (Math.random() * 20) + 1;

        // Antigravity drift
        this.angle = Math.random() * 360;
    }

    draw() {
        this.system.ctx.beginPath();
        this.system.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        this.system.ctx.fillStyle = this.color;
        this.system.ctx.fill();
    }

    update() {
        // Mouse Interaction (Repulsion)
        if (this.system.mouse.x != null) {
            let dx = this.system.mouse.x - this.x;
            let dy = this.system.mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            const maxDistance = this.system.mouse.radius;

            if (distance < maxDistance) {
                const forceDirectionX = dx / distance;
                const forceDirectionY = dy / distance;
                const force = (maxDistance - distance) / maxDistance;
                const directionX = forceDirectionX * force * this.density * 5; // Stronger repulsion
                const directionY = forceDirectionY * force * this.density * 5;
                this.x -= directionX;
                this.y -= directionY;
            } else {
                // Stronger return force for clearer "shape" if we had one, but for cloud, gradual return
                if (this.x !== this.baseX) {
                    let dx = this.x - this.baseX;
                    this.x -= dx / 50;
                }
                if (this.y !== this.baseY) {
                    let dy = this.y - this.baseY;
                    this.y -= dy / 50;
                }
            }
        }

        // Move
        this.x += this.dx;
        this.y += this.dy;

        // Bounce off edges
        if (this.x > this.system.canvas.width || this.x < 0) this.dx = -this.dx;
        if (this.y > this.system.canvas.height || this.y < 0) this.dy = -this.dy;

        this.draw();
    }
}

// Initialize
window.addEventListener('load', () => {
    new ParticleSystem();
});
