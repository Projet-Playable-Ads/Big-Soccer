import { Application, Sprite } from "pixi.js";
import { createUI } from "./ui.js";

const app = new Application({
    width: 400,
    height: 800,
});

document.body.appendChild(app.view);

createUI();

let sprite = Sprite.from("assets/bunny.png");

app.stage.addChild(sprite);

