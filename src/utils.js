import { Application } from "pixi.js";

export const app = new Application({resizeTo: window});

export const BALL_INITIAL_POSITION = app.screen.height * 0.65;