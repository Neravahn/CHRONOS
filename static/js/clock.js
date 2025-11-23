export function drawDigitalClock(ctx, x, y, width, height, msElapsed, label) {
    function timeformat(ms) {

        //SETTING UP THE CLOCK TIME FORMAT
        let totalseconds = Math.floor(ms / 1000);
        let miliseconds = (ms % 1000).toString().padStart(3, '0');
        let hours = Math.floor(totalseconds / 3600).toString().padStart(2, '0');
        let minutes = Math.floor((totalseconds % 3600) / 60).toString().padStart(2, '0');
        let seconds = (totalseconds % 60).toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}:${miliseconds}`;
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
