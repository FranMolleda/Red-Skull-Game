class Player {
    constructor(ctx, image, posX, posY, width, height, keys, frames, level) {
        this.ctx = ctx;

        this.image = new Image();
        this.image.src = image;

        this.posX = posX;
        this.posY = posY;
        this.posYFloor = 700;
        this.width = width;
        this.height = height;
        this.posXMax = this.width - 67
        this.posYMax = this.height - 67

        this.vX = 0;
        this.vY = 0;
        this.gravity = 0.1;

        this.frames = frames;
        this.framesIndex = 0;

        this.keys = keys;
        this.level = level

        this.bullets = [];
        this.canShoot = true;


        this.setListeners();


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

        this.clearBullets()
        this.bullets.forEach(bullet => bullet.draw())
    }

    move() {

        this.posX += this.vX
        this.posY += this.vY

        if (this.level === 3 && this.posY <= 570 || this.level === 4 && this.posY <= 570) {
            this.vY += 0.2
        }

        this.bullets.forEach(bullet => bullet.move())

    }

    setListeners(level) {
        document.addEventListener('keydown', (e) => {
            if (this.level === 1 || this.level === 2) {
                switch (e.keyCode) {
                    case this.keys.kSpace:
                        this.vY -= 4;
                        break;
                    case this.keys.kUp:
                        this.vY -= 2;
                        break;
                    case this.keys.kDown:
                        this.vY += 2;
                        break;
                    case this.keys.kLeft:
                        this.image.src = './img/playerSpriteLeft.png'
                        this.vX -= 2;
                        break;
                    case this.keys.kRight:
                        this.image.src = './img/playerSprite.png'
                        this.vX += 2;
                        break;
                }

            }


            if (this.level === 3) {
                switch (e.keyCode) {
                    case this.keys.kSpace:
                        this.vY -= 3;
                        break;
                    case this.keys.kLeft:
                        this.image.src = './img/playerSpriteLeft.png'
                        this.vX -= 2;
                        break;
                    case this.keys.kRight:
                        this.image.src = './img/playerSprite.png'
                        this.vX += 2;
                        break;
                }

            }

            if (this.level === 4) {
                switch (e.keyCode) {
                    case this.keys.kSpace:
                        this.vY -= 3;
                        break;
                    case this.keys.kLeft:
                        this.image.src = './img/playerSpriteLeft.png'
                        this.vX -= 2;
                        break;
                    case this.keys.kRight:
                        this.image.src = './img/playerSprite.png'
                        this.vX += 2;
                        break;
                    case this.keys.kUp:
                        this.vY -= 2
                        break;
                }

            }

        })
    }


    animate(framesCounter) {
        if (framesCounter % 10 === 0) {
            if (this.framesIndex >= this.frames - 1) this.framesIndex = 0;
            this.framesIndex++;
        }
    }


    clearBullets() {
        this.bullets = this.bullets.filter(bullet => bullet.posY >= -10)
    }
}