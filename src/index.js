import * as PIXI from 'pixi.js';

const app = new PIXI.Application();

document.body.appendChild(app.view);

const assets = [
  { name: 'ball', url: 'assets/ball.png' },
  { name: 'goal', url: 'assets/goal.png' },
  { name: 'goalAnimation', url: 'assets/but.jpeg' },
  { name: 'arrow', url: 'assets/realarrowblue.png' },
  { name: 'lose', url: 'assets/lose.jpeg' },
  { name: 'obstacle', url: 'assets/obstacle.png' },

];

app.loader.add(assets).load(setup);

// Define the `setup` function
function setup() {
  // Initialize a variable to track whether the ball is airborne
  let isBallAirborne = false;

  // Create a new sprite for the ball
  const ball = new PIXI.Sprite(app.loader.resources.ball.texture);
  ball.anchor.set(0.5);
  ball.width = 50;
  ball.height = 50;
  ball.position.set(app.screen.width / 2, app.screen.height - 100);
  ball.interactive = true;
  ball.buttonMode = true;
  ball.on('pointerdown', onBallClick);
  app.stage.addChild(ball);

  // Create a new sprite for the goal
  const goal = new PIXI.Sprite(app.loader.resources.goal.texture);
  goal.anchor.set(0.5, 1);
  goal.width = 200;
  goal.height = 100;
  goal.position.set(app.screen.width / 2, app.screen.height - 500);
  app.stage.addChild(goal);

  // Create a new animated sprite for the goal animation
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

  // Create a new sprite for the arrow
  const arrow = new PIXI.Sprite(app.loader.resources.arrow.texture);
  arrow.anchor.set(0.5);
  arrow.width = 50;
  arrow.height = 50;
  arrow.rotation = -Math.PI / 2;
  arrow.position.set(ball.x, ball.y - 50);
  app.stage.addChild(arrow);

  // Create a new sprite for the "lose" message
  const lose = new PIXI.Sprite(app.loader.resources.lose.texture);
  lose.anchor.set(0.5);
  lose.width = 400;
  lose.height = 200;
  lose.position.set(app.screen.width / 2, app.screen.height / 2);
  lose.visible = false;
  app.stage.addChild(lose);

  // Create a new sprite for the obstacle
  const obstacle = new PIXI.Sprite(app.loader.resources.obstacle.texture);
  obstacle.anchor.set(0.5);
  obstacle.width = 100;
  obstacle.height = 100;
  obstacle.position.set(app.screen.width / 2, app.screen.height - 300);
  app.stage.addChild(obstacle);

  //  variables to track the arrow direction and angle
  let arrowDirection = 1;
  let arrowAngle = arrow.rotation;


  function onBallClick() {
    isBallAirborne = true;

    const goalPosition = goal.position;
    const ballPosition = ball.position;
    const dx = goalPosition.x - ballPosition.x;
    const dy = goalPosition.y - ballPosition.y;
    const angle = arrowAngle;
    const speed = 10;
    ball.vx = speed * Math.cos(angle);
    ball.vy = speed * Math.sin(angle);
    arrow.visible = false;
  }

  app.ticker.add(update);

  function update() {
    // Update the arrow position and rotation
    arrow.x = ball.x;
    arrow.y = ball.y - 50;
    arrow.rotation += arrowDirection * Math.PI / 180;
    arrowAngle = arrow.rotation;

    // Reverse the arrow direction when it reaches the limits of its rotation
    if (arrow.rotation <= -Math.PI || arrow.rotation >= 0) {
      arrowDirection *= -1;
    }

    const dx = arrow.x - ball.x;
    const dy = arrow.y - ball.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < ball.width / 2 + arrow.width / 2) {
      onBallClick();
    }

    // Update the ball position and velocity if it is airborne
    if (isBallAirborne) {
      ball.x += ball.vx;
      ball.y += ball.vy;

      // Apply friction to the ball's velocity
      ball.vx *= 0.99;
      ball.vy *= 0.99;

      // Bounce the ball off the left and right edges of the screen
      if (ball.x < 0) {
        ball.vx = -ball.vx * 0.8;
        ball.x = 0;
      } else if (ball.x > app.screen.width) {
        ball.vx = -ball.vx * 0.8;
        ball.x = app.screen.width;
      }

      // Bounce the ball off the top of the screen
      if (ball.y < 0) {
        ball.vy = -ball.vy * 0.6;
        ball.y = 0;
      }

      // Bounce the ball off the bottom of the screen
      if (ball.y > app.screen.height) {
        ball.vy = -ball.vy * 0.6;
        ball.y = app.screen.height;
      }

      // Check if the ball has reached the goal and trigger the goal animation
      if (ball.y < goal.y && ball.x > goal.x - goal.width / 2 && ball.x < goal.x + goal.width / 2) {
        ball.vx = 0;
        ball.vy = 0;
        goalAnimation.visible = true;
        goalAnimation.play();
        goalAnimation.onComplete = () => {
          goalAnimation.visible = false;
          ball.x = app.screen.width / 2;
          ball.y = app.screen.height - 100;
          ball.vx = 0;
          ball.vy = 0;
          isBallAirborne = false;
        };
      } else {
        // Show the "lose" message if the ball has stopped moving
        if (Math.abs(ball.vy) < 0.01 && Math.abs(ball.vx) < 0.01) {
          lose.visible = true;
          lose.interactive = true;
          lose.buttonMode = true;
          lose.on('pointerdown', () => {
            lose.visible = false;
            ball.x = app.screen.width / 2;
            ball.y = app.screen.height - 100;
            ball.vx = 0;
            ball.vy = 0;
            isBallAirborne = false;
            arrow.visible = true;
          });
        }
      }

      // Check if the ball collides with the obstacle
      const dxObstacle = obstacle.x - ball.x;
      const dyObstacle = obstacle.y - ball.y;
      const distanceObstacle = Math.sqrt(dxObstacle * dxObstacle + dyObstacle * dyObstacle);
      if (distanceObstacle < ball.width / 2 + obstacle.width / 2) {
        // Reverse the ball's velocity and apply friction
        ball.vx = -ball.vx * 0.8;
        ball.vy = -ball.vy * 0.8;
        ball.vx *= 0.99;
        ball.vy *= 0.99;
      }

    }
  }
}