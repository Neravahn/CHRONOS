export const rocketImg = new Image();
rocketImg.src = "static/images/rocket.png";

export function drawSpaceship (ctx, x, y, width, height, gamma) {
    if (!rocketImg.complete) {
        return;
    }

    const contractedWidth = width / gamma;


    ctx.save();
    ctx.translate(x, y);


    ctx.drawImage(
        rocketImg,
        -contractedWidth / 2,
        -height /2,
        contractedWidth,
        height,
    );

    ctx.restore();
}