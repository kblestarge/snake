$(document).ready(function(){
	//Canvas stuff
	var canvas = $("#canvas")[0];
	var ctx = canvas.getContext("2d");
	var w = $("#canvas").width();
	var h = $("#canvas").height();

	//Lets save the cell width in a variable for easy control
	var cw = 40;
	var colors = ["green", "yellow", "red"];


	//Lets create the lights now
	var lights_array = []; //an array of cells to make up the lights

	create_lights();
	function create_lights()
	{
		lights_array.push({x: 5, y:4, color: colors[0]});
		lights_array.push({x: 5, y:5, color: colors[1]});
		lights_array.push({x: 5, y:6, color: colors[2]});
	}

	//Lets paint the lights now
	function paint()
	{
		//To avoid the lights trail we need to paint the BG on every frame
		//Lets paint the canvas now
		ctx.fillStyle = "white";
		ctx.fillRect(0, 0, w, h);
		ctx.strokeStyle = "black";
		ctx.strokeRect(0, 0, w, h);

		//The movement code for the lights to come here.
		//Start code here

		var temp = lights_array[2]['color'];
		lights_array[2]['color'] = lights_array[0]['color'];
		lights_array[0]['color'] = temp;

		console.log("temp:",temp);

		for(var i = 0; i < lights_array.length; i++)
		{
			var c = lights_array[i];
			//Lets paint 10px wide cells
			ctx.fillStyle = c.color;
			ctx.fillRect(c.x*cw, c.y*cw, cw, cw);
			ctx.strokeStyle = "white";
			ctx.strokeRect(c.x*cw, c.y*cw, cw, cw);
		}
	}

	//Lets move the lights now using a timer which will trigger the paint function
	//every 600ms
	game_loop = setInterval(paint, 600);


})
