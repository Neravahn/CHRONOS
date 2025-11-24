import { drawGrid } from "./grid.js";


//VARIABLES
let showGrid = true;


//CANVAS SETUP
const canvas = document.getElementById('gtd_canvas');
const ctx = canvas.getContext('2d');
function resizeCanvas() {
    canvas.width = 1425;
    canvas.height = 950;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

//BUTTON EVENTS
document.getElementById('toggle_grid').addEventListener('click', () => {
    showGrid = !showGrid
})

//ANIMATION LOOP
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (showGrid) {
        drawGrid(ctx, canvas, 40);
    }
    requestAnimationFrame(animate);
}

animate();