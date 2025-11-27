import { drawGrid } from "./grid.js";
import { initMouse } from "./mouse.js";
import { masses, addMass, selectedMass, drawMass } from './render.js';
import { drawLight } from "./light.js";
import { drawDilationProbe, initDilatedProbe, updateClock} from "./clock.js";



//VARIABLES
let showGrid = true;
let light = true;
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
initDilatedProbe(canvas);


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
document.getElementById('toggle_gw').addEventListener('click', () => {
    for (let i = 0; i < masses.length; i++) {
        const m = masses[i];
        m.wave = {
            age: 0,
            strength: m.radius * 1,
            speed: 5
        };
    }
});
document.getElementById('toggle_lr').addEventListener('click', () => {
    light = !light;
})



//ANIMATION LOOP
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);


    updateClock();

    //GRID
    if (showGrid) {
        drawGrid(ctx, canvas, 40, masses);
    }


    //LIGHT

    if (!light) {
        drawLight(ctx, canvas);
    }

    //OBJECT

    for (const m of masses) {
        drawMass(ctx, m.x, m.y, m.radius + 10);
    }
    
    drawDilationProbe(ctx);

    requestAnimationFrame(animate);
}

animate();