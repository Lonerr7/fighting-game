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

// Создаем анимационный луп (animation loop)
const animate = () => {
  window.requestAnimationFrame(animate);
  // Clearing canvas to get rid of paint-like effect when animating player and enemy
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  player.update();
  enemy.update();
};

animate();
