
/**
 * @params duration : durée en ms du shake
 */
const screenShake = (duration) => {
    const canvas = document.querySelector('canvas');
    canvas.classList.add('shake');
    setTimeout(() => {  
        canvas.classList.remove('shake');
    }, duration);
}

export { screenShake };