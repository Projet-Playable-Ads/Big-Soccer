import { Sprite } from "pixi.js";

/**
 * @params duration : durée en ms du shake
 */
export const screenShake = (duration) => {
    const canvas = document.querySelector('.container');
    canvas.classList.add('shake');
    setTimeout(() => {  
        canvas.classList.remove('shake');
    }, duration);
}

const defaultConfettiAssets = [
    'assets/bunny.png',
]

export const confetti = (assets = defaultConfettiAssets) => {
    const sprites = [];
    for (let asset of assets) {
        for(let i in 10 * Math.random()) {
            console.log(i);
            const sp = Sprite.from(asset);
            sp.position.set(Math.random, Math.random);
            sprites.push(sp);
        }
    } 
    console.log("confetti created", sprites);
    return sprites;
}


