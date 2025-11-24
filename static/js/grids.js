export function drawBendingGrids(ctx, canvas, velocity, shipx, shipy, direction = 'left') {
    const cols = 10;
    const rows = 10;

    const speed = velocity / 100;
    const gamma = Math.max(1 /  Math.sqrt( 1- speed * speed), 1);

    ctx.strokeStyle = 'white';
    ctx.lineWidth = 1;


    const bendFactor = speed * 300;

    for (let i = 0; i <= cols; i ++) {
        ctx.beginPath();
        for (let j= 0; j<=rows; j++) {
            let x = (canvas.width / cols) * i;
            let y = (canvas.height / rows) * j;

            let distancex = x- shipx;
            let distancey = y - shipy;
            
            if (direction === 'left'){
                distancex -= bendFactor *Math.exp(-distancey / canvas.height);
            } else if (direction === 'right') {
                distancex += bendFactor * Math.exp (-distancey / canvas.height);
            }


            x = shipx + distancex;
            y = shipy + distancey;

            if (j=== 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }

        ctx.stroke();
    }

    for (let j = 0; j<= rows; j++) {
        ctx.beginPath();
        for(let i = 0; i <= cols; i++){
            let x = (canvas.width / cols) * i;
            let y = (canvas.height / rows) * j;

            let distancex = x - shipx;
            let distancey = y - shipy;


            if (direction === 'left') {
                distancex -= bendFactor * Math.exp(-distancey / canvas.height);
            } else if (direction === 'right') {
                distancex += bendFactor * Math.exp(- distancey / canvas.height);
            }
            
            x = shipx + distancex;
            y = shipy + distancey

            if ( i===0 ) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }

        ctx.stroke();
    }


}