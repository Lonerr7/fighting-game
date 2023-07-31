const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = (canvas.width = 1024);
const CANVAS_HEIGHT = (canvas.height = 576);

// Красим канвас в черный цвет
ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

const gravity = 0.2;

class Sprite {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.height = 150;
  }

  draw() {
    ctx.fillStyle = 'red';
    ctx.fillRect(this.position.x, this.position.y, 50, this.height);
  }

  update() {
    this.draw();
    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;

    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
      this.velocity.y = 0;
    } else {
      this.velocity.y += gravity;
    }
  }
}

const player = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
});

const enemy = new Sprite({
  position: {
    x: 400,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 0,
  },
});

// Creating keys object to control movement the best way (without stuttering)
const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  w: {
    pressed: false,
  },
};

let lastKey;

// Создаем анимационный луп (animation loop)
const animate = () => {
  window.requestAnimationFrame(animate);

  // Clearing canvas to get rid of paint-like effect when animating player and enemy
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  player.update();
  enemy.update();

  // Checking for keys being pressed (and resetting velocity to not move the player when the key is no longer being pressed)
  player.velocity.x = 0;

  if (keys.a.pressed && lastKey === 'a') {
    player.velocity.x = -1;
  } else if (keys.d.pressed && lastKey === 'd') {
    player.velocity.x = 1;
  }
};

animate();

// Tracking player moves
window.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'd':
      // Move the player to the right
      keys.d.pressed = true;
      lastKey = 'd';
      break;
    case 'a':
      keys.a.pressed = true;
      lastKey = 'a';
      break;
    case 'w':
      keys.w.pressed = true;
      lastKey = 'w';
      break;

    default:
      break;
  }
});

// Cancelling player moves when he stops pressing keys
window.addEventListener('keyup', (e) => {
  switch (e.key) {
    case 'd':
      keys.d.pressed = false;
      break;
    case 'a':
      keys.a.pressed = false;
      break;
    case 'w':
      keys.w.pressed = false;

    default:
      break;
  }
});
