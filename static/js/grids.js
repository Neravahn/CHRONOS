export function drawGrid(ctx, canvas, velocity, shipx, shipy, direction = 'right') {
    const cols = 30;

    const speed = velocity / 100;
    const maxCurve = 400 * speed; 
    const maxCompression = 400 * speed;

    ctx.strokeStyle = 'white';
    ctx.lineWidth = 0.5;

    for (let i = 0; i <= cols; i++) {
        const xRest = (canvas.width / cols) * i;

        let relX = xRest - shipx;
        let distortion = maxCompression * Math.exp(-Math.abs(relX) / canvas.width);
        if (direction === 'left') relX -= distortion;
        else relX += distortion;

        const drawX = shipx + relX;

        const curveOffset = maxCurve * Math.exp(-Math.abs(relX) / canvas.width);
        const controlX = drawX + (direction === 'left' ? -curveOffset : curveOffset);

        ctx.beginPath();
        ctx.moveTo(drawX, 0);
        ctx.quadraticCurveTo(controlX, shipy, drawX, canvas.height);
        ctx.stroke();
    }
}
