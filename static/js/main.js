import { startAnimation } from "./animation.js";
import { getCurrentVelocity } from "./range.js";

document.addEventListener('DOMContentLoaded', () => {
    startAnimation('vtd_canvas', getCurrentVelocity);
});