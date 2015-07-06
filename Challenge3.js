$(document).ready(function(){
	//Canvas stuff
	var canvas = $("#canvas")[0];
	var ctx = canvas.getContext("2d");
	var w = $("#canvas").width();
	var h = $("#canvas").height();

	//Lets save the cell width in a variable for easy control
	var cw = 10;

	//Lets paint the canvas now
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, w, h);
	ctx.strokeStyle = "black";
	ctx.strokeRect(0, 0, w, h);

	//Lets create the square now
	var square_array; //an array of cells to make up the square

	create_square();
	function create_square()
	{
		var length = 5; //Length of the square
		var row = 20;
		var col = 20;
		square_array = []; //Empty array to start with

		//Start code here
		for(var i = col; i < (col + length); i++){
			square_array.push({x:i, y:20});
			square_array.push({x:i, y:24});
			square_array.push({x:20, y:i});
			square_array.push({x:24, y:i});
		}
	}

	//Lets paint the square now
	function paint()
	{
		for(var i = 0; i < square_array.length; i++)
		{
			var c = square_array[i];
			//Lets paint 10px wide cells
			ctx.fillStyle = "blue";
			ctx.fillRect(c.x*cw, c.y*cw, cw, cw);
			ctx.strokeStyle = "white";
			ctx.strokeRect(c.x*cw, c.y*cw, cw, cw);
		}
	}
	paint();

});
