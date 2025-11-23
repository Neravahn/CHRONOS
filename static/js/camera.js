export const camera = {
    x: 0,
    y: 0,
    zoom: 1
};


let isPanning = false;
let startx = 0;
let starty = 0;

//LIMITS
const min_zoom = 0.7;
const max_zoom = 1.2;

//BOUNDARIES
const world = {
    left: -2000,
    right: 1000,
    top: -2000,
    bottom: 1000
};

function clampCamera(canvas) {
    const viewH = canvas.height / camera.zoom;
    const viewW = canvas.width / camera.zoom;

    const halfWorldW = (world.right - world.left) /2;
    const halfWorldH = (world.bottom - world.top) / 2;

    const maxx = halfWorldW - viewW / 2;
    const minx = -maxx;

    const maxy = halfWorldH - viewH / 2;
    const miny = -maxy;

    if (viewH >= halfWorldH * 2) {
        camera.y = 0;
    } else {
        camera.y = Math.max(miny, Math.min(maxy, camera.y));
    }

    if (viewW >= halfWorldW * 2) {
        camera.x = 0;
    } else {
        camera.x = Math.max(minx, Math.min(maxx , camera.x));
    }

    
}

export function setupCameraControls(canvas) {
    canvas.addEventListener('mousedown', (e) => {
        isPanning = true;
        startx = e.clientX;
        starty = e.clientY;
    });

    canvas.addEventListener('mousemove', (e) => {
        if (!isPanning) {
            return;
        }

        const distancex = (e.clientX - startx) / camera.zoom;
        const distancey = (e.clientY - starty) / camera.zoom;

        camera.x += distancex;
        camera.y += distancey;

        clampCamera(canvas);

        startx = e.clientX;
        starty = e.clientY;
    });

    canvas.addEventListener('mouseup', () => {
        isPanning = false;
    });

    canvas.addEventListener('mouseleave', () => {
        isPanning = false;
    });

    canvas.addEventListener('wheel', (e) => {
        e.preventDefault();

        const rect = canvas.getBoundingClientRect();
        const mousex = (e.clientX - rect.left) / camera.zoom - camera.x;
        const mousey = (e.clientY - rect.top) / camera.zoom - camera.y;

        const zoomIntensity = 0.001;
        const oldZoom = camera.zoom;

        camera.zoom -= e.deltaY * zoomIntensity;
        camera.zoom = Math.max(min_zoom, Math.min(camera.zoom, max_zoom));

        const zoomRatio = camera.zoom / oldZoom;

        camera.x -= mousex * (zoomRatio - 1);
        camera.y -= mousey * (zoomRatio - 1);

        clampCamera(canvas);
    });
}

export function applyCameraTransform(ctx) {
    ctx.scale(camera.zoom, camera.zoom);
    ctx.translate(camera.x, camera.y);
}