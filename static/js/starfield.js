export const stars = [];

export function initStars(count, canvaswidth, canvasheight) {
    for (let i = 0; i < count; i++) {
        stars.push({
            x: Math.random() * canvaswidth,
            y: Math.random() * canvasheight,
            size: 0.5,
            speed: Math.random() * 0.5 + 0.2,
            depth: Math.random() * 0.9 + 0.1
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

        if (s.x > canvaswidth) {
            s.x = 0;
            s.y = Math.random() * canvasheight;
        }
    }
}