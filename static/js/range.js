document.addEventListener('DOMContentLoaded', () => {
const velSlider = document.querySelector('.velocity');
const velText = document.getElementById('vel_range');

velText.textContent =velSlider.value + '% of C';
velSlider.addEventListener('input', () => {
    velText.textContent = velSlider.value + '% of C';
});
});