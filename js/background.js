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
        this.vx = 5
    }

    draw() {

        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height);
        this.ctx.drawImage(this.image, this.posX + this.width, this.posY, this.width, this.height);
        this.ctx.drawImage(this.image, this.posX, (this.posY + this.height), this.width, this.height) //Esta segunda imágen es para que aparezca a continuación de la otra y haga el efecto de movimiento continuo.
        this.ctx.drawImage(this.image, this.posX, (this.posY - this.height), this.width, this.height) //Esta segunda imágen es para que aparezca a continuación de la otra y haga el efecto de movimiento continuo.
        


    }

    move() {


        this.posX -= this.speed;
        this.posX %= this.canvas.width;


        //Es igual que esto:
        //if(this.posX <= -this.width) this.posX = 0;
    }
}