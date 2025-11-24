export function drawSpaceship(ctx, x, y, width, height, speed, time) {

    const wobble = Math.sin(time * 0.05) * 2;
    const shipy = y + wobble ;

    const glowStrength = speed * 10;
    const grad = ctx.createRadialGradient(
        x + width / 2 + glowStrength / 2, shipy, 1,
        x + width / 2, shipy, glowStrength
    );
    grad.addColorStop(0, 'rgba(146, 194, 245, 0.8)');
    grad.addColorStop(1, 'rgba(150, 200, 255, 0)');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x + width / 2, shipy, glowStrength, 0, Math.PI * 2);
    ctx.fill();


    ctx.fillStyle = '#E0E0E0';
    ctx.beginPath();
    ctx.moveTo(x - width / 2, shipy);
    ctx.quadraticCurveTo(
        x, shipy - height / 2,
        x + width / 2, shipy - height / 2 + 5
    );

    ctx.lineTo(x + width / 2, shipy + height / 2 - 5);
    ctx.quadraticCurveTo(
        x, shipy + height / 2,
        x - width / 2, shipy
    )
    ctx.fill();
}
