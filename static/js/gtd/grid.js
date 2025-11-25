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


    function rippleEffect(m, px, py) {
        if (!m.wave) return 0;
        const dx = px - m.x;
        const dy = py - m.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        return m.wave.strength * Math.sin((dist - m.wave.age) / 20) * Math.exp(-dist / 100);
    }


    //VERTICAL LINES
    for (let i = -columns; i < columns; i++) {
        const x0 = i * gridSize + xOffset + width / 2;
        ctx.beginPath();

        for (let y = 0; y <= height; y += 1) {
            let x = x0;


            for (let m of masses) {
                const dx = x - m.x;
                const dy = y - m.y;
                const distSq = dx * dx + dy * dy;


                const warp = Math.min(maxWarp, m.radius * Math.exp(-distSq / fallOff));
                x -= dx / Math.sqrt(distSq + 0.001) * warp;


                x += dx / Math.sqrt(distSq + 0.001) * rippleEffect(m, x, y);
            }

            if (y === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }

        ctx.stroke();
    }

    //HORIZONTAL LINES
    for (let j = -rows; j < rows; j++) {
        const y0 = j * gridSize + yOffset + height / 2;
        ctx.beginPath();

        for (let x = 0; x <= width; x += 1) {
            let y = y0;

            for (let m of masses) {
                const dx = x - m.x;
                const dy = y - m.y;
                const distSq = dx * dx + dy * dy;


                const warp = Math.min(maxWarp, m.radius * Math.exp(-distSq / fallOff));
                y -= dy / Math.sqrt(distSq + 0.001) * warp;


                y += dy / Math.sqrt(distSq + 0.001) * rippleEffect(m, x, y);
            }

            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }

        ctx.stroke();
    }

    ctx.restore();


    for (let m of masses) {
        if (m.wave) {
            m.wave.age += m.wave.speed;
            m.wave.strength *= 0.98;
            if (m.wave.strength < 0.5) m.wave = null;
        }
    }
}
