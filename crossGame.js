
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d'); 

let screenWidth = 1000;
let screenHeight = 500;
let size = 50;
var isGameLive = true;

class GameCharacter{
	
	constructor (x, y, width, height, color, xSpeed, ySpeed) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.color = color;
		this.xSpeed = xSpeed;
		this.ySpeed = ySpeed;
		this.maxSpeed = 5;
	}	 

	moveVertically () {

		if (this.y > screenHeight - 50 || this.y <= 0) {
			this.ySpeed = -this.ySpeed;
	}	

	this.y += this.ySpeed;
	}

	moveHorizontally () {

		if (this.x <= 0 || this.x > screenWidth - 50) {
			this.xSpeed = -this.xSpeed;
		}	

	this.x += this.xSpeed; 
	}	
}

function getRandomInt(max, min) {

	min = Math.ceil(min);
	max = Math.floor(max);

	return Math.floor(Math.random() * (max - min + 1)) + min;
}
	
var enemies = [

	new GameCharacter(getRandomInt(screenWidth-50, 335), getRandomInt(70, screenHeight-60), 50 , 50,"blue", 4, 4), 
	new GameCharacter(getRandomInt(screenWidth-50, 335), getRandomInt(70, screenHeight-60), 50, 50, "orange",4, 4),
	new GameCharacter(getRandomInt(screenWidth-50, 335), getRandomInt(70, screenHeight-60), 50, 50, "green",3,3),
];

//want to make player stationary initially so speed is zero
var player = new GameCharacter(50, 250, size, size, "white", 0, 0);

var treasure = new GameCharacter(950, 250, size, size, "black", 0, 3);

var sprites = {};

var loadSprites = function() {
	sprites.player = new Image();
	sprites.player.src = 'hero.png';

	sprites.background = new Image();
	sprites.background.src = 'floor.png';

	sprites.enemy = new Image();
	sprites.enemy.src = 'enemy.png';

	sprites.treasure = new Image();
	sprites.treasure.src = 'chest.png';

}

//moving character based on which key is pressed
document.onkeydown = function(event) {
	let keyPressed = event.keyCode;

	if (keyPressed == 39) {

		player.xSpeed = player.maxSpeed;
		player.ySpeed = 0; 
	}

	else if (keyPressed == 37) {

		player.xSpeed = -player.maxSpeed; 
		player.ySpeed = 0;	
	}

	else if (keyPressed==40) {
		player.ySpeed = player.maxSpeed;
		player.xSpeed = 0;
	}

	else if (keyPressed ==38) {
		player.ySpeed = -player.maxSpeed;
		player.xSpeed = 0;
	}

	else {
		player.xSpeed = 0;
		player.ySpeed = 0;
	}

};

//stops the character when the key is not pressed
document.onkeyup = function(event) {

	player.xSpeed = 0;
	player.ySpeed = 0;
};

//checks if there are any collisions
var checkCollisions = function(rect1, rect2) {
	var xOverlap = Math.abs(rect1.x - rect2.x) <= Math.max(rect1.width, rect2.width);
	var yOverlap = Math.abs(rect1.y - rect2.y) <= Math.max(rect1.height, rect2.height);

	return xOverlap && yOverlap;
};

//function that draws the characters into the canvas
var draw = function(){
ctx.clearRect(0, 0, screenWidth, screenHeight);

ctx.drawImage(sprites.background,0,0);
ctx.drawImage(sprites.player, player.x, player.y);
ctx.drawImage(sprites.treasure, treasure.x, treasure.y);

enemies.forEach(function(element) {

ctx.drawImage(sprites.enemy, element.x, element.y);
});
}

var update = function() {

	if (checkCollisions(player, treasure)) {
		endGame("You Win!");
	}	

	treasure.moveVertically();
	player.moveVertically();
	player.moveHorizontally();


	//moving the enemy accordingly 
	enemies.forEach(function(element) {

		if (checkCollisions(player, element)) {
			endGame("Game Over");
		}

		element.moveVertically();
		element.moveHorizontally();
	});
}

//resetting the game when the game ends by refreshing page
var endGame = function(string){
	isGameLive = false;
	alert(string);
	window.location	= ""; //refreshes the page

}

var step = function() {
	update();
	draw(); 
	
	if (isGameLive) {
		window.requestAnimationFrame(step); //loops the steps
	}
}
loadSprites();
step();
