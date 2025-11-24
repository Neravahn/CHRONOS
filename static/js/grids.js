export function drawGrid(ctx, canvas, velocity, shipx, shipy, direction = 'right') {
    const centerX = canvas.width / 2;
    const startY = 0;
    const endY = canvas.height;
    const lineCenterY = shipy; // pivot for all lines

    const lines = [
        -600, -400, -200, 0,  // LEFT to CENTER
        200, 400, 600,           // CENTER to RIGHT
    ];

    //MANUALLY DEFINED BENDS [EXPONENTIAL]
    const bends = [
        -150,
        -86.7,
        -50.1,
        -28.9,
        -16.7,
        -9.7,
        -5.6
    ]

    for (let i = 0; i < lines.length; i++) {
        const nextLine = lines[i];
        const drawLine = centerX + nextLine;

        const bendAmount = bends[i] * (velocity / 10);

        ctx.strokeStyle = 'white';
        ctx.lineWidth = 0.2;
        ctx.beginPath();


        const topX = drawLine + bendAmount;
        const topY = startY;

        const pivotX = drawLine;
        const pivotY = lineCenterY;


        const bottomX = drawLine + bendAmount;
        const bottomY = endY;
        ctx.moveTo(topX, topY);
        ctx.lineTo(pivotX, pivotY);
        ctx.lineTo(bottomX, bottomY);

        ctx.stroke();
    }
}
