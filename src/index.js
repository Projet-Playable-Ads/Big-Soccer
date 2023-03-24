import { Texture, Sprite, AnimatedSprite, Assets } from "pixi.js";
import { downloadButton } from "./ui.js"
import { showFirstScreen } from "./firstScreen.js";
import { app, container, BALL_INITIAL_POSITION, music, shootSound, BRANCHE1_INITIAL_POSITION, BRANCHE2_INITIAL_POSITION } from "./utils.js";
import "@pixi/gif";
import { loadEndScreen, loseScreen, winScreen, score } from "./resultScreen.js";
import "../css/ui.css";
import "../css/style.css";
import "../css/screens.css";
import { addConfetti } from "./animate.js";

let attemps = 0;

async function setup() {
  // Create the field
  app.stage.sortableChildren = true;
  const terrain = Sprite.from("assets/terrainbasestart.png");
  terrain.anchor.set(0.5);
  terrain.width = app.screen.width;
  terrain.height = app.screen.height;
  terrain.position.set(app.screen.width / 2, app.screen.height / 2);
  app.stage.addChild(terrain);

  const branche1 = Sprite.from("assets/newsakura.png");
  branche1.width = 170;
  branche1.height = 100;
  branche1.position.set(0, BRANCHE1_INITIAL_POSITION);
  app.stage.addChild(branche1);
  branche1.visible = false;

  const branche2 = Sprite.from("assets/sakurapenchee2.png");
  branche2.width = 170;
  branche2.height = 100;
  branche2.position.set(app.renderer.width - branche2.width, BRANCHE2_INITIAL_POSITION);
  app.stage.addChild(branche2);
  branche2.visible = false;

  const blackScreen = Sprite.from("assets/blackscreen.png")
  blackScreen.width = app.screen.width;
  blackScreen.height = app.screen.height;
  blackScreen.visible = true;
  app.stage.addChild(blackScreen);

  // Create the ball
  const ball = Sprite.from("assets/ball.png");

  // Initialize a variable to track whether the ball is airborne
  let isBallAirborne = false;

  // Create a new sprite for the ball
  ball.anchor.set(0.5);
  ball.width = 50;
  ball.height = 50;
  ball.position.set(app.renderer.width / 2, BALL_INITIAL_POSITION);
  ball.eventMode = "static";
  ball.buttonMode = true;
  ball.speed = 10;
  ball.onpointerdown = () => onBallClick();

  app.stage.addChild(ball);

  // Insert the hand gif

  const hand_guide = await Assets.load('assets/hand_pixel_anim.gif');
  hand_guide.position.set(ball.x, ball.y - 100)
  app.stage.addChild(hand_guide);

  const confetto = await addConfetti();

  // Create the obstacle
  const goal = Sprite.from("assets/cage.png");
  goal.anchor.set(0.5);
  goal.width = 200;
  goal.height = 100;
  goal.position.set(app.screen.width / 2, 50);
  
  app.stage.addChild(goal);

  // Create a new sprite for the arrow
  const arrow = Sprite.from('assets/realarrowblue.png');
  arrow.anchor.set(0, 0.5);
  arrow.width = 50;
  arrow.height = 50;
  arrow.rotation = -Math.PI / 2;
  arrow.position.set(ball.x, ball.y);
  app.stage.addChild(arrow);

  // Create a new sprite for the "lose" message

  // Create a new sprite for the obstacle
  const obstacle = Sprite.from("assets/wood.png");
  obstacle.anchor.set(0.5);

  obstacle.width = 75;
  obstacle.height = 45;
  obstacle.position.set(app.screen.width / 2, app.screen.height * 0.5 - 45);
  let velocity = 5;
  app.stage.addChild(obstacle);
  app.ticker.add(() => {
    obstacle.x += velocity;
    if(obstacle.x < 0 || obstacle.x > app.screen.width) {
      velocity = -velocity;
    }
  })

  window.addEventListener('resize', () => {
    obstacle.scale.set(Math.min(window.innerWidth / obstacle.width, window.innerHeight / obstacle.height));
  })

  //  variables to track the arrow direction and angle
  let arrowDirection = 1;
  let arrowAngle = arrow.rotation;

  const firstScreen = showFirstScreen(ball);
  document.body.append(downloadButton())

  
  function onBallClick() {
    blackScreen.visible = false;
    blackScreen.zIndex = -1;
    shootSound.play();
    ball.interactive = false;
    isBallAirborne = true;
    firstScreen.style.display = "none";
    hand_guide.visible = false;
    const angle = arrowAngle;
    const speed = 20;
    ball.vx = speed * Math.cos(angle);
    ball.vy = speed * Math.sin(angle);
    arrow.visible = false;
  }

  app.ticker.add(update)

  function update() {
    // Update the arrow position and rotation
    if(attemps == 0) {
      demo();
    }
    if(attemps == 1) {
      loadWinter();
    }
    arrow.x = ball.x;
    arrow.y = ball.y - 50;
    if(arrow.visible) arrow.rotation += (arrowDirection * Math.PI) / 180;
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

      // Bounce the ball off the goal on left and right
      if((ball.x <= goal.x + goal.width && ball.y <= goal.y )|| (ball.x <= goal.x && ball.y <= goal.y)) {
        ball.vx = -ball.vx * 0.8;
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
      if (
        ball.y < goal.y &&
        ball.x > goal.x - (goal.width / 2) - 10 &&
        ball.x < goal.x + (goal.width / 2) - 10
      ) {
        winScreen(gameStart, confetto);
        if(score > 1) loadSpring();
        return;
      } else {
        // Show the "lose" message if the ball has stopped moving
        if (Math.abs(ball.vy) < 0.05 && Math.abs(ball.vx) < 0.05) {
          loseScreen(gameStart);
          return;
        }
      }

      // Check if the ball collides with the obstacle
      if(obstacle.visible) {
      const dxObstacle = obstacle.x - ball.x;
      const dyObstacle = obstacle.y - ball.y;
      const distanceObstacle = Math.sqrt(
        dxObstacle * dxObstacle + dyObstacle * dyObstacle
      );
      if (distanceObstacle < ball.width / 2 + obstacle.width / 2) {
        // Reverse the ball's velocity and apply friction
        ball.vx = -ball.vx * 0.8;
        ball.vy = -ball.vy * 0.8;
        ball.vx *= 0.99;
        ball.vy *= 0.99;
      }
      }

      // Check if the ball collides with the obstacle
      if (branche1.visible && branche2.visible) {
        const dxBranche1 = branche1.x - ball.x;
        const dyBranche1 = branche1.y - ball.y;
        const dxBranche2 = branche2.x - ball.x;
        const dyBranche2 = branche2.y - ball.y;

        const distanceBranche1 = Math.sqrt(
          dxBranche1 * dxBranche1 + dyBranche1 * dyBranche1
        );

        const distanceBranche2 = Math.sqrt(
          dxBranche2 * dxBranche2 + dyBranche2 * dyBranche2
        );

        if (distanceBranche1 < ball.width / 2 + branche1.width / 2 || distanceBranche2 < ball.width / 2 + branche2.width / 2) {
          // Reverse the ball's velocity and apply friction
          ball.vx = -ball.vx * 0.8;
          ball.vy = -ball.vy * 0.8;
          ball.vx *= 0.99;
          ball.vy *= 0.99;
        }
      }
    }
  }

  function gameStart() {
    attemps++;
    if(attemps >= 3) {
      loadEndScreen();
      isBallAirborne = false;
      obstacle.visible = false;
      return;
    }
    ball.x = app.screen.width / 2;
    ball.y = BALL_INITIAL_POSITION;
    ball.vx = 0;
    ball.vy = 0;
    isBallAirborne = false;
    arrow.visible = true;
    obstacle.visible = true;
    ball.interactive = true;
  }

  function demo() {
    blackScreen.visible = true;
    arrow.visible = false;
    obstacle.visible = false;
  }

  async function loadWinter() {
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    })
    terrain.texture = Texture.from("assets/terrain_snow.png")
    goal.texture = Texture.from("assets/cage_snow.png");
  }

  async function loadSpring() {
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    })
    branche1.visible = true;
    branche2.visible = true;
    obstacle.visible = false;
    terrain.texture = Texture.from("assets/terrain_sakura.png");
    goal.texture = Texture.from("assets/cage.png");
  }

  music.play();

}

setup();

window.addEventListener("resize", () => {
  app.renderer.resize(container.clientWidth, container.clientHeight);
});

document.body.append(container);
