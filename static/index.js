let guy = document.getElementById("john_img")
let rotate_direction = 'rotate(-360deg)'


guy.addEventListener('click', rotate)

function rotate(e) {
    e.target.style.pointerEvents = 'none';
    rotate_direction = rotate_direction === 'rotate(-360deg)' ? 'rotate(360deg)' : 'rotate(-360deg)'
    bruh = e.target
    bruh.style.transform = rotate_direction;
    // Optional: reset rotation to allow subsequent clicks to trigger the animation again
    setTimeout(() => {
        bruh.style.transition = 'none';
        bruh.style.transform = 'rotate(0deg)';
        setTimeout(() => {
            bruh.style.transition = 'transform 2s';
            e.target.style.pointerEvents = 'auto';
        }, 10);  // Delay is minimal to be nearly imperceptible
    }, 2000); // Adjust timeout to match CSS transition time
};