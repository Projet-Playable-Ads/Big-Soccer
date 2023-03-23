import { Assets, Container, Sprite } from "pixi.js";
import { screenShake } from "./animate.js";
import { app, losingSound, winningSound } from "./utils.js";

let score = 0;

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

export function loadEndScreen() {
  console.log("this load");
    winningEnd()
}

function losingEnd() {
  
}
 
async function winningEnd() {
  console.log("winning");
  const presentAsset = Sprite.from("assets/cadeau.png");
  const star = await Assets.load("assets/star.gif");
  const positions = [
    [0.7 * app.screen.width, 0.2 * app.screen.height],
    [0.3 * app.screen.width, 0.2 * app.screen.height],
    [0.2 * app.screen.width, 0.6 * app.screen.height],
    [0.25 * app.screen.width, 0.65 * app.screen.height],
    [0.6 * app.screen.width, 0.7 * app.screen.height],
  ]

  for (let i = 0; i < 5; i++) {
    let clone = star.clone();
    clone.position.set(...positions[i])
    app.stage.addChild(clone);
    clone.zIndex = 2;
  }
  presentAsset.width = 300
  presentAsset.height = 300
  presentAsset.anchor.set(0.5);
  presentAsset.position.set(app.screen.width /2, app.screen.height / 2);

  app.stage.addChild(presentAsset);
}