import { masses } from './render.js'

export function drawLight(ctx, canvas) {

    const rays = 20;
    const startX = -50;
    const raySpeed = 14;
    const G = 50;
    const dt = 1;
    const maxSteps = 900;

    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);  //
    ctx.globalCompositeOperation = 'lighter';

    ctx.strokeStyle = 'rgba(255,220, 120, 0.05)';
    ctx.lineWidth = 5;
    for (let i = 0; i < rays; i++) {
        const y = (i / rays) * canvas.height;
        traceRay(ctx, startX, y, false);
    }


    ctx.strokeStyle = 'rgba(255, 187, 0, 0.25)';
    ctx.lineWidth = 1;
    for (let i = 0; i < rays; i++) {
        const y = (i / rays) * canvas.height;
        traceRay(ctx, startX, y, true);
    }

    ctx.restore();

    function traceRay(ctx, sx, sy, sharp) {
        let x = sx;
        let y = sy;

        let vx = raySpeed;
        let vy = 0;


        ctx.beginPath();
        ctx.moveTo(x, y);

        for (let step = 0; step < maxSteps; step++) {

            
            if (x > canvas.width + 40 || y < -40 || y > canvas.height + 40) {
                break;
            }
            let ax = 0, ay = 0;

            for (let i = 0; i < masses.length; i++) {
                const m = masses[i];
                const dx = m.x - x;
                const dy = m.y - y;
                const r2 = dx * dx + dy * dy;
                const r = Math.sqrt(r2);

                if (r < m.radius *2) {
                    ctx.lineTo(x, y);
                    return;
                }

                const a = G * (m.radius * 8) / (r2 + 10);
                ax += a * (dx / r);
                ay += a * (dy / r);
            }

            vx += ax * dt;
            vy += ay * dt;


            const vmag = Math.sqrt(vx * vx + vy * vy) || 1;
            vx = (vx / vmag) * raySpeed;
            vy = (vy / vmag) * raySpeed;


            x += vx * dt;
            y += vy * dt;

            if (!isFinite(x) || !isFinite(y)) {
                ctx.stroke();
                return;
            }
            ctx.lineTo(x, y);
        }

        ctx.stroke();
    }
}

