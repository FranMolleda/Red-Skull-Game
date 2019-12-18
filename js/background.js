class Background {
    constructor(ctx, image, width, height, speed) {
        this.canvas = document.getElementById('canvas')
        this.ctx = this.canvas.getContext('2d');
        this.posX = 0;
        this.posY = 0;
        this.width = width;
        this.height = height;
        this.image = new Image();
        this.image.src = image;
        this.speed = speed;
    }

    draw() {
        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height);
        this.ctx.drawImage(this.image, this.posX+this.width, this.posY, this.width, this.height);
    }

    move() {
        this.posX -= this.speed;
        this.posX %= this.canvas.width;
        //Es igual que esto:
        //if(this.posX <= -this.width) this.posX = 0;
    }
}