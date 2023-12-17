//Imports (Player, Enemy, Collision, Utils, Vector Math)
import { Player, Enemy } from "./scripts/entities.mjs";
import { Collision } from "./scripts/collision.mjs";
import Utils from './scripts/utils.mjs';
import Vector2 from "./scripts/vector.mjs";

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

        //Pause Icon Info
        this.pauseIcon = new Image();
        this.pauseIcon.src = "images/misc/pause-icon.png";
        this.pauseIconSize = 100;
        this.gamePaused = false;

        // Creating Player Instance, and movement
        this.player = new Player(this.c, this.canvas, 100, 100);

        //Creating Enemy Instance
        this.enemy = new Enemy(this.canvas, this.c, this.player);

        //Collisions
        this.collision = new Collision(this.player, this.enemy);

        //Dev Mode
        this.devMode = false;
        this.devAlert = false;
        this.devCommand = "";
        this.devKeys = {
            alt: false,
            1: false,
            2: false,
            3: false,
            4: false,
        };

        // Starting Game
        this.runGame()
    }

    runGame() {
        if (this.enemy.basicEnemyData !== undefined && this.player.playerWeapons !== undefined) {
            //Setting Default Settings
            this.player.currentWeapon.leftShoot = this.player.playerWeapons["defaultShoot"];
            this.player.currentWeapon.rightShoot = this.player.playerWeapons["defaultShotgun"];
            this.gameLoop();
            this.handleInput();
        } else {
            // Wait for the basicEnemyData to be loaded before starting the game loop
            setTimeout(() => this.runGame(), 100);
        }
    }

    // Handling Player Movement
    handleInput() {
        // Keydown event
        window.addEventListener("keydown", (event) => {
            switch (event.key) {
                case "t":
                    this.enemy.spawnEnemy([null, null], 1000, this.enemy.basicEnemyData["basicRedEnemy"], null);
                    break;
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

                //Pause Button
                case "Escape":
                    if (!this.gamePaused) {
                    this.gamePaused = true;
                    break;
                    } else {
                        this.gamePaused = false;
                        break;
                    }
                case "p":
                    if (!this.gamePaused) {
                    this.gamePaused = true;
                    break;
                    } else {
                        this.gamePaused = false;
                        break;
                    }

                //Dev Mode 
                case "Enter":
                    this.devKeys.alt = true;
                    break;
                case "1":
                    this.devKeys[1] = true;
                    break;
                case "2":
                    this.devKeys[2] = true;
                    break;
                case "3":
                    this.devKeys[3] = true;
                    break;
                case "4":
                    this.devKeys[4] = true;
                    break;

                case "/":
                    if (this.devMode) this.devCommand = prompt("Enter Dev Command: ");
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

                //Dev Mode 
                case "Enter":
                    this.devKeys.alt = false;
                    break;
                case "1":
                    this.devKeys[1] = false;
                    break;
                case "2":
                    this.devKeys[2] = false;
                    break;
                case "3":
                    this.devKeys[3] = false;
                    break;
                case "4":
                    this.devKeys[4] = false;
                    break;
            }
        });

        //Get Mouse Position
        this.canvas.addEventListener('mousemove', (event) => {
            this.rect = this.canvas.getBoundingClientRect();
            this.mouseX = event.offsetX;
            this.mouseY = event.offsetY;
        });

        //Left Click Detection
        this.canvas.addEventListener('click', (event) => {
            if (!this.gamePaused) this.player.playerLeftShoot(event.offsetX, event.offsetY);
        });

        //Right Click Detection
        this.canvas.addEventListener('contextmenu', (event) => {
            if (!this.gamePaused) this.player.playerRightShoot(event.offsetX, event.offsetY);
            event.preventDefault();
        });
    }
    devCheckCommand() {
        //Stopping Dev Mode 
        if (this.devCommand.toLocaleLowerCase() === "stop" || this.devCommand.toLocaleLowerCase() == "end") {this.devMode = false; this.player.img.src = "images/entities/player/player-square.png";}
        
        //List of Dev Mode Commands
        else if (this.devCommand.toLocaleLowerCase() === "list") alert("You can enter in a command by Pressing /.\nYou can see this list again by typing in the command \"list\".\nHere is a list of commands you can do:\n\n  -1. End / Stop (Ends Dev Mode)\n  -2. List (Shows a List of Commands)\n  -3. Weapon (Changes a weapon you have (Left or Right))\n  -4. Health (Adds or Subtracts Health from the Player)");
        
        //Changing Weapon
        else if (this.devCommand.toLocaleLowerCase() === "weapon" || this.devCommand.toLocaleLowerCase() === "weapons") {
            let changeWeapon = prompt("Enter \"left\" or \"right\" to show which weapon you wish to change. If you want a list of the weapons, type \"list\".");
            if (changeWeapon === "list") {
                alert("Here is a list of all the weapons:\n\n  Left Weapons\n  1. basicShoot\n  2. quickShoot\n  3. slowShoot\n  4. sniperShoot\n\n Right Weapons\n  1. mediumShotgun\n  2. bigShotgun\n  3. hugeShotgun\n  4. smallShotgun\n  5. bazooka");
                changeWeapon = prompt("Enter \"left\" or \"right\" to show which weapon you wish to change. If you want a list of the weapons, type \"list\". Warning, this is Case sensitive.");
                if (changeWeapon.toLocaleLowerCase() === "left") {changeWeapon = prompt("Enter which weapon you wish to change the left click to. Warning, this is Case sensitive.")
                    if (changeWeapon != "") this.player.currentWeapon.leftShoot = this.player.playerWeapons[changeWeapon];
                } else {
                changeWeapon = prompt("Enter which weapon you wish to change the right click to:")
                if (changeWeapon != "") this.player.currentWeapon.rightShoot = this.player.playerWeapons[changeWeapon];
            }
            } else if (changeWeapon.toLocaleLowerCase() === "left") {changeWeapon = prompt("Enter which weapon you wish to change the left click to. Warning, this is Case sensitive.")
            if (changeWeapon != "") this.player.currentWeapon.leftShoot = this.player.playerWeapons[changeWeapon];
            } else {
                changeWeapon = prompt("Enter which weapon you wish to change the right click to:")
                if (changeWeapon != "") this.player.currentWeapon.rightShoot = this.player.playerWeapons[changeWeapon];
            }
        } 
        
        //Changing Health
        else if (this.devCommand.toLocaleLowerCase() === "health") {
            let increaseHealth = prompt("Enter how much you wish to increase the health of the player by:");
            if (increaseHealth!= "" && parseInt(increaseHealth) != NaN) this.player.health += parseInt(increaseHealth);
        } 
        
        // Showing Player Stats
        else if (this.devCommand.toLocaleLowerCase() === "stats") alert(`Player Health: ${this.player.health}\nPlayer Size: ${this.player.height} x ${this.player.width}\nCords: (${this.player.x}, ${this.player.y})\nPlayer Speed: ${this.player.speed}`);
        this.devCommand = "";
    }

    // Game Logic
    update() {
        //Game Paused 
        if (this.gamePaused) {
            this.c.drawImage(this.pauseIcon, this.canvas.width / 2 - this.pauseIconSize / 2, this.canvas.height / 2 - this.pauseIconSize / 2, this.pauseIconSize, this.pauseIconSize);
            return;
        }
        
        //Dev Mode Features
        if (this.devKeys.alt && this.devKeys[1] && this.devKeys[2] && this.devKeys[3] && this.devKeys[4]) {
            this.devMode = true;
            this.devKeys.alt = false;
            this.devKeys [1] = false;
            this.devKeys [2] = false;
            this.devKeys [3] = false;
            this.devKeys [4] = false;
            this.player.img.src = "images/entities/player/dev-mode-square.png";
            if (!this.devAlert) {
                this.devAlert = true;
                if (confirm("Dev Mode is Enabled.\nYou can enter a command by Pressing Enter.\nPress OK to see a list of commands you can do. ")) {
                    alert("You can enter in a command by Pressing /.\nYou can see this list again by typing in the command \"list\".\nHere is a list of commands you can do:\n\n  -1. End / Stop (Ends Dev Mode)\n  -2. List (Shows a List of Commands)\n  -3. Weapon (Changes a weapon you have (Left or Right))\n  -4. Health (Adds or Subtracts Health from the Player)");
                }
            }
        } else if (!this.devMode) this.devAlert = false;
        if (this.devCommand != "") this.devCheckCommand();

        //Player Move
        this.player.handleInput();

        //Bullet Update
        this.player.bulletMovement();
        
        //Player Collison
        this.collision.wallCollision(this.canvas);

        // Checking Enemy Death
        this.enemy.checkDeath();
}

    // Rendering Function to handle All rendering Needs
    render() {
        // Drawing Screen Background
        this.c.fillStyle = "rgb(45, 45, 45)";
        this.c.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Rendering Enemy
        this.enemy.render();

        // Rendering Player
        this.player.render();

        // Paues Icon
        if (this.gamePaused) this.c.drawImage(this.pauseIcon, (this.canvas.width / 2 - 100), (this.canvas.height / 2 - 100), 200, 200);
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
//if (confirm("By using this webpage, you agree to let our company take your credit card information, as well as use it. By clicking \"OK\" you agree to this.")) {
    const game = new Game();
//}
