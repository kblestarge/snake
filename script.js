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

	var posNeg = 1;
	var xy = 'y';
	var snake_array = [];

	create_snake();
	function create_snake()
	{
		snake_array.push({x: 5, y:6, color: colors[0]});
		snake_array.push({x: 5, y:5, color: colors[1]});
		snake_array.push({x: 5, y:4, color: colors[2]});
		snake_array.push({x: 5, y:3, color: colors[0]});
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
		if(head.x*cw >= w || head.x < 0 || head.y*cw >= h || head.y < 0){
			
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

		for(var i = 0; i < snake_array.length; i++){

			var c = snake_array[i];

			ctx.fillStyle = c.color;
			ctx.fillRect(c.x*cw, c.y*cw, cw, cw);
			ctx.strokeStyle = "white";
			ctx.strokeRect(c.x*cw, c.y*cw, cw, cw);
		}
	}

	// function foodSpawn(){
	// 	//randomly generate x and y coordinates for food spawn
	// }

	// function eatFood(){
	// 	//collide event listener
	// 	//snake array touches food

	// 	//increment food eaten
	// 	//if so many food are eaten, new level.
	// }

	// function eatSelf(){
	// 	//collide event listener
	// 	//snake array touches itself

	// 	//restart
	// }

	// function onKeyPress(){ //change direction

	// }

	function main(){

		paint();

	}

	$("body").keydown(function(e) {
    	if(e.keyCode == 37 && xy != 'x') { //left
    		xy = 'x';
    		posNeg = -1;
    	}else if(e.keyCode == 38 && xy != 'y') { //up
    		xy = 'y';
    		posNeg = -1;
    	}else if(e.keyCode == 39 && xy != 'x') { //right
    		xy = 'x';
    		posNeg = 1;
    	}else if(e.keyCode == 40 && xy != 'y') { //down
    		xy = 'y';
    		posNeg = 1;
    	}else if(e.keyCode == 32) { //spac e

    		var index = snake_array.length-1;
    		var newX = snake_array[index].x;
    		var newY = snake_array[index].y;

    		snake_array.push({x: newX, y: newY, color: colors[3]});
    	}
	})

	//re-paint many times each second
	game_loop = setInterval(main, 300);


})
