class Enemies {
    constructor(ctx, image, posX, posY, width, height, vX) {
        this.ctx = ctx;

        this.image = new Image();
        this.image.src = image;

        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;

        this.frames = 8;
        this.framesIndex = 0;
        this.vY = 2
        this.vX = vX;
        this.value = this.posX - this.vX

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

    move(level) {
        if (level === 1) {
            this.posX -= this.vX;
        }

        if (level === 2) {

            this.posX -= this.vX
            this.posY += this.vY

            if (this.posX <= 5) {
                this.vX *= -1
                this.image.src = './img/grey-ghostInterLeft.png'
            }

            if (this.posX >= window.innerWidth - 60) {
                this.vX *= -1
                this.image.src = './img/grey-ghostInter.png'
            }

            if (this.posY >= window.innerHeight - 60) {
                this.vY *= -1
            }

            if (this.posY <= 1) {
                this.vY *= -1
            }

        }

        if (level === 3) {
        
            this.posX -= this.vX

            if (this.posX <= 5) {
                this.vX *= -1
                this.image.src='./img/bombRight.png'
            }

            if (this.posX >= window.innerWidth) {
                this.vX *= -1
                this.image.src='./img/bombLeft.png'
            }

        }

        if (level === 4) {

            this.posX -= this.vX
            this.posY += this.vY

            if (this.posX <= 5) {
                this.vX *= -1
                this.image.src = './img/yellow-monster.png'
            }

            if (this.posX >= window.innerWidth - 60) {
                this.vX *= -1
                this.image.src = './img/yellow-monster.png'
            }

            if (this.posY >= window.innerHeight - 60) {
                this.vY *= -1
            }

            if (this.posY <= 1) {
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