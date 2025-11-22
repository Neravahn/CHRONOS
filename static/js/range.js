document.addEventListener('DOMContentLoaded', () => {
const velSlider = document.querySelector('.velocity');
const velText = document.getElementById('vel_range');
const upBtn = document.getElementById('up');
const downBtn = document.getElementById('down');
const stepsInput = document.getElementById('steps');


upBtn.addEventListener('click', () => {
    let step = parseFloat(stepsInput.value) || 0.01;
    let newValue = parseFloat(velSlider.value) + step;
    if (newValue > parseFloat(velSlider.max)) {
        newValue = parseFloat(velSlider.max);
    }

    velSlider.value = newValue;
    velSlider.dispatchEvent(new Event ('input'));
});

downBtn.addEventListener('click', () => {
    let step = parseFloat(stepsInput.value) || 0.01;
    let newValue = parseFloat(velSlider.value) - step;
    if (newValue < parseFloat(velSlider.min)) {
        newValue = parseFloat(velSlider.min);
    }

    velSlider.value = newValue;
    velSlider.dispatchEvent(new Event ('input'));
});

velText.textContent =velSlider.value + '% of C';
velSlider.addEventListener('input', () => {
    velText.textContent = velSlider.value + '% of C';
});
});