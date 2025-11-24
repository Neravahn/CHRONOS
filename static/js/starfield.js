import { camera } from "./camera.js";

export const stars = [];

const world = {
    left: - 2000,
    right: 2500,
    top: -2000,
    bottom: 2500
};

export function initStars(count, canvaswidth, canvasheight) {
    for (let i = 0; i < count; i++) {
        stars.push({
            x: Math.random() * (world.right - world.left) + world.left,
            y: Math.random() * (world.bottom - world.top) + world.top,
            size: 1,
            speed:Math.random() * 0.5 + 0.2,
            depth: Math.random() * 0.9 + 1
        });
    }
}

export function drawStars(ctx, canvaswidth, canvasheight, velocity) {
    ctx.fillStyle = 'white';
    const baseSpeed = Math.log10(1 + velocity * 9) * 20;

    for (let i = 0; i < stars.length; i++) {
        let s = stars[i];
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * s.depth, 0, Math.PI * 2);
        ctx.fill();

        s.x += s.speed * baseSpeed;

        if (s.x > world.right) {
            s.x = world.left;
        }

        if (s.x < world.left) {
            s.x = world.right;
        }
    }
}