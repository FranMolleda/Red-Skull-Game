class Player {
    constructor(ctx, image, posX, posY, width, height, keys, frames) {
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

        this.vX = 0; //desplacamiento eje X
        this.vY = 0; //desplacamiento eje Y
        this.gravity = 0.1;

        this.frames = frames;
        this.framesIndex = 0;

        this.keys = keys;

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
    }

    move() {
        
            this.posX += this.vX
            this.posY += this.vY
    
    }

    setListeners() {
        document.addEventListener('keydown', (e) => {
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
                    this.vX -= 2;
                    break;
                case this.keys.kRight:
                    this.vX += 2;
                    break;

            }
        })
    }

    animate(framesCounter) {
        if (framesCounter % 10 === 0) {
            if (this.framesIndex >= this.frames -1 ) this.framesIndex = 0;
            this.framesIndex++;
        }
    }
}