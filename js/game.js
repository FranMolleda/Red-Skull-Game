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
    nextLevel: 2,


    init: function () {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.start();
    },


    start: function () {
        this.explosionSound = new Sound('sounds/explosion.wav')
        this.levelOneSound = new Sound('sounds/level-one.wav')
        this.levelTwoSound = new Sound('sounds/level-two.mp3')
        this.levelThreeSound = new Sound('sounds/level-three.mp3')
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


            if (this.framesCounter > 2000) this.framesCounter = 0;
            if (this.level === 1) {
                this.levelOneSound.play()
                if (this.framesCounter % 100 === 0) this.generateEnemyMosquito()
                if (this.framesCounter % 50 === 0) this.generatePoints()
            }

            if (this.level === 2) {
                this.levelOneSound.pause()
                this.levelTwoSound.play()
                if (this.framesCounter % 550 === 0) this.generateEnemyGhost()
                if (this.framesCounter % 150 === 0) this.generatePoints()
            }
            if (this.level === 3) {
                this.levelTwoSound.pause()
                this.levelThreeSound.play()
                if (this.framesCounter % 550 === 0) this.generateEnemyBombLeft()
                if (this.framesCounter % 100 === 0) this.generatePoints()
            }
            if (this.player === this.playerExplosion) this.explosionSound.play()
            if (this.player === this.playerExplosion) setTimeout(function () {
                this.gameOver()
            }.bind(this), 1000)
            if (this.isCollision()) this.player = this.playerExplosion
            if (this.isCollision()) this.enemyBombLeft = this.playerExplosion
            if (this.isCollision()) this.enemyMosquito = this.playerExplosion
            if (this.isCollisionPoints()) this.nextLevel -= 1
            if (this.isCollisionPoints()) this.score += 1
            if (this.nextLevel <= 0) {
                this.level++;
                this.congratulationsSound = new Sound('sounds/congratulations.wav')
                this.congratulationsSound.play()
                this.nextLevel = 1
                this.changeLevel()

                if (this.level > 3) {
                    clearInterval(this.interval)
                    setTimeout(function () {
                        window.location.href = "./well_done.html"
                    }, 1000);
                }
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
            this.player = new Player(this.ctx, './img/playerSprite.png', 400, 300, 70, 70, this.playerKeys, 8, 1)
        }




        if (this.level == 2) {
            this.background = new Background(this.ctx, "./img/cove-brown.jpg", this.width, this.height, 3);
            this.player = new Player(this.ctx, './img/playerSpriteLeft.png', innerWidth/2, 300, 70, 70, this.playerKeys, 8, 2)

        }



        if (this.level == 3) {
            this.background = new Background(this.ctx, "./img/backgroundNight2.jpg", this.width, this.height, 3);
            this.backgroundCloud = new Background(this.ctx, "./img/backgroundCloud3.png", this.width, this.height, 4);
            this.player = new Player(this.ctx, './img/playerSprite.png', this.width / 2, innerHeight - 130, 70, 70, this.playerKeys, 8, 3);

        }
    },


    reset: function () {
        ScoreBoard.init(this.ctx, this.score, this.nextLevel)
        this.changeLevel()

    },


    clear: function () {
        this.ctx.clearRect(0, 0, this.width, this.height)

    },


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
            this.points.forEach(point => point.draw(this.framesCounter));
            this.player.draw(this.framesCounter);
            this.enemyBombLeft.forEach(enemyM => enemyM.draw(this.framesCounter));
        }

        ScoreBoard.draw(this.score, this.nextLevel)
    },


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
            this.backgroundCloud.move()
            this.points.forEach(point => point.move(this.level));
            this.enemyBombLeft.forEach(enemyM => enemyM.move(this.level));
            this.player.move()
            this.player.vy = 1
            this.player.gravity = 0.05
            if (this.player.posY <= innerHeight - 130) {
                this.player.posY += this.player.vY;
                this.player.vY += this.player.gravity;
            } else {
                this.player.vY = 1;
                this.player.posY = innerHeight - 130
            }
        }
    },





    generateEnemyMosquito: function () {
        this.enemyMosquito.push(new Enemies(this.ctx, './img/bat-MosquitoSprite.png', 1500, Math.floor(Math.random(10 - 600) * 600) + 100, 70, 70, 8))
    },


    generateEnemyGhost: function () {
        this.enemyGhost.push(new Enemies(this.ctx, './img/grey-ghostInter.png', Math.floor(Math.random(500 - 600) * 900) + 100, 0, 70, 70, 3))
    },


    generateEnemyBombLeft: function () {
        this.enemyBombLeft.push(new Enemies(this.ctx, './img/bombLeft.png', window.innerWidth, innerHeight - 130, 70, 70, 5))
    },


    generatePoints: function () {
        if (this.level === 1) {
            this.points.push(new Points(this.ctx, './img/mosquito-azul.png', 1500, Math.floor(Math.random(500 - 600) * 500) + 100, 40, 25))
        }
        if (this.level === 2) {
            this.points.push(new Points(this.ctx, './img/mosquito-azulLeft.png', -10, Math.floor(Math.random(500 - 600) * 500) + 100, 40, 25))
        }
        if (this.level === 3) {
            this.points.push(new Points(this.ctx, './img/mosquito-azul.png', Math.floor(Math.random(10 - 700) * 600) + 700, 0, 40, 25))
        }
    },




    isCollision: function () {
        // colisiones genéricas 
        //return (p.x + p.w > o.x && o.x + o.w > p.x && p.y + p.h > o.y && o.y + o.h > p.y)

        this.enemyGhost.forEach((obs, vIndex) => {
            if (this.player.posX + this.player.width > obs.posX && obs.posX + obs.width > this.player.posX && this.player.posY + this.player.height > obs.posY && obs.posY > this.player.posY) {
                this.enemyGhost.splice(vIndex, 1)
                this.player.gravity *= -1

            }
        })


        if (this.level === 1) {
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

        }

        if (this.level === 2) {
            if (this.player.posX < 0)
                this.player = this.playerExplosion = new Player(this.ctx, './img/airExplosion.png', this.player.posX, this.player.posY, 70, 70, this.playerKeys, 6)
            if (this.player.posX > this.canvas.width - 67)
                this.player = this.playerExplosion = new Player(this.ctx, './img/airExplosion.png', this.player.posX, this.player.posY, 70, 70, this.playerKeys, 6)
            if (this.player.posY < 0)
                this.player = this.playerExplosion = new Player(this.ctx, './img/airExplosion.png', this.player.posX, this.player.posY, 70, 70, this.playerKeys, 6)
            if (this.player.posY > this.canvas.height - 67)
                this.player = this.playerExplosion = new Player(this.ctx, './img/airExplosion.png', this.player.posX, this.player.posY, 70, 70, this.playerKeys, 6)

        }


        if (this.level === 3) {
            if (this.enemyBombLeft.some(obs => (this.player.posX + 35 > obs.posX && obs.posX + obs.width > this.player.posX && this.player.posY + this.player.height - 10 > obs.posY && obs.posY + +obs.height - 10 > this.player.posY)))
                this.player = this.playerExplosion = new Player(this.ctx, './img/airExplosion.png', this.player.posX, this.player.posY, 70, 70, this.playerKeys, 6)
            if (this.player.posX < 0)
                this.player = this.playerExplosion = new Player(this.ctx, './img/groundExplotion.png', this.player.posX, this.player.posY, 70, 70, this.playerKeys, 5)
            if (this.player.posX > this.canvas.width - 67)
                this.player = this.playerExplosion = new Player(this.ctx, './img/groundExplotion.png', this.player.posX, this.player.posY, 70, 70, this.playerKeys, 5)
            if (this.player.posY < 0)
                this.player = this.playerExplosion = new Player(this.ctx, './img/airExplosion.png', this.player.posX, this.player.posY, 70, 70, this.playerKeys, 6)
            if (this.player.posY > this.canvas.height - 80)
                this.player = this.playerExplosion = new Player(this.ctx, './img/airExplosion.png', this.player.posX, this.player.posY, 70, 70, this.playerKeys, 6)

        }

    },


    isCollisionPoints: function () {
        this.points.forEach((obs, vIndex) => {
            if (this.player.posX + this.player.width / 2 > obs.posX && obs.posX + obs.width > this.player.posX && this.player.posY + this.player.height > obs.posY && obs.posY > this.player.posY) {
                this.points.splice(vIndex, 1)
                this.score++
                this.nextLevel--
                this.pointSound = new Sound('sounds/pointss.wav')
                this.pointSound.play()

            }
        })
    },


    clearEnemyMosquito: function () {
        this.enemyMosquito = this.enemyMosquito.filter(enemyM => (enemyM.posX >= -100))
    },


    clearEnemyGhost: function () {
        if (this.enemyGhost.length > 4) {
            this.enemyGhost.pop()
        }
    },


    clearPoints: function () {
        this.points = this.points.filter(point => (point.posX >= -50))
        if (this.level === 3 && this.points.length > 5) {
            this.points.shift()
        }

    },


    clearEnemyBombLeft: function () {
        if (this.enemyBombLeft.length > 3) {
            this.enemyBombLeft.pop()
        }

    },

    gameOver: function () {
        this.levelThreeSound.pause()
        clearInterval(this.interval)
        setTimeout(function () {
            window.location.href = "./game_over.html"
        }, 2000);

    },

}