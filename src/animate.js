import { app } from "./utils.js";
import { Container, Assets } from "pixi.js";
/**
 * @params duration : durée en ms du shake
 */
export const screenShake = (duration) => {
  const canvas = document.querySelector(".container");
  canvas.classList.add("shake");
  setTimeout(() => {
    canvas.classList.remove("shake");
  }, duration);
};

function clone(source, scale) {
  const clones = [];
  for (let i = 0; i < 5; i++) {
    const me = source.clone();
    me.position.set(0, app.screen.height * (i / 5));
    me.width = app.screen.width;
    me.height = app.screen.height / 2;
    me.scale.set(scale);
    clones.push(me);
  }
  return clones;
}

export async function addConfetti() {
  const confetti = await Assets.load("assets/confetti.gif");
  const scale = Math.min(
    app.screen.width / confetti.texture.width,
    app.screen.height / confetti.texture.height
  );
  confetti.width = app.screen.width;
  confetti.height = app.screen.height / 2;

  const confettis = clone(confetti, scale);

  const confettiContainer = new Container();
  confettiContainer.addChild(confetti, ...confettis);
  confettiContainer.visible = false;
  confettiContainer.zIndex = 2000;

  app.stage.addChild(confettiContainer);
  return confettiContainer;
}
