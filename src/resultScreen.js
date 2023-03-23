import { Sprite } from "pixi.js";
import { screenShake } from "./animate.js";
import { downloadButton } from "./ui.js";
import { app, losingSound, winningSound } from "./utils.js";


const goalAnimation = Sprite.from('assets/cadeauvfx.png');

goalAnimation.visible = false;

const loser = document.createElement("div");
loser.classList.add("loser-screen");
loser.innerText = "You suck !"
document.body.appendChild(loser);

const winner = document.createElement("div");
winner.classList.add("winner-screen");
winner.innerText = "AMAZING !!!"
document.body.appendChild(winner);

/**
 *
 * @param {function} callback function called after timeout
 */

export function winScreen(callback) {
  goalAnimation.anchor.set(0.5);
  goalAnimation.width = 300;
  goalAnimation.height = 200;
  goalAnimation.position.set(app.renderer.width / 2, app.renderer.height / 2);
  goalAnimation.visible = true;
  app.stage.addChild(goalAnimation);
  screenShake(1000);
  winner.style.display = "block";
  winningSound.play();
  callback();
  setTimeout(() => {
    goalAnimation.visible = false;
    winner.style.display = "none";
  }, 1000);
  //callback();
}

/**
 *
 * @param {function} callback function called on click
 */

export function loseScreen(callback) {
  loser.style.display = "block";
    losingSound.play();
    callback();
    setTimeout(() => {
      loser.style.display = "none"
    }, 1000);
}
