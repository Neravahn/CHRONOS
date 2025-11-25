export const massPosition = {
    x: 0,
    y: 0
};

let isDragging = false;
let canvasRef = null;

export function initMouse(canvas, startX, startY, getRadius){
    canvasRef = canvas;

    massPosition.x = startX;
    massPosition.y = startY;

    canvas.addEventListener('mousedown', (e) => {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const dx = mouseX - massPosition.x;
        const dy = mouseY - massPosition.y;

        if(Math.sqrt(dx * dx + dy * dy) <= getRadius()){
            isDragging = true;
        }
    });

    canvas.addEventListener('mousemove', (e) => {
        if (!isDragging){
            return;
        }

        const rect = canvas.getBoundingClientRect();
        massPosition.x = e.clientX - rect.left;
        massPosition.y = e.clientY - rect.top;
    });

    canvas.addEventListener('mouseup', () => {
        isDragging = false;
    });

    canvas.addEventListener('mouseleave', () => {
        isDragging = false;
    });
}