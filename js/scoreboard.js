const ScoreBoard = {
    ctx: undefined,
    score: undefined,
    width: window.innerWidth,
    height: window.innerHeight,
    nextLevel: undefined,

    init: function (ctx, score, nextLevel) {
        this.ctx = ctx;
        this.score = score;
        this.nextLevel = nextLevel;
    },

    draw: function (score, nextLevel) {
        this.ctx.fillStyle = "rgba(255,255,255,0.5)"
        this.ctx.font = '30px monoscape'
        this.ctx.fillText('Score', 20, 60)
        this.ctx.beginPath();
        
        this.ctx.strokeStyle = "rgba(255,0,0,0.65)"
        this.ctx.arc(130, 55, 30, 0, Math.PI * 2, true)
        this.ctx.stroke();
        this.ctx.save()
        if (score <= 9) {
            this.ctx.strokeStyle = "rgba(255,255,255,0.5)"
            this.ctx.font = '30px monoscape'
            this.ctx.fillText(score, 120, 65)
            this.ctx.lineWidth = 5
        } else {
            this.ctx.strokeStyle = "rgba(255,255,255,0.5)"
            this.ctx.font = '30px monoscape'
            this.ctx.fillText(score, 113, 65)
            this.ctx.lineWidth = 5

        }
        
        this.ctx.fillStyle = "rgba(255,0,0,0.65)"
        this.ctx.font = '32px monoscape'
        this.ctx.fillText('Next level', this.width - 250, 60)
        this.ctx.beginPath();
        this.ctx.strokeStyle = "rgba(255,255,255,0.5)"

        this.ctx.arc(this.width - 70, 55, 30, 0, Math.PI * 2, true)
        this.ctx.stroke();
        if (nextLevel <= 9) {
            this.ctx.fillStyle = "rgba(255,0,0,0.65)"
            this.ctx.font = '30px monoscape'
            this.ctx.fillText(nextLevel, this.width - 78, 65)
            this.ctx.lineWidth = 5


        } else if (nextLevel >= 10) {
            this.ctx.fillStyle = "rgba(255,0,0,0.65)"

            this.ctx.font = '30px monoscape'
            this.ctx.fillText(nextLevel, this.width - 87, 65)
            this.ctx.lineWidth = 5

        }

    }




}