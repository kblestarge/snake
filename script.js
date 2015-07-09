$(document).ready(function(){

	//Canvas stuff
	var canvas = $("#canvas")[0];
	var ctx = canvas.getContext("2d");
	var w = $("#canvas").width();
	var h = $("#canvas").height();

	//Global variables:
	var cw = 15;
	var colors = ['white',"#F0C600", "#FF9000", "orange", "#DB5800", '#D90000', '#2E0927'];
	var swap = true;
	var posNeg;
	var xy;
	var snake_array = [];
	var head;
	var keyPressed = false;
	var foodEaten = false;
	var food = {};
	var score;
	var highScore = 0;
	var level;
	var levelUp;
	var gameSpeed;
	var colorInc;
	var onePass;

	//reset function
	function init(){
		onePass = false;
		score = 0;
		level = 1;
		levelUp = false;
		swap = true
		posNeg = 1;
		xy = 'y';
		snake_array = [];
		gameSpeed = 100;
		colorInc = 0;

		create_snake();
		createFood();
		game_loop_norm();
	}
	init()
	

	function main(){

		foodEaten = false;
		keyPressed = false;
		paint();

	}


	function create_snake()
	{
		snake_array.push({x: 5, y:6, color: '#59631E'});
		snake_array.push({x: 5, y:5, color: '#8EA106'});
		snake_array.push({x: 5, y:4, color: '#8EA106'});
		snake_array.push({x: 5, y:3, color: '#8EA106'});
		snake_array.push({x: 5, y:2, color: '#8EA106'});
	}

	function move_snake(){

		//move head
		var old_head_x = snake_array[0]['x'];
		var old_head_y = snake_array[0]['y'];

		//move body
		for(var i = snake_array.length-1; i > 0; i--){

				snake_array[i]['x'] = snake_array[i-1]['x'];
				snake_array[i]['y'] = snake_array[i-1]['y'];
		}

		snake_array[0][xy] += posNeg;
	}

	function death_check(){
		head = snake_array[0];
		var touch = false;

		for(var i = 1; i < snake_array.length; i++){
			if(snake_array[i].x == snake_array[0].x && snake_array[i].y == snake_array[0].y){
				touch = true;
			}
		}

		if(head.x*cw >= w || head.x < 0 || head.y*cw >= h || head.y < 0  || touch){
			
			//save high score
			if(highScore < score){
				highScore = score;

				var highScoreElm = document.getElementById('high-score');
				highScoreElm.innerHTML = 'High Score: '+highScore;
			}

			//reset
			init();
		}
	}

	//Lets paint the lights now
	function paint()
	{	
		paintCanvas();

		move_snake();

		death_check();

		foodEaten = foodCheck();

		//check Level
		if(score != 0 && score%3 == 0 && levelUp == false){
			level++;
			gameSpeed = gameSpeed-10;
			
			levelUp = true;
			onePass = false;
		}

		paintScore();
		paintLevel();

		if(foodEaten){
			createFood();
			paintFood(food);

		}else{
			paintFood(food);
		}

		//Paint snake
		for(var i = 0; i < snake_array.length; i++){

			var c = snake_array[i];

			ctx.fillStyle = c.color;
			ctx.fillRect(c.x*cw, c.y*cw, cw, cw);
			ctx.strokeStyle = "white";
			ctx.strokeRect(c.x*cw, c.y*cw, cw, cw);
		}
		
		//This needs to happen only once
		//increase speed and change color on levelUp
		if(levelUp && !onePass){

			changeColor();
			clearInterval(game_loop);
			game_loop = setInterval(main, gameSpeed);

			onePass = true;
		}
	}

	function paintCanvas(){

		//canvas
		ctx.fillStyle = colors[colorInc];
		ctx.fillRect(0, 0, w, h);
		ctx.strokeStyle = "#59631E";
		ctx.strokeRect(0, 0, w, h);
	}

	function changeColor(){

		colorInc++;
		if(colorInc > colors.length){
			colorInc = 0;
		}
	}

	function paintScore(){
		ctx.font = "350px Arial";
		ctx.fillStyle = "#C9D787";
		ctx.strokeStyle = "#C9D787";
		ctx.textAlign = "center";
		ctx.fillText(level,w/2, h/1.4);

		var scoreElm = document.getElementById('score');
		scoreElm.innerHTML = 'Score: '+score;
	}

	function paintLevel(){
		var levelElm = document.getElementById('level');
		levelElm.innerHTML = 'Level: '+level;
	}

	function createFood(){
		do{
			food.x = Math.floor((Math.random() * w/cw));
			food.y = Math.floor((Math.random() * h/cw));
			food.color = '#705B35';
		}while(inBody());

		onePass = false;
	}

	function inBody(){
		var inBod = false;
		for(var i = 0; i < snake_array.length; i++){
			if(snake_array[i].x == food.x && snake_array[i].y == food.y){
				inBod = true;
			}
		}
		return inBod;
	}

	function paintFood(food){
		ctx.fillStyle = food.color;
		ctx.fillRect(food.x*cw, food.y*cw, cw, cw);
		ctx.strokeStyle = "white";
		ctx.strokeRect(food.x*cw, food.y*cw, cw, cw);
	}

	function foodCheck(){
		if(snake_array[0].x == food.x && snake_array[0].y == food.y){

			var index = snake_array.length-1;
    		var newX = snake_array[index].x;
    		var newY = snake_array[index].y;

    		//Snake gets longer
    		snake_array.push({x: newX, y: newY, color: '#8EA106'});

    		levelUp = false;
    		score++;

    		return true;
		}else{
			return false;
		}
	}



	$("body").keydown(function(e) {

		if(!keyPressed){
    		if(e.keyCode == 37 && xy != 'x') { //left
	    		xy = 'x';
	    		posNeg = -1;
	    		keyPressed = true;
	    	}else if(e.keyCode == 38 && xy != 'y') { //up
	    		xy = 'y';
	    		posNeg = -1;
	    		keyPressed = true;
	    	}else if(e.keyCode == 39 && xy != 'x') { //right
	    		xy = 'x';
	    		posNeg = 1;
	    		keyPressed = true;
	    	}else if(e.keyCode == 40 && xy != 'y') { //down
	    		xy = 'y';
	    		posNeg = 1;
	    		keyPressed = true;
	    	}
		}

	})

	game_loop_norm();
	function game_loop_norm(){
		if(typeof game_loop != "undefined") clearInterval(game_loop);
		game_loop = setInterval(main, gameSpeed);
	}

})
