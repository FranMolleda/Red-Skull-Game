class EnemyBullet {
    constructor(ctx,image, posX, posY, width, height) {
      this.ctx = ctx;
  
      this.image = new Image();
      this.image.src = './img/eye.png'

      this.posX =  posX;
      this.posY = posY;
      this.width= width;
      this.height= height;
  
      this.vx = 5;
      this.vy = 1;
      this.gravity = 0.05;

      this.frames = 8;
      this.framesIndex = 0;
    }
  
    draw(framesCounter) {
      this.ctx.drawImage(
          this.image,
          (this.image.width / this.frames) * this.framesIndex,
          0,
          this.image.width / this.frames,
          this.image.height,
          this.posX,
          this.posY,
          this.width,
          this.height,
      )
      this.animate(framesCounter)
    }
  
    move() {
      this.posY += this.vy;
      this.vy += this.gravity;
      if(this.posY>= innerHeight - 95){
        this.posY = innerHeight -95
        this.image.src = './img/airExplosion.png'
        this.frames = 6
      }
  
      //Accelerate > 1 &&  Decelerate < 1
      //if(this.posY >= this.floor + this.playerHeight) this.vy *= -1
    }

    animate(framesCounter) {
      if (framesCounter % 10 === 0) {
          if (this.framesIndex >= this.frames - 1) this.framesIndex = 0;
          this.framesIndex++;
      }
  }
  
  }