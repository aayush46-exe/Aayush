document.addEventListener("DOMContentLoaded", function () {

const canvas = document.getElementById('scene');
const ctx = canvas.getContext('2d');
const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const successScreen = document.getElementById('successScreen');

let width, height;
let particles = [];
const PARTICLE_COUNT = 1500;

function init() {
    resize();
    particles = [];
    createParticles();
    animate();
}

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        // Heart shape formula
        const t = Math.random() * Math.PI * 2;

        this.targetX = 16 * Math.pow(Math.sin(t), 3);
        this.targetY = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));

        this.x = 0;
        this.y = 0;
        this.size = Math.random() * 2 + 1;
        this.speed = Math.random() * 0.05 + 0.01;
    }

    update() {
        this.x += (this.targetX * 15 - this.x) * this.speed;
        this.y += (this.targetY * 15 - this.y) * this.speed;
    }

    draw() {
        ctx.fillStyle = "#ff2d55";
        ctx.beginPath();
        ctx.arc(width / 2 + this.x, height / 2 + this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function createParticles() {
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle());
    }
}

function animate() {
    ctx.fillStyle = "rgba(5,5,5,0.1)";
    ctx.fillRect(0, 0, width, height);

    particles.forEach(p => {
        p.update();
        p.draw();
    });

    requestAnimationFrame(animate);
}

// No button dodging
noBtn.addEventListener("mouseover", () => {
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);

    noBtn.style.position = "absolute";
    noBtn.style.left = x + "px";
    noBtn.style.top = y + "px";
});

// Yes button click
yesBtn.addEventListener("click", () => {
    successScreen.style.display = "flex";
});

window.addEventListener("resize", resize);

init();

});