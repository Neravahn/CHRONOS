
import { masses } from "./render.js";

export let realMS = 0;
let lastFrame = performance.now();

export const probe = {
    x: 200,
    y: 100,
    radius: 18,
    enabled: false,
    dragging: false,
};

export function initDilatedProbe(canvas) {

    let checkbox = document.getElementById("dilationToggle");
    if (!checkbox) {
        checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = "dilationToggle";
        checkbox.style.position = "absolute";
        checkbox.style.left = "20px";
        checkbox.style.top = "20px";
        checkbox.style.transform = "scale(1.5)";
        document.body.appendChild(checkbox);
    }

    checkbox.addEventListener("change", () => {
        probe.enabled = checkbox.checked;
    });


    canvas.addEventListener("mousedown", (e) => {
        if (!probe.enabled) {
            return;
        }
        const rect = canvas.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;

        if (Math.hypot(mx - probe.x, my - probe.y) < probe.radius + 5) {
            probe.dragging = true;
        }
    });

    canvas.addEventListener("mousemove", (e) => {
        if (!probe.dragging || !probe.enabled) return;

        const rect = canvas.getBoundingClientRect();
        probe.x = e.clientX - rect.left;
        probe.y = e.clientY - rect.top;
    });

    canvas.addEventListener("mouseup", () => probe.dragging = false);
    canvas.addEventListener("mouseleave", () => probe.dragging = false);
}


export function getDilationRateAt(x, y) {
    let rate = 1;

    for (let i = 0; i < masses.length; i++) {
        const m = masses[i];
        const dx = x - m.x;
        const dy = y - m.y;
        const r = Math.hypot(dx, dy);

        if (r < 1) {
            continue

        };

        const dist = Math.max(r - m.radius, 1);
        // const dist = r - M.radius
        const M = m.radius * 80;


        let localRate = 1 / (1 + M / Math.pow(dist, 1.5));



        rate = Math.min(rate, localRate);
    }

    return rate;
}


function safeNumber(n) {
    return Number.isFinite(n) ? n : 0;
}

function format(ms) {
    ms = safeNumber(ms);

    const total = Math.floor(ms / 1000);

    const h = String(Math.floor(total / 3600)).padStart(2, "0");
    const m = String(Math.floor((total % 3600) / 60)).padStart(2, "0");
    const s = String(total % 60).padStart(2, "0");

    const msPart = String(Math.floor(ms % 1000)).padStart(3, "0");

    return `${h}:${m}:${s}:${msPart}`;
}


export function drawDilationProbe(ctx) {
    if (!probe.enabled) return;

    const rate = safeNumber(getDilationRateAt(probe.x, probe.y));
    const dilatedMS = safeNumber(realMS * rate);

    ctx.save();


    ctx.beginPath();
    ctx.strokeStyle = "cyan";
    ctx.lineWidth = 3;
    ctx.arc(probe.x, probe.y, probe.radius, 0, Math.PI * 2);
    ctx.stroke();


    const padding = 10;
    const lines = [
        `Real Time:     ${format(realMS)}`,
        `Dilated Time:  ${format(dilatedMS)}`,
        `Factor:        ${rate.toFixed(5)}x`
    ];

    ctx.font = "16px monospace";
    const lineHeight = 20;

    let tooltipWidth = 0;
    for (let i = 0; i < lines.length; i++) {
        const t = lines[i];
        tooltipWidth = Math.max(tooltipWidth, ctx.measureText(t).width);
    }
    tooltipWidth += padding * 2;
    const tooltipHeight = lines.length * lineHeight + padding * 2;

    let tipX = probe.x + probe.radius + 20;
    let tipY = probe.y - tooltipHeight / 2;


    const canvas = ctx.canvas;
    if (tipX + tooltipWidth > canvas.width) {
        tipX = probe.x - tooltipWidth - 20;
    }
    if (tipY < 10) tipY = 10;
    if (tipY + tooltipHeight > canvas.height - 10) {
        tipY = canvas.height - tooltipHeight - 10;
    }

    ctx.fillStyle = "#000000cc";
    ctx.fillRect(tipX, tipY, tooltipWidth, tooltipHeight);


    ctx.strokeStyle = "white";
    ctx.strokeRect(tipX, tipY, tooltipWidth, tooltipHeight);


    ctx.fillStyle = "white";
    for (let i = 0; i < lines.length; i++) {
        ctx.fillText(lines[i], tipX + padding, tipY + padding + i * lineHeight + 14);
    }

    ctx.restore();
}


export function updateClock() {
    const now = performance.now();
    const dt = now - lastFrame;
    lastFrame = now;

    if (!Number.isFinite(dt) || dt < 0) {
        return;
    }
    realMS += dt;
}
