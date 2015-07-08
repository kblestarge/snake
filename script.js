$(document).ready(function(){

	//Canvas stuff
	var canvas = $("#canvas")[0];
	var ctx = canvas.getContext("2d");
	var w = $("#canvas").width();
	var h = $("#canvas").height();

	//Lets save the cell width in a variable for easy control
	var cw = 50;
	var colors = ["green", "yellow", "red", "orange"];
	var swap = true;
	var head;
	var keyPressed = false;
	var foodEaten = false;
	var food = {};

	var posNeg = 1;
	var xy = 'y';
	var snake_array = [];

	create_snake();
	createFood();

	function main(){

		foodEaten = false;
		keyPressed = false;
		paint();

	}


	function create_snake()
	{
		snake_array.push({x: 5, y:6, color: colors[0]});
		snake_array.push({x: 5, y:5, color: colors[1]});
		snake_array.push({x: 5, y:4, color: colors[2]});
		snake_array.push({x: 5, y:3, color: colors[0]});
		snake_array.push({x: 5, y:2, color: colors[1]});
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
			
			//reset
			swap = true
			posNeg = 1;
			xy = 'y';
			snake_array = [];
			create_snake();
		}
	}

	//Lets paint the lights now
	function paint()
	{
		//Initialize canvas
		ctx.fillStyle = "white";
		ctx.fillRect(0, 0, w, h);
		ctx.strokeStyle = "black";
		ctx.strokeRect(0, 0, w, h);

		move_snake();

		death_check();

		foodEaten = foodCheck();

		for(var i = 0; i < snake_array.length; i++){

			var c = snake_array[i];

			ctx.fillStyle = c.color;
			ctx.fillRect(c.x*cw, c.y*cw, cw, cw);
			ctx.strokeStyle = "white";
			ctx.strokeRect(c.x*cw, c.y*cw, cw, cw);
		}

		if(foodEaten){
			createFood();
			paintFood(food);
		}else{
			paintFood(food);
		}
	}

	function createFood(){
		do{
			food.x = Math.floor((Math.random() * 9));
			food.y = Math.floor((Math.random() * 9));
			food.color = colors[Math.floor((Math.random() * 4))];
		}while(inBody());
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

    		snake_array.push({x: newX, y: newY, color: colors[3]});

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
	    	}else if(e.keyCode == 32) { //space bar

	    		var index = snake_array.length-1;
	    		var newX = snake_array[index].x;
	    		var newY = snake_array[index].y;

	    		snake_array.push({x: newX, y: newY, color: colors[3]});
	    	}
		}

	})

	//re-paint many times each second
	game_loop = setInterval(main, 300);


})
