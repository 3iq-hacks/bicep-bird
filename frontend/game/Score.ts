export default class Score {
    ctx: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;
    scaleRatio: number;
    score: number;
    x: number;
    y: number;

    constructor(
        ctx: CanvasRenderingContext2D, 
        scaleRatio: number, 
        score: number, 
        x: number, 
        y: number
    ) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.score = score;
        this.canvas = ctx.canvas;
        this.scaleRatio = scaleRatio;
    }

    update(score: number) {
        this.score += score;
    }

    reset(){
        this.score = 0;
    }

    draw() {
        this.ctx.fillStyle = "black";
        const fontSize = 35;
        this.ctx.font = `${fontSize}px serif`;
        this.ctx.fillText(this.score.toString(), this.x, this.y);
    }
}
