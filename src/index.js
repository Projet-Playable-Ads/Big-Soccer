import { Application, Sprite } from "pixi.js";
import { createUI } from "./ui.js";
import { screenShake } from "./animate.js";

import "../css/style.css";

const app = new Application({
    width: 400,
    height: 800,
});

const container = document.createElement("div");
container.classList.add("container");

container.appendChild(app.view);

document.body.appendChild(container);
container.append(...createUI());

let sprite = Sprite.from("assets/bunny.png");

app.stage.addChild(sprite);

window.addEventListener('load', () => {
    screenShake(2000);
})

