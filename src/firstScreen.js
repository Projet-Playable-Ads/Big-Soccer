import { Sprite } from "pixi.js"

/**
 * 
 * @param {Sprite} ball 
 * @returns {} screen
 */

export const firstScreen = (ball) => {
    /*const container = new Container();
    const text = new Text("Tap to shoot", {
        fontFamily: 'Trickster',
        fontSize: 15,
        fill: 'black'
    })
    text.width = app.renderer.width;
    text.position.set(- app.screen.width / 2, 30)
    container.addChild(text);
    let font = new FontFaceObserver('Trickster', {});
    font.load().then(() => {
        text.updateText();
    })
    text.width = app.screen.width;*/

    const text = document.createElement("span");
    text.innerText = "Tap to shoot"
    text.setAttribute('id', 'tap-to-shoot');
    const height = ball.position.y + 30;
    text.style = `top : ${height}px`;
    document.body.append(text);
    return text;
}