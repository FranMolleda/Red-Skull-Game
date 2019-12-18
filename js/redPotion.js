class RedPotion {
    constructor(ctx, image, posX, posY, width, height){
        this.ctx = ctx;

        this.image = new Image();
        this.image.src = image;

        this.posX = 1400//Math.floor(Math.random(10 - 1200)* 1000)+ 10;
        this.posY = Math.floor(Math.random(500 - 600)* 300)+300;
        this.width = width;
        this.height = height;

        this.vY = 3;
        this.vX = 3.1

        this.frames = 6;
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


    move(framesCounter){
       // this.posY += this.vY;
        this.posX -= this.vX;

    }

    animate(framesCounter) {
        if (framesCounter % 10 === 0) {
            if (this.framesIndex >= this.frames - 1) this.framesIndex = 0;
            this.framesIndex++;
        }
    }


}