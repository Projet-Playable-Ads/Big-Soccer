import { Application } from "pixi.js";

export const container = document.body.appendChild(document.createElement("div"));
container.classList.add("container");

export const app = new Application({resizeTo: window});

container.appendChild(app.view);

export const BALL_INITIAL_POSITION = app.screen.height * 0.65;