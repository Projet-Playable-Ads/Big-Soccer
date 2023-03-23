import { Application } from "pixi.js";
import {Sound} from "@pixi/sound"

export const container = document.body.appendChild(document.createElement("div"));
container.classList.add("container");

export const app = new Application({resizeTo: window});

container.appendChild(app.view);

export const BALL_INITIAL_POSITION = app.screen.height * 0.65;

export const winningSound = Sound.from("assets/WiTrueJingle.mp3");

export const losingSound = Sound.from("assets/USUCKLOL.mp3");

export const music = Sound.from("assets/BIGSOCCERTHEME2.mp3");
music.loop = true;

export const shootSound = Sound.from("assets/BIGSHOT.mp3");