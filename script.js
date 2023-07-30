const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = (canvas.width = 1024);
const CANVAS_HEIGHT = (canvas.height = 576);

// Красим канвас в черный цвет
ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

class Sprite {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
  }

  draw() {
    ctx.fillStyle = 'red';
    ctx.fillRect(this.position.x, this.position.y, 50, 150);
  }

  update() {
    this.draw();
    this.position.y += 10;
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

player.draw();

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

enemy.draw();

// Создаем анимационный луп (animation loop)
const animate = () => {
  window.requestAnimationFrame(animate);
};

animate();
