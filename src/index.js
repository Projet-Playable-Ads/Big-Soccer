import { Application, Sprite, Container } from "pixi.js";

var app = new Application({background: '#ffffff'});
document.body.appendChild(app.view);


// ------------------------------------------------ Container -------------------------------------------------------------------------
const container = new Container();
app.stage.addChild(container);

// ------------------------------------------------ Terrain ---------------------------------------------------------------------------

const terrain = Sprite.from('assets/terrain.jpg');
app.stage.addChild(terrain);


// ------------------------------------------------- Trees ----------------------------------------------------------------------------
const tree1 = Sprite.from('assets/tree.png');
tree1.anchor.set(0.5);
tree1.width = 150
tree1.height = 150
tree1.x = 175
tree1.y = 310
tree1.interactive = false
app.stage.addChild(tree1);


const tree2 = Sprite.from('assets/tree.png');
tree2.anchor.set(0.5);
tree2.width = 150
tree2.height = 150
tree2.x = 525
tree2.y = 310
tree2.interactive = false
app.stage.addChild(tree2);

