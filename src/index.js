import { Texture, Container, Sprite, AnimatedSprite, Application, autoDetectRenderer } from 'pixi.js';
import { createUI } from "./ui.js";

const container = document.body.appendChild(document.createElement("div"));
container.classList.add("container");

const app = new Application({resizeTo: window});

container.appendChild(app.view);

function setup() {

  // Create the ball 
  const ball = Sprite.from('assets/ball.png');
  ball.anchor.set(0.5);
  ball.width = 50; 
  ball.height = 50;
  ball.position.set(app.renderer.width / 2, app.renderer.height * 0.75);
  ball.eventMode = 'static';
  ball.buttonMode = true;
  ball.onpointerdown = () => onBallClick();
  app.stage.addChild(ball);

  // Create the goal 
  const goal = Sprite.from('assets/goal.png');
  goal.anchor.set(0.5);
  goal.width = 200; 
  goal.height = 100; 
  goal.position.set(app.renderer.width / 2, 100);
  app.stage.addChild(goal);
  
    
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
