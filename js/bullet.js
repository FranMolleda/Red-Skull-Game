class Bullet {
    constructor(ctx, posX, posY, playerWidth, playerHeight) {
      this.ctx = ctx;
  
      this.posX = posX + 10;
      this.posY = posY;
      this.playerHeight= playerHeight;
      this.playerWidth=playerWidth;
      this.image = new Image();
      this.image.src = './img/mosquito-blue.png'
  
      this.vx = 0;
      this.vy = 4;
    }
  
    draw() {

      this.ctx.drawImage(this.image, this.posX, this.posY, 100, 100)

    }
  
    move() {

      this.posY -= this.vy;
  
    }
  
  }