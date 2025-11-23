export function drawSpaceship(ctx, x, y, width, height, gamma){
    const contractedWidth = width / gamma;
    ctx.fillStyle = "#00ffdd";
    ctx.beginPath();
    ctx.moveTo(x - contractedWidth / 2, y- height / 2);
    ctx.lineTo(x + contractedWidth / 2, y - height / 2);
    ctx.lineTo(x + contractedWidth / 2, y + height / 2);
    ctx.lineTo(x - contractedWidth / 2, y + height / 2);
    ctx.closePath();
    ctx.fill();

}