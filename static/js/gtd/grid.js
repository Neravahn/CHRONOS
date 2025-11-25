export function drawGrid(ctx, canvas, gridSize, masses = []) {
    ctx.save();

    ctx.strokeStyle = 'white';
    ctx.lineWidth = 0.2;

    const maxWarp = 50;
    const fallOff = 5000;

    const width = canvas.width;
    const height = canvas.height;

    const columns = Math.ceil(width / gridSize);
    const rows = Math.ceil(height / gridSize);

    const xOffset = (width % gridSize) / 2;
    const yOffset = (height % gridSize) / 2;


    //VERTICAL GRIDS
    for (let i = -columns; i < columns; i++) {
        const x0 = i * gridSize + xOffset + width / 2;
        ctx.beginPath();
        for (let y = 0; y <= height; y++) {
            let x = x0;

            //WARP FOR EACH MASS
            for (let i = 0; i < masses.length; i++) {
                let m = masses[i];
                const dx = x - m.x;
                const dy = y - m.y;
                const distSq = dx * dx + dy * dy;
                const strength = Math.min(maxWarp, m.radius * Math.exp(-distSq / fallOff));
                x -= dx / Math.sqrt(distSq + 0.0001) * strength;
            }

            if(y === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.stroke();
    }

    //HORIZONTAL LINES
    for (let j = -rows; j < rows; j++) {
        const y0 = j * gridSize + yOffset + height / 2;
        ctx.beginPath();
        for (let x = 0; x<= width; x++){
            let y = y0;
            
            for(let h = 0; h < masses.length; h ++){
                let m = masses[h];

                const dx = x- m.x;
                const dy = y - m.y;
                const distSq = dx * dx + dy * dy;
                const strength = Math.min(maxWarp, m.radius * Math.exp(-distSq / fallOff));
                y -= dy / Math.sqrt(distSq + 0.001) * strength;
            }

            if (x === 0){
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }

        ctx.stroke();
    }

    ctx.restore();
}