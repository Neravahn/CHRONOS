export const rocketImg = new Image();
rocketImg.src = "static/images/rocket.png";

export function drawSpaceship (ctx, x, y, width, height, gamma) {
    if (!rocketImg.complete) {
        return;
    }

    const contraction = 1 / Math.sqrt(gamma);
    const shipWidth = width * contraction;


    //TERREL ROTARION


    ctx.save();
    ctx.translate(x, y);


    ctx.drawImage(
        rocketImg,
        -shipWidth / 2,
        -height / 2,
        shipWidth,
        height
    );
    

    ctx.restore();
}