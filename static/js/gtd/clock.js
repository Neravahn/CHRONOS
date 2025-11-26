import { masses } from './render.js'



export let cursor  = {
    x: 0,
    y: 0
};

let realTimeMS = 0;
let cursorTimeMS = 0;
let lastFrame = performance.now();


//CURSOR TRACKING
export function initClock(canvas) {
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        cursor.x = e.clientX - rect.left;
        cursor.y = e.client - rect.top;
    });
}


export function updateCLock() {
    const now = performance.now();
    const dt = now - lastFrame;
    lastFrame = now;

    realTimeMS += dt;
    
    const gamma = getGammaAt (cursor.x, cursor.y);
    cursorTimeMS = dt * ( 1 / gamma);
}


function getGammaAt(x, y){
    let gamma = 1;


    for (let i = 0; i < masses.length; i++){
        const m = masses[i];

        const dx = x - m.x;
        const dy = y -m.y;
        const r = Math.sqrt(dx*dx + dy*dy);

        if (r < 10){
            continue;
        }


        //SIMPLE GRAVITAIONAL TIME DILATION FACTOR
        const strength = m.mass / ( r * 50);
        const g = 1 / Math.sqrt(Math.max(0, 1 - strength));

        gamma = Math.max(gamma, g);
    }

    return gamma;
}


//SETTING UP TIME FORMAT

function timeFormat(ms){
    const totalSec = Math.floor(ms / 1000);
    const hours = Math.floor(totalSec / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((totalSec % 3600)/ 60).toString().padEnd(2, '0');
    const seconds = (totalSec % 60).toString().padStart(2, '0');
    const msPart = Math.floor(ms % 1000).toString().padStart(3, '0');

    return `${hours}:${minutes}:${seconds}:${msPart}`;
}
