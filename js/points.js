class Points {
    constructor(ctx, image, posX, posY, width, height){
        this.ctx = ctx;
        this.image = new Image();
        this.image.src = image,


        this.posX = posX;
        this.posY = posY
        this.width = width;
        this.height = height;

        this.vY = 2
        this.vX = 5
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

    move(level){
        if(level === 1 || level === 2){
            this.posX -= this.vX
        }

        


        if(level === 3){
            
            this.posX -= this.vX 
            this.posY += this.vY
            
            if (this.posX <= 5) {
                this.vX *= -1
            }

           if(this.posX >= window.innerWidth){
              this.vX *= -1
           }

           if(this.posY >= 750){
            this.vY *= -1
         }

         if(this.posY <= 1){
            this.vY *= -1
         }

        }
    }

    animate(framesCounter) {
        if (framesCounter % 10 === 0) {
            if (this.framesIndex >= this.frames - 1) this.framesIndex = 0;
            this.framesIndex++;
        }
    }
}