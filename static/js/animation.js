import { getGamma } from './physics.js';
import { drawDigitalClock } from './clock.js';
import { drawSpaceship } from './spaceship.js';

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

        const paddingBetweenClocks = 200;
        const clockWidth = 200;
        const clockHeight = 60;
        const totalWidth = 2 * clockWidth + paddingBetweenClocks;
        const startX = (canvas.width - totalWidth) / 2;
        const position = canvas.height  / 10;

        const firstClockX = startX + clockWidth /2;
        const secondClcokx = firstClockX + clockWidth + paddingBetweenClocks;



        drawDigitalClock(ctx, firstClockX, position, clockWidth, clockHeight, realElapsed, 'Real Time');
        drawDigitalClock(ctx, secondClcokx, position, clockWidth, clockHeight, dilatedElapsed, 'Dilated Time');

        //SPACESHIP
        const spaceshipY = position + clockHeight + 100;
        const spaceshipWidth = 20;
        const spaceshipHeight = 10;

        drawSpaceship(ctx, canvas.width / 2, spaceshipY, spaceshipWidth, spaceshipHeight, gamma);
        requestAnimationFrame(animate);
    }

    animate();

}