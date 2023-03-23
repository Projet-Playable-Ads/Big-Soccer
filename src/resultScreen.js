import { Sprite } from "pixi.js";
import { screenShake } from "./animate.js";
import { app, losingSound, winningSound } from "./utils.js";

const goalAnimation = Sprite.from("assets/GOAL.png");
goalAnimation.visible = false;
// const lose = Sprite.from("assets/lose.jpeg");
// lose.visible = false;

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
  winningSound.play();
  setTimeout(() => {
    goalAnimation.visible = false;
  }, 1000);
  callback();
}

/**
 *
 * @param {function} callback function called on click
 */

export function loseScreen(callback) {
    losingSound.play();
    callback();
//   lose.visible = true;
//   lose.anchor.set(0.5);
//   lose.width = 400;
//   lose.height = 200;
//   lose.position.set(app.screen.width / 2, app.screen.height / 2);
//   lose.interactive = true;
//   app.stage.addChild(lose);
//   lose.onpointerdown = () => {
//     console.log("pointerdown");
//     lose.visible = false;
//     callback();
//   };
}
