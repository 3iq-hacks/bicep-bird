import Player from "./Player";
import Score from "./Score";
import Fish from "./Fish";
import Time from "./Time";
import { Tangible } from "./Tangible";

// Game variables
const GAME_WIDTH = 700;
const GAME_HEIGHT = 600;
const PLAYER_WIDTH = 93;
const PLAYER_HEIGHT = 51;
const SMALL_FISH_WIDTH = 54;
const SMALL_FISH_HEIGHT = 27;
const BIG_FISH_WIDTH = 87;
const BIG_FISH_HEIGHT = 42;
const BAD_FISH_WIDTH = 153;
const BAD_FISH_HEIGHT = 75;
const SECOND = 1000;
const POP_SCORE_DURATION = 700;

// Scoreboard UI
const top_g = new Image();
top_g.src = "images/top_g.png";

export default class Game {
    // Function variables
    // initializing with random doodoo
    previousTime: number | null = null;
    scaleRatio: number = 1;
    pop_score_duration: number = POP_SCORE_DURATION;
    game_over: boolean = false;
    main_menu: boolean = true;
    secondTimer: number = SECOND;

    // Game objects
    player: Player;
    score: Score;
    time: Time;
    bad_fish: Fish;
    small_fish: Fish;
    big_fish: Fish;
    popup_score?: Score;
    fishes: Fish[];
    
    ctx: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;

    constructor(
        ctx: CanvasRenderingContext2D
    ) {
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        
        // these initializations are garbage, just to get rid of errors
        this.player = new Player(this.ctx, GAME_WIDTH, GAME_HEIGHT, PLAYER_WIDTH, PLAYER_HEIGHT);
        this.score = new Score(this.ctx, this.scaleRatio, 0, 270, 110);
        this.time = new Time(this.ctx, this.scaleRatio);
        this.bad_fish = new Fish(this.ctx, GAME_WIDTH, GAME_HEIGHT, BAD_FISH_WIDTH, BAD_FISH_HEIGHT, 0.9, -45, "images/bad_fish.png");
        this.small_fish = new Fish(this.ctx, GAME_WIDTH, GAME_HEIGHT, SMALL_FISH_WIDTH, SMALL_FISH_HEIGHT, 0.6, 30, "images/small_fish.png");
        this.big_fish = new Fish(this.ctx, GAME_WIDTH, GAME_HEIGHT, BIG_FISH_WIDTH, BIG_FISH_HEIGHT, 0.5, 60, "images/big_fish.png");
        this.fishes = [this.bad_fish, this.small_fish, this.big_fish];
    }

    setScreen() {
        this.scaleRatio = 1;
        this.canvas.width = GAME_WIDTH * this.scaleRatio;
        this.canvas.height = GAME_HEIGHT * this.scaleRatio;
        this.createSprites();
    }
    
    createSprites() {
        this.player = new Player(this.ctx, GAME_WIDTH, GAME_HEIGHT, PLAYER_WIDTH, PLAYER_HEIGHT);
        this.score = new Score(this.ctx, this.scaleRatio, 0, 270, 110);
        this.time = new Time(this.ctx, this.scaleRatio);
        this.bad_fish = new Fish(this.ctx, GAME_WIDTH, GAME_HEIGHT, BAD_FISH_WIDTH, BAD_FISH_HEIGHT, 0.9, -45, "images/bad_fish.png");
        this.small_fish = new Fish(this.ctx, GAME_WIDTH, GAME_HEIGHT, SMALL_FISH_WIDTH, SMALL_FISH_HEIGHT, 0.6, 30, "images/small_fish.png");
        this.big_fish = new Fish(this.ctx, GAME_WIDTH, GAME_HEIGHT, BIG_FISH_WIDTH, BIG_FISH_HEIGHT, 0.5, 60, "images/big_fish.png");
        this.fishes = [this.bad_fish, this.small_fish, this.big_fish];
    }

    resetSprites() {
        this.player.y = GAME_HEIGHT - PLAYER_HEIGHT;
        this.bad_fish.reset();
        this.small_fish.reset();
        this.big_fish.reset();
    }

    clearScreen() {
        this.ctx.fillStyle = "cyan";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    collides(a: Tangible, b: Tangible) {
        if (a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y) return true;
        return false;
    }

    start() {
        this.game_over = false
        if (this.time.time > 0) {
            // Start game
            this.main_menu = false;
        } else {
            // Restart game
            this.main_menu = true;
            this.time.reset();
            this.score.reset();
            this.resetSprites();
        }
    }

    gameLoop(currentTime: number) {
        // First time func called to get frame rate
        if(this.previousTime === null) {
            this.previousTime = currentTime;
            requestAnimationFrame(num => this.gameLoop(num));
            return;
        }
        this.clearScreen();
        
        if (this.main_menu) {
            this.ctx.fillStyle = "black";
            this.ctx.font = "30px serif";
            this.ctx.fillText("Any key to Start", 300, 300);
        } else if (!this.game_over) {
            const frameTimeDelta = currentTime - this.previousTime;
            this.previousTime = currentTime;
            this.secondTimer -= frameTimeDelta;
            if (this.secondTimer <= 0) {
                this.secondTimer = SECOND;
                this.time.time -= 1;
                if (this.time.time <= 0) {
                    this.game_over = true;
                }
            }
    
            // Update
            this.player.update(frameTimeDelta);
            this.bad_fish.update(frameTimeDelta);
            this.small_fish.update(frameTimeDelta);
            this.big_fish.update(frameTimeDelta);
    
            this.fishes.forEach(fish => {
    
                // Check for collisions between fishes and player
                if (this.collides(this.player, fish) && this.player.x + (this.player.width / 2) < fish.x) {
                    this.score.update(fish.points);
                    fish.x = GAME_WIDTH;
                    fish.y = Math.random() * (GAME_HEIGHT - fish.height - 120) + 120;
                    this.popup_score = new Score(this.ctx, this.scaleRatio, fish.points, this.player.x + 60, this.player.y);
                    this.pop_score_duration = POP_SCORE_DURATION;
                    
                }
                
                // Check if fish has hit wall
                if (fish.x < 0) {
                    fish.x = GAME_WIDTH;
                    fish.y = Math.random() * (GAME_HEIGHT - fish.height - 120) + 120;
                }
            });
    
            // Draw
            this.player.draw();
            this.score.draw();
            this.fishes.forEach(fish => {
                fish.draw();
            });
            if (this.pop_score_duration > 0) {
                this.popup_score?.draw();
                this.pop_score_duration -= frameTimeDelta;
            }
            this.time.draw();
            this.ctx.drawImage(top_g, 20, 0, 650, 120);
        } else {
            this.ctx.fillStyle = "black";
            this.ctx.font = "30px serif";
            this.ctx.fillText("Game Over", 300, 300);
            this.ctx.fillText("Score: " + this.score.score, 300, 400);
            this.ctx.fillText("Any key to Restart", 300, 500);
        }
    
        requestAnimationFrame(num => this.gameLoop(num));
    }
}