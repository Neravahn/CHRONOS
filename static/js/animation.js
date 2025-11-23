import { getGamma } from './physics.js';
import { drawDigitalClock } from './clock.js';

export function startAnimation(canvasID, getVelocity) {
    const canvas = document.getElementById(canvasID);
    const ctx = canvas.getContext('2d');
    canvas.width = 1425;
    canvas.height = 950;

    let startTime = Date.now();

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const velocity = getVelocity();
        const gamma = Math.max(getGamma(velocity), 1);;

        let now = Date.now();
        let realElapsed = now - startTime;

        let dilatedElapsed = realElapsed / gamma;


        drawDigitalClock(ctx, 150, 100, 200, 60, realElapsed, 'Real Time');
        drawDigitalClock(ctx, 450, 100, 200, 60, dilatedElapsed, 'Dilated Time');

        requestAnimationFrame(animate);
    }

    animate();

}