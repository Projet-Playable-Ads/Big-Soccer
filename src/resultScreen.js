import { Container, Sprite } from "pixi.js";
import { screenShake } from "./animate.js";
import { app, losingSound, winningSound } from "./utils.js";

const goalAnimation = Sprite.from("assets/GOAL.png");
goalAnimation.visible = false;
app.stage.addChild(goalAnimation);

const smiley = Sprite.from("assets/smiley.png");
smiley.visible = false;
smiley.zIndex = 10;
smiley.position.set(app.screen.width * 0.7, app.screen.height * 0.3);
app.stage.addChild(smiley);

const loser = document.createElement("div");
loser.classList.add("loser-screen");
loser.innerText = "You suck !";
document.body.appendChild(loser);

/**
 *
 * @param {function} callback function called after timeout
 * @param {Container} confetto a Container with AnimatedGif
 */

export function winScreen(callback, confetto) {
  confetto.visible = true;
  goalAnimation.anchor.set(0.5);
  goalAnimation.width = 300;
  goalAnimation.height = 200;
  goalAnimation.zIndex = 1000;
  goalAnimation.position.set(app.renderer.width / 2, app.renderer.height / 2);
  goalAnimation.visible = true;
  screenShake(1000);
  winningSound.play();
  setTimeout(() => {
    goalAnimation.visible = false;
    confetto.visible = false;
  }, 1000);
  callback();
}

/**
 *
 * @param {function} callback function called on click
 */

export function loseScreen(callback) {
  smiley.visible = true;
  loser.style.display = "block";
  losingSound.play();
  callback();
  setTimeout(() => {
    loser.style.display = "none";
    smiley.visible = false;
  }, 1000);
}
