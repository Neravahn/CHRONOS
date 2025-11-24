export function drawGrid(ctx, canvas, velocity, shipx, shipy, direction = 'right') {
    const centerX = canvas.width / 2;
    const startY = 0;
    const endY = canvas.height;



    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 1;
    ctx.beginPath();


    ctx.moveTo(centerX, startY);

    ctx.lineTo(centerX, endY);


    ctx.stroke();


}