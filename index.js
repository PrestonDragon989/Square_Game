//Imports (Player, Enemy, Collision, Utils, Vector Math)
import { Player, Enemy } from "./scripts/entities.mjs";
import { Collision } from "./scripts/collision.mjs";
import Utils from './scripts/utils.mjs';
import Vector2 from "./vector.mjs";

// Class Game, to handle all main game features
class Game {
    constructor() {
        // Create drawing variales (Our Game Canvas, Context, and Resolution)
        this.canvas = document.getElementById("game-canvas");
        this.c = this.canvas.getContext("2d");

        // Store the last timestamp for calculating time elapsed between frames
        this.lastTimestamp = 0;

        // Getting Delta Time to Start
        this.deltaTime = 0;

        //Utils
        this.utils = new Utils();

        // Creating Player Instance, and movement
        this.player = new Player(this.c, this.canvas, 100, 100);
        if (this.canvas) this.handleInput();

        //Creating Enemy Instance
        this.enemy = new Enemy(this.canvas, this.c, this.player);

        //Collisions
        this.collision = new Collision(this.player);

        // Starting Game
        this.gameLoop();
    }

    // Handling Player Movement
    handleInput() {
        // Keydown event
        window.addEventListener("keydown", (event) => {
            switch (event.key) {
                //WASD Movement Keys
                case "a":
                    this.player.keysPressed.ALeft = true;
                    break;
                case "d":
                    this.player.keysPressed.DRight = true;
                    break;
                case "w":
                    this.player.keysPressed.WUp = true;
                    break;
                case "s":
                    this.player.keysPressed.SDown = true;
                    break;

                //Arrow Moement Keys
                case "ArrowLeft":
                    this.player.keysPressed.left = true;
                    break;
                case "ArrowRight":
                    this.player.keysPressed.right = true;
                    break;
                case "ArrowUp":
                    this.player.keysPressed.up = true;
                    break;
                case "ArrowDown":
                    this.player.keysPressed.down = true;
                    break;
            }
        });

        // Keyup event
        window.addEventListener("keyup", (event) => {
            switch (event.key) {
                //WASD Movement Keys
                case "a":
                    this.player.keysPressed.ALeft = false;
                    break;
                case "d":
                    this.player.keysPressed.DRight = false;
                    break;
                case "w":
                    this.player.keysPressed.WUp = false;
                    break;
                case "s":
                    this.player.keysPressed.SDown = false;
                    break;

                //Arrow Moement Keys
                case "ArrowLeft":
                    this.player.keysPressed.left = false;
                    break;
                case "ArrowRight":
                    this.player.keysPressed.right = false;
                    break;
                case "ArrowUp":
                    this.player.keysPressed.up = false;
                    break;
                case "ArrowDown":
                    this.player.keysPressed.down = false;
                    break;
            }
        });

        //Get Mouse Position
        this.canvas.addEventListener('mousemove', (event) => {
            this.rect = this.canvas.getBoundingClientRect();
            this.mouseX = event.clientX - this.rect.left;
            this.mouseY = event.clientY - this.rect.top;
        });

        //Left Click Detection
        this.canvas.addEventListener('click', (event) => {
            console.log(event.clientX, event.clientY);
        });

        //Right Click Detection
        this.canvas.addEventListener('contextmenu', (event) => {
            event.preventDefault();
            console.log(event.clientX, event.clientY);
        });
    }

    // Game Logic
    update() {
        //Player Move
        this.player.handleInput()
        
        //Player Collison
        this.collision.playerCollision(this.canvas);
}

    // Rendering Function to handle All rendering Needs
    render() {
        // Drawing Screen Background
        this.c.fillStyle = "rgb(45, 45, 45)";
        this.c.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Rendering Player
        this.player.render();
    }

    // The game loop function
    gameLoop(timestamp) {
        // Calculate time elapsed since the last frame
        this.deltaTime = (timestamp - this.lastTimestamp) / 1000; // Convert to seconds

        /* Logic From Here */
        // Update game logic based on elapsed time
        this.update();

        // Render the game
        this.render();

        /* To Here */
        // Store the current timestamp for the next frame
        this.lastTimestamp = timestamp;

        // Request the next frame
        requestAnimationFrame(this.gameLoop.bind(this));
    }
}

// Create an instance of the Game class
const game = new Game();
