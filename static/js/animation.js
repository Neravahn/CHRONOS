import { getGamma } from './physics.js';
import { drawDigitalClock } from './clock.js';
import { drawSpaceship } from './movingObject.js';
import { initStars, drawStars } from './starfield.js'
import { camera, setupCameraControls, applyCameraTransform } from './camera.js'
import { drawBendingGrids } from './grids.js';

export function startAnimation(canvasID, getVelocity) {
    const canvas = document.getElementById(canvasID);
    const ctx = canvas.getContext('2d');
    canvas.width = 1425;
    canvas.height = 950;

    let startTime = Date.now();

    initStars(500, canvas.width, canvas.height);
    setupCameraControls(canvas);

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const velocity = getVelocity();
        const gamma = Math.max(getGamma(velocity), 1);
        let now = Date.now();
        let realElapsed = now - startTime;
        let dilatedElapsed = realElapsed / gamma;

        ctx.save();
        applyCameraTransform(ctx);

        //STARS
        drawStars(ctx, canvas.width, canvas.height, velocity);


        const paddingBetweenClocks = 200;
        const clockWidth = 200;
        const clockHeight = 60;
        const totalWidth = 2 * clockWidth + paddingBetweenClocks;
        const startX = (canvas.width - totalWidth) / 2;
        const position = canvas.height / 10;


        const shipx = canvas.width / 2;
        const shipy = canvas.height / 2 + 200;

        //SPACESHIP
        const spaceshipWidth = 1000;
        const spaceshipHeight = 200;

        const spaceshipX = canvas.width / 2;
        const spaceshipY = position + clockHeight + 400 + spaceshipHeight / 2;
        drawBendingGrids(ctx, canvas, velocity, spaceshipX, spaceshipY, 'left');
        drawSpaceship(ctx, canvas.width / 2, position + clockHeight + 400, spaceshipWidth, spaceshipHeight, gamma);
        ctx.restore();



        //CLOCK AREA
        const firstClockX = startX + clockWidth / 2;
        const secondClcokx = firstClockX + clockWidth + paddingBetweenClocks;
        drawDigitalClock(ctx, firstClockX, position, clockWidth, clockHeight, realElapsed, 'Real Time');
        drawDigitalClock(ctx, secondClcokx, position, clockWidth, clockHeight, dilatedElapsed, 'Dilated Time');

        requestAnimationFrame(animate);

    }

    animate();

}