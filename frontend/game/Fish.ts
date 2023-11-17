import { Tangible } from "./Tangible";

export default class Fish implements Tangible {
    ctx: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;
    gameWidth: number;
    gameHeight: number;
    width: number;
    height: number;
    image: HTMLImageElement;
    x: number;
    y: number;
    speed: number;
    points: number;


    constructor(
        ctx: CanvasRenderingContext2D, 
        gameWidth: number, 
        gameHeight: number, 
        width: number, 
        height: number, 
        speed: number, 
        points: number, 
        imageSrc: string
    ) {
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.width = width;
        this.height = height;
        this.image = new Image();
        this.image.src = imageSrc;
        this.x = gameWidth;
        this.y = (Math.random() * (gameHeight - height - 120)) + 120;
        this.speed = speed;
        this.points = points;
    }

    reset() {
        this.x = this.gameWidth;
        this.y = (Math.random() * (this.gameHeight - this.height - 120)) + 120;
    }

    update(frameTimeDelta: number) {
        this.x -= this.speed * (frameTimeDelta / 10);
    }
        

    draw() {
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}
