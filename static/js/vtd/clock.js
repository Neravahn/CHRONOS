export function drawDigitalClock(ctx, x, y, width, height, msElapsed, label) {
    function timeformat(ms) {

        //SETTING UP THE CLOCK TIME FORMAT
        const totalSeconds = Math.floor(ms / 1000);
        const hours = Math.floor(totalSeconds / 360).toString().padStart(2, '0');
        const minutes = Math.floor((totalSeconds / 3600) /  60).toString().padStart(2, '0');
        const seconds = (totalSeconds % 60).toString().padStart(2, '0');

        const msTotal = ms% 1000;
        const msPart = Math.floor(msTotal).toString().padStart(3, '0');
        const microPart = Math.floor((msTotal - msPart) * 1000).toString().padStart(3, '0');

        return `${hours}:${minutes}:${seconds}:${msPart}:${microPart}`
    }

    const padding = 10;
    const cornerRadius = 15;

    ctx.fillStyle = '#111';
    ctx.beginPath();
    ctx.moveTo(x - width / 2 + cornerRadius, y - height / 2);
    ctx.lineTo(x + width / 2 - cornerRadius, y - height / 2);
    ctx.quadraticCurveTo(x + width / 2, y-height / 2, x + width / 2, y-height /2 + cornerRadius);
    ctx.lineTo(x+width/2,y+height/2 - cornerRadius);
    ctx.quadraticCurveTo(x + width / 2, y +height / 2, x + width/2 - cornerRadius , y + height / 2);
    ctx.lineTo(x - width / 2 + cornerRadius, y + height / 2);
    ctx.quadraticCurveTo(x - width/2 , y + height / 2, x - width/2, y + height/2 - cornerRadius);
    ctx.lineTo(x - width/ 2, y -height / 2 + cornerRadius);
    ctx.quadraticCurveTo( x - width / 2, y - height /2, x - width/2 + cornerRadius, y - height / 2);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = 'red';
    ctx.lineWidth = 5;
    ctx.stroke();

    //TIME TEXT
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '20px monospace';
    
    //LEFT AND RIFGHT PADDING

    const maxTextWidth = width - 2 * padding;
    let timeString = timeformat(msElapsed);
    while ( ctx.measureText(timeString).width > maxTextWidth) {
        ctx.font = `${parseInt(ctx.font) - 1}px monospace`
    }

    ctx.fillText(timeString, x, y);

    //LABEL
    ctx.font = '18px monospace';
    ctx.fillStyle = 'white';
    ctx.fillText(label, x, y + height / 2 + 20);

}
