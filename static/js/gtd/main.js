import { drawGrid } from "./grid.js";
import { initMouse } from "./mouse.js";
import { masses, addMass, selectedMass, drawMass } from './render.js'


//VARIABLES
let showGrid = true;
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
initMouse(canvas);
addMass(canvas.width / 2, canvas.height / 2, 20);


//BUTTON EVENTS
document.getElementById('toggle_grid').addEventListener('click', () => {
    showGrid = !showGrid
});
document.getElementById('add_mass').addEventListener('click', () => {
    addMass(canvas.width / 2 + Math.random() * 100 - 50,
        canvas.height / 2 + Math.random() * 100 - 50,
        20);
});
massSlider.addEventListener('input', () => {
    if (selectedMass) {
        selectedMass.radius = Number(massSlider.value);
        massRangeText.textContent = selectedMass.radius + ' UNITS'
    }
});





//ANIMATION LOOP
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //GRID
    if (showGrid) {
        drawGrid(ctx, canvas, 40, masses);
    }

    //OBJECT

    for (const m of masses) {
        drawMass(ctx, m.x, m.y, m.radius + 10);
    }


    requestAnimationFrame(animate);
}

animate();