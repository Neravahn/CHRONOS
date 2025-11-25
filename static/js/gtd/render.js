export const masses = [];
export let selectedMass = null

export function addMass(x, y, radius) {
    masses.push({x, y, radius});
}

export function selectMass(m) {
    selectedMass = m;
}

export function drawMass(ctx, x, y, radius){
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();

    const ringWidth = radius * 0.1;
    const glowRadius = radius + ringWidth ;


    const gradient = ctx.createRadialGradient(
        x, y, radius,
        x, y, glowRadius
    );

    gradient.addColorStop(0, "rgba(0, 0, 0, 0)");
    gradient.addColorStop(0.4, "rgba(251, 114, 51, 0.6)");
    gradient.addColorStop(1, "rgba(242, 136, 61, 0)");


    ctx.beginPath();
    ctx.fillStyle = gradient;
    ctx.arc(x, y, glowRadius, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
}