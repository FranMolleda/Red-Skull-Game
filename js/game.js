const Game = {
    canvas: undefined,
    ctx: undefined,
    width: undefined,
    height: undefined,
    fps: 60,
    framesCounter: 0,
    playerKeys: {
        kUp: 38,
        kRight: 39,
        kLeft: 37,
        kDown: 40,
        kSpace: 32
    },
    level: 1,


    score: 0,
    nextLevel: 1,

    //Todo lo que tenemos que precargar (todos los elementos del DOM) antes de "lanzar" el documento y lo llamamos en el archivo index.js con window.onload()
    init: function () {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.start();
    },
    //Lo primero que debemos hacer es llamar a reset() para borrar y meteremos el window.requestAnimationFrame ()
    start: function () {
        this.reset()
        this.interval = setInterval(() => {
            this.framesCounter++;

            this.clear();
            this.drawAll();
            this.moveAll();
            this.clearEnemyMosquito()
            this.clearEnemyGhost()
            this.clearPoints()
            this.clearEnemyBombLeft()
            this.clearEnemyBombRight()
            
            
            if (this.framesCounter > 2000) this.framesCounter = 0;
            if (this.level === 1) {
                if (this.framesCounter % 100 === 0) this.generateEnemyMosquito()
                if (this.framesCounter % 50 === 0) this.generatePoints()
            }
            
            if (this.level === 2) {
                if (this.framesCounter % 350 === 0) this.generateEnemyGhost()
                if (this.framesCounter % 50 === 0) this.generatePoints()
            }
            if (this.level === 3) {  
                if (this.framesCounter % 150 === 0) this.generateEnemyBombLeft()
                if (this.framesCounter % 125 === 0) this.generatePoints()
            }
            if (this.player === this.playerExplosion) setTimeout(function () {
                this.gameOver()
            }.bind(this), 1000)
            if (this.isCollision()) this.player = this.playerExplosion
            if (this.isCollisionPoints()) this.score += 1
            if (this.isCollisionPoints()) this.nextLevel -= 1
            if (this.nextLevel <= 0) {
                this.nextLevel = 1
                this.level++;
                this.changeLevel()
            }
        }, 1000 / this.fps)
    },

    changeLevel: function () {
        this.points = [];
        this.enemyBombRight = [];
        this.enemyBombLeft = [];
        this.enemyMosquito = [];
        this.enemyGhost = [];
        if (this.level == 1) {
            this.background = new Background(this.ctx, "./img/cove.png", this.width, this.height, 3);
            this.backgroundCloud = new Background(this.ctx, "./img/backgroundCloud4.png", this.width, this.height, 4);
            this.player = new Player(this.ctx, './img/playerSprite.png', 400, 300, 70, 70, this.playerKeys, 8)

        }

        if (this.level == 2) {
            this.background = new Background(this.ctx, "./img/cove-brown.jpg", this.width, this.height, 3);
            this.player = new Player(this.ctx, './img/playerSprite.png', 400, 300, 70, 70, this.playerKeys, 8)

        }

        if (this.level == 3) {
            this.background = new Background(this.ctx, "./img/backgroundNight.jpg", this.width, this.height, 3);
            this.backgroundCloud = new Background(this.ctx, "./img/backgroundCloud3.png", this.width, this.height, 1);
            this.player = new Player(this.ctx, './img/playerSprite.png', 100, 600, 70, 70, this.playerKeys, 8);

        }
    },

    reset: function () {
        ScoreBoard.init(this.ctx, this.score, this.nextLevel)
        this.changeLevel()

    },
    //Borramos todo para volver a pintar
    clear: function () {
        this.ctx.clearRect(0, 0, this.width, this.height)
    },
    //Pintamos cada elemento (archivo.js que forme parte del juego)
    drawAll: function () {
        if (this.level === 1) {
            this.background.draw();
            this.enemyMosquito.forEach(enemyM => enemyM.draw(this.framesCounter));
            this.points.forEach(point => point.draw(this.framesCounter));

            this.player.draw(this.framesCounter);
            this.backgroundCloud.draw()
        }

        if (this.level === 2) {
            this.background.draw();
            this.enemyGhost.forEach(enemyM => enemyM.draw(this.framesCounter));
            this.points.forEach(point => point.draw(this.framesCounter));
            this.player.draw(this.framesCounter);

        }

        if (this.level === 3) {
            this.background.draw();
            this.backgroundCloud.draw()
            //this.enemyGhost.forEach(enemyM => enemyM.draw(this.framesCounter));
            this.points.forEach(point => point.draw(this.framesCounter));
            this.player.draw(this.framesCounter);
            this.enemyBombLeft.forEach(enemyM => enemyM.draw(this.framesCounter));
            this.enemyBombRight.forEach(enemyM => enemyM.draw(this.framesCounter));
        }



        ScoreBoard.draw(this.score, this.nextLevel)
    },
    //Todo lo que se mueve y no dependa de otros ficheros (como las balas del mario que dependen del player)
    moveAll: function () {
        if (this.level === 1) {
            this.background.move();
            this.backgroundCloud.move()
            this.enemyMosquito.forEach(enemyM => enemyM.move(this.level));
            this.player.move();
            this.points.forEach(point => point.move(this.level));

        }

        if (this.level === 2) {
            this.background.move();
            this.enemyGhost.forEach(enemyM => enemyM.move(this.level));
            this.points.forEach(point => point.move(this.level));
            this.player.move()
            this.player.vY += this.player.gravity
            this.player.posX += this.player.vX
            this.player.posY += this.player.vY
        }

        if (this.level === 3) {
           // this.background.move();
            this.backgroundCloud.move()
            this.points.forEach(point => point.move(this.level));
            this.enemyBombLeft.forEach(enemyM => enemyM.move(this.level));
          //  this.enemyBombRight.forEach(enemyM => enemyM.move(this.level));
            this.player.move()
            this.player.vy = 1
            this.player.gravity = 0.05
            if (this.player.posY <= this.player.posYFloor) {
                this.player.posY += this.player.vY;
                this.player.vY += this.player.gravity;
            } else {
                this.player.vY = 1;
                this.player.posY = this.player.posYFloor
            }
        }
    },

    generateEnemyMosquito: function () {
        this.enemyMosquito.push(new Enemies(this.ctx, './img/bat-mosquitoSprite.png', 1500, Math.floor(Math.random(10 - 600) * 600) + 100, 70, 70, 8))
    },

    generateEnemyGhost: function () {
        this.enemyGhost.push(new Enemies(this.ctx, './img/grey-ghostInter.png', Math.floor(Math.random(500 - 600)* 900)+100, 0, 70, 70, 3))
    },


    generateEnemyBombLeft: function () {
        this.enemyBombLeft.push(new Enemies(this.ctx, './img/bombLeft.png', window.innerWidth ,this.player.posYFloor, 70, 70, 5))
    },
   // generateEnemyBombRight: function () {
    //    this.enemyBombRight.push(new Enemies(this.ctx, './img/bombRight.png', -100, this.player.posYFloor, 70, 70))

   // },
    generatePoints: function () {
        if(this.level ===1){
        this.points.push(new Points(this.ctx, './img/mosquito-azul.png', 1500, Math.floor(Math.random(500 - 600)* 500)+100, 40, 25))
        }
        if(this.level ===2){
        this.points.push(new Points(this.ctx, './img/mosquito-azul.png', 1500, Math.floor(Math.random(500 - 600)* 500)+100, 40, 25))
        }
        if(this.level === 3){
            this.points.push(new Points(this.ctx, './img/mosquito-azul.png', Math.floor(Math.random(500 - 600)* 900)+100, 0, 40, 25))
        }
    },

    gameOver: function () {
        clearInterval(this.interval)
        setTimeout(function () {
            window.location.href = "./game_over.html"
        }, 1000);

    },

    isCollision: function () {
        // colisiones genéricas 
        //return (p.x + p.w > o.x && o.x + o.w > p.x && p.y + p.h > o.y && o.y + o.h > p.y)

        this.enemyGhost.forEach((obs, vIndex) => { //bucle para recorrer las victimas
            if (this.player.posX + this.player.width > obs.posX && obs.posX + obs.width > this.player.posX && this.player.posY + this.player.height > obs.posY && obs.posY > this.player.posY) {
                this.enemyGhost.splice(vIndex, 1)
                this.player.gravity *= -1

            }
        })



        if (this.enemyMosquito.some(obs => (this.player.posX + 35 > obs.posX && obs.posX + obs.width > this.player.posX && this.player.posY + this.player.height - 10 > obs.posY && obs.posY + +obs.height - 10 > this.player.posY)))
            this.player = this.playerExplosion = new Player(this.ctx, './img/airExplosion.png', this.player.posX, this.player.posY, 70, 70, this.playerKeys, 6)
        if (this.player.posX < 0)
            this.player = this.playerExplosion = new Player(this.ctx, './img/airExplosion.png', this.player.posX, this.player.posY, 70, 70, this.playerKeys, 6)
        if (this.player.posX > this.canvas.width - 67)
            this.player = this.playerExplosion = new Player(this.ctx, './img/airExplosion.png', this.player.posX, this.player.posY, 70, 70, this.playerKeys, 6)
        if (this.player.posY < 0)
            this.player = this.playerExplosion = new Player(this.ctx, './img/airExplosion.png', this.player.posX, this.player.posY, 70, 70, this.playerKeys, 6)
        if (this.player.posY > this.canvas.height - 67)
            this.player = this.playerExplosion = new Player(this.ctx, './img/airExplosion.png', this.player.posX, this.player.posY, 70, 70, this.playerKeys, 6)

    },


    isCollisionPoints: function () {

        this.points.forEach((obs, vIndex) => { //bucle para recorrer las victimas
            if (this.player.posX + this.player.width > obs.posX && obs.posX + obs.width > this.player.posX && this.player.posY + this.player.height > obs.posY && obs.posY > this.player.posY) {
                this.points.splice(vIndex, 1)
                this.score++
                this.nextLevel--
            }
        })
    },





    clearEnemyMosquito: function () {
        this.enemyMosquito = this.enemyMosquito.filter(enemyM => (enemyM.posX >= -100))
    },

    clearEnemyGhost: function () {
        if (this.enemyGhost.length >2) {
            this.enemyGhost.shift()
        }
    },

    clearPoints: function () {
        this.points = this.points.filter(point => (point.posX >= -50))
    },

    clearEnemyBombLeft: function () {
        //this.enemyBombLeft = this.enemyBombLeft.filter(rPotion => (rPotion.posY <= 850))
        if (this.enemyBombLeft.length > 1) {
            this.enemyBombLeft.pop()
        }

    },
    clearEnemyBombRight: function () {
        this.enemyBombRight = this.enemyBombRight.filter(rPotion => (rPotion.posY <= 850))

    },
}