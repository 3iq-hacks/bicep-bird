import { Tangible } from "./Tangible";

export default class Player implements Tangible {

    jumpPressed = false;
    jumpInProgress = false;
    JUMP_SPEED = 0.7;
    GRAVITY = 0.08;

    ctx: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;
    gameWidth: number;
    gameHeight: number;
    width: number;
    height: number;
    image: HTMLImageElement;
    x: number;
    y: number;

    constructor(
        ctx: CanvasRenderingContext2D, 
        gameWidth: number, 
        gameHeight: number, 
        width: number, 
        height: number
    ) {

        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.width = width;
        this.height = height;
        this.image = new Image();
        this.image.src = "images/player.png";
        this.x = 5;
        this.y = this.gameHeight - this.height;

        // Keyboard input
        window.removeEventListener("keydown", this.keydown);
        window.removeEventListener("keyup", this.keyup);

        window.addEventListener("keydown", this.keydown);
        window.addEventListener("keyup", this.keyup);

    }

    keydown = (event: KeyboardEvent) => {
        if (event.code === "Space") {
          this.jumpPressed = true;
        }
    };
    
    keyup = (event: KeyboardEvent) => {
        if (event.code === "Space") {
          this.jumpPressed = false;
        }
    };

    update(frameTimeDelta: number) {
        this.y += this.JUMP_SPEED * (frameTimeDelta / 10);
        if (this.y < this.gameHeight - this.height && this.y >= 120) {
            this.JUMP_SPEED += this.GRAVITY * (frameTimeDelta / 10);
        }
        // Hit top
        else if (this.y <= 120) {
            this.JUMP_SPEED = 0;
            this.y = 120;
        }
        // Hit bottom
        else {
            this.JUMP_SPEED = 0;
            this.y = this.gameHeight - this.height;
        }
        if (this.jumpPressed) {
            this.JUMP_SPEED = -2;
        }
    }
        

    draw() {
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}
