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
      //this.gravity = 0.9;
    }
  
    draw() {

      this.ctx.drawImage(this.image, this.posX, this.posY, 30, 30)

    }
  
    move() {

      this.posY -= this.vy;
  
    }
  
  }