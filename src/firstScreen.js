import { Sprite } from "pixi.js";

/**
 *
 * @param {Sprite} ball
 * @returns {} screen
 */

function tapText(ball) {
  const text = document.createElement("div");
  const shootText = document.createElement("span");
  shootText.innerText = "Tap to";
  const innerText = document.createElement("span");
  innerText.innerText = "Shoot!";
  text.append(shootText, innerText);
  text.setAttribute("id", "tap-to-shoot");
  const height = ball.position.y + 30;
  text.style = `top : ${height}px`;
  document.body.append(text);
  return text;
}

export const showFirstScreen = (ball) => {
  return document.body.appendChild(tapText(ball))
};
