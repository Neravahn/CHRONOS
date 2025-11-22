export function getGamma(v_percent) {
    const velocity = v_percent / 100;
    return 1 / Math.sqrt ( 1 - velocity * velocity);
}