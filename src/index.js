import * as PIXI from 'pixi.js';

const app = new PIXI.Application();
import { createUI } from "./ui.js";

document.body.appendChild(app.view);

app.loader.add('ball', 'assets/ball.png')
          .add('goal', 'assets/goal.png')
          .add('goalAnimation', 'assets/but.jpeg')
          .load(setup);

function setup() {

  // Create the ball 
  const ball = new PIXI.Sprite(app.loader.resources.ball.texture);
  ball.anchor.set(0.5);
  ball.width = 50; 
  ball.height = 50;
  ball.position.set(app.screen.width / 2, app.screen.height - 100);
  ball.interactive = true;
  ball.buttonMode = true;
  ball.on('pointerdown', onBallClick);
  app.stage.addChild(ball);

  // Create the goal 
  const goal = new PIXI.Sprite(app.loader.resources.goal.texture);
  goal.anchor.set(0.5);
  goal.width = 200; 
  goal.height = 100; 
  goal.position.set(app.screen.width / 2, 100);
  app.stage.addChild(goal);
  
    
  // Create the goal animation
  const goalAnimation = new PIXI.AnimatedSprite([
    app.loader.resources.goal.texture,
    app.loader.resources.goalAnimation.texture,
  ]);
  goalAnimation.anchor.set(0.5);
  goalAnimation.width = 200;
  goalAnimation.height = 100;
  goalAnimation.position.set(app.screen.width / 2, 100);
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
          ball.position.set(app.screen.width / 2, app.screen.height - 100);
          ball.isAirborne = false;
          goalAnimation.visible = true;
          goalAnimation.play();
          setTimeout(() => {
            goalAnimation.visible = false;
            
          }, 3000); 
        } else {
          ball.position.set(app.screen.width / 2, app.screen.height - 100);
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



// ------------------------------------------------ Ballon ----------------------------------------------------------------------------

const ballon = Sprite.from('assets/ballon.png');
ballon.anchor.set(0.5);
ballon.width = 65;
ballon.height = 65;
ballon.x = 340;
ballon.y = 400;
app.stage.addChild(ballon);

document.body.append(...createUI())