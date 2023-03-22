import { Texture, Container, Sprite, AnimatedSprite, Application, autoDetectRenderer } from 'pixi.js';
import { createUI } from "./ui.js";
import '@pixi/gif'


const container = document.body.appendChild(document.createElement("div"));
container.classList.add("container");

const app = new Application({resizeTo: window});

container.appendChild(app.view);


async function setup() {

  // Create the field
  const terrain = Sprite.from('assets/terrain_snow.png');
  terrain.anchor.set(0.5)
  terrain.width = 400
  terrain.height = 700
  terrain.position.set(app.screen.width / 2, app.screen.height / 2);
  app.stage.addChild(terrain);

  // Create the ball
  const ball = Sprite.from('assets/ball.png');
  ball.anchor.set(0.5);
  ball.width = 50; 
  ball.height = 50;
  ball.position.set(app.renderer.width / 2, app.renderer.height * 0.75);
  ball.eventMode = 'static';
  ball.buttonMode = true;
  ball.speed = 10
  ball.onpointerdown = () => onBallClick();

app.stage.addChild(ball);

  // Insert the hand gif

  const hand_guide = await Assets.load('assets/hand_pixel_anim.gif');
  hand_guide.position.set(ball.x, ball.y - 100)
  /*app.ticker.add(function(delta) {
    zone.rotation += 0.05;
  })*/
  app.stage.addChild(hand_guide)

  // Create the obstacle
  const goal = Sprite.from('assets/cage_snow.png');
  const buche = Sprite.from('assets/buche.png');
  goal.anchor.set(0.5);
  goal.width = 200;
  goal.height = 100;
  goal.position.set(app.screen.width / 2, 50);

  buche.anchor.set(0.5);
  buche.width = 50;
  buche.height = 50;
  buche.x = app.view.width / 2 + 100;
  buche.y = app.view.height / 2;
  //goalkeeper.interactive = true;
  //goalkeeper.position.set(app.screen.width / 2, 100);
  
  app.stage.addChild(goal);
  app.stage.addChild(buche);
  
  //app.ticker.add(gameObstacle);


  /*function gameObstacle() {

    if (ball.y === buche.y ) {
        ball.y += 10;
    }
  }*/


  // Create the trees
  const tree1 = Sprite.from('assets/tree.png');
  tree1.anchor.set(0.5);
  tree1.width = 75
    tree1.height = 75
    tree1.x = app.view.width / 1.5
    tree1.y = app.view.height / 3
    app.stage.addChild(tree1);


    const tree2 = Sprite.from('assets/tree.png');
    tree2.anchor.set(0.5);
    tree2.width = 75
    tree2.height = 75
    tree2.x = app.view.width / 3
    tree2.y = app.view.height / 3
    app.stage.addChild(tree2);

  
    
  // Create the goal animation
  const texture = [Texture.from('assets/but.jpeg'),  Texture.from('assets/goal.png')];
  const goalAnimation = new AnimatedSprite(texture);
  goalAnimation.anchor.set(0.5);
  goalAnimation.width = 200;
  goalAnimation.height = 100;
  goalAnimation.position.set(app.renderer.width / 2, 100);
  goalAnimation.animationSpeed = 0.1;
  goalAnimation.visible = false;
  app.stage.addChild(goalAnimation);



  // Listen for frame updates
  app.ticker.add(() => {
    if (ball.isAirborne) {
      ball.y -= 10;
      if (ball.y < 0) {
        ball.isAirborne = false;
        if (ball.x > goal.x - goal.width / 2 && ball.x < goal.x + goal.width / 2) {
          // Ball has reached the goal
          ball.position.set(app.renderer.width / 2, app.renderer.height * .75);
          ball.isAirborne = false;
          goalAnimation.visible = true;
          goalAnimation.play();
          setTimeout(() => {
            goalAnimation.visible = false;
            
          }, 3000); 
        } else {
          ball.position.set(app.renderer.width / 2, app.renderer.height - 100);
        }
      }
    }
  });
  
  function onBallClick() {
    ball.isAirborne = true;
    const goalPosition = goal.position;
    const ballPosition = ball.position;
    const dx = goalPosition.x - ballPosition.x;
    const dy = goalPosition.y - ballPosition.y;
    const angle = Math.atan2(dy, dx);
    const speed = 20;
    const velocity = {
      x: speed * Math.cos(angle),
      y: speed * Math.sin(angle)
    };
    ball.vx = velocity.x;
    ball.vy = velocity.y;
  }

  /*function move_goalkeeper(e) {
    let pos = e.data.global

    goalkeeper.x = pos.x;
    goalkeeper.y = pos.y;
  }*/
}

// ------------------------------------------------ Container -------------------------------------------------------------------------
/*const container = new Container();
app.stage.addChild(container);*/

// ------------------------------------------------ Terrain ---------------------------------------------------------------------------

/*const terrain = Sprite.from('assets/terrain.jpg');
app.stage.addChild(terrain);*/


// ------------------------------------------------- Trees ----------------------------------------------------------------------------
/*const tree1 = Sprite.from('assets/tree.png');
tree1.anchor.set(0.5);
tree1.width = 150
tree1.height = 150
tree1.x = 175
tree1.y = 310
app.stage.addChild(tree1);


const tree2 = Sprite.from('assets/tree.png');
tree2.anchor.set(0.5);
tree2.width = 150
tree2.height = 150
tree2.x = 525
tree2.y = 310
app.stage.addChild(tree2);
*/


// ------------------------------------------------ Ballon ----------------------------------------------------------------------------

/*const ballon = Sprite.from('assets/ballon.png');
ballon.anchor.set(0.5);
ballon.width = 65;
ballon.height = 65;
ballon.x = 340;
ballon.y = 400;
app.stage.addChild(ballon);*/

setup();

window.addEventListener('resize', () => {
    app.renderer.resize(window.innerWidth, window.innerHeight);
})

container.append(...createUI());

document.body.append(container);
