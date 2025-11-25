import { masses, selectMass } from "./render.js";

let isDragging = false;
let selectedMass = null;


export function initMouse(canvas){

    canvas.addEventListener('mousedown', (e) => {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        selectedMass = null;
        for (const m of masses){
            const dx = mouseX - m.x;
            const dy = mouseY - m.y;


            //MASS SELECTION
            if ( dx*dx + dy*dy <= m.radius*m.radius){
                selectedMass = m;
                selectMass(m);
                isDragging = true;
                break
            }
        }
    });

    canvas.addEventListener('mousemove', (e) => {
        if (!isDragging || !selectedMass){
            return;
        }

        const rect = canvas.getBoundingClientRect();
        selectedMass.x = e.clientX - rect.left;
        selectedMass.y = e.clientY - rect.top;
    });

    canvas.addEventListener('mouseup', () => {
        isDragging = false;
    });

    canvas.addEventListener('mouseleave', () => {
        isDragging = false;
    });
}