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

    ctx.fillStyle = '#111';
    ctx.fillRect(x - width / 2, y - height / 2, width, height);


    ctx.strokeStyle = 'white';
    ctx.lineWidth = 3;
    ctx.strokeRect(x - width / 2, y - height / 2, width, height);

    //TIME TEXT
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '20px monospace';
    ctx.fillText(timeformat(msElapsed), x, y);


    //LABEL
    ctx.fillStyle = 'white';
    ctx.fillText(label , x, y + height / 2 + 20);

}
