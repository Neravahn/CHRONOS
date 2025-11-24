export function drawGrid(ctx, canvas, gridSize){
    ctx.save();

    ctx.strokeStyle = 'white';
    ctx.lineWidth = 0.2;


    const width = canvas.width;
    const height = canvas.height;

    const columns  = Math.ceil(width / gridSize);
    const rows = Math.ceil(height / gridSize);

    const xOffset = (width % gridSize) / 2;
    const yOffset = (height % gridSize) / 2;


    //VERTICAL GRIDS
    for(let i = -columns; i < columns; i++) {
        const x = i * gridSize + xOffset + width / 2;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
    }

    //HORIZONTAL LINES
    for (let j = -rows; j < rows; j++) {
        const y = j * gridSize + yOffset + height / 2;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
    }

    ctx.restore();
}