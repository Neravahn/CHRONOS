import { drawGrid } from "./grid.js";
import { drawMass } from "./render.js";
import { initMouse, massPosition } from "./mouse.js";


//VARIABLES
let showGrid = true;
let massValue = 10;
const massSlider = document.getElementById('mass')
const massRangeText = document.getElementById('mass_range');





//CANVAS SETUP
const canvas = document.getElementById('gtd_canvas');
const ctx = canvas.getContext('2d');
function resizeCanvas() {
    canvas.width = 1425;
    canvas.height = 950;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);
initMouse(canvas, canvas.width / 2, canvas.height / 2, () => massValue + 10);



//BUTTON EVENTS
document.getElementById('toggle_grid').addEventListener('click', () => {
    showGrid = !showGrid
})
massSlider.addEventListener('input', () => {
    massValue = Number(massSlider.value) || 10;
    massRangeText.textContent = massValue + ' UNITS'
})





//ANIMATION LOOP
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //GRID
    if (showGrid) {
        drawGrid(ctx, canvas, 40);
    }

    //OBJECT
    let radius = massValue + 10;
    drawMass(ctx, massPosition.x, massPosition.y, radius);

    requestAnimationFrame(animate);
}

animate();