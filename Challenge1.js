$(document).ready(function(){
	//Canvas stuff
	var canvas = $("#canvas")[0];
	var ctx = canvas.getContext("2d");
	var w = $("#canvas").width();
	var h = $("#canvas").height();

	//Lets save the cell width in a variable for easy control
	var cw = 50;

	//Lets paint the canvas now
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, w, h);
	ctx.strokeStyle = "black";
	ctx.strokeRect(0, 0, w, h);

	ctx.fillStyle = "blue";
	ctx.fillRect(200, 200, cw, cw);
	ctx.strokeStyle = "white";
	ctx.strokeRect(200, 200, cw, cw);

	//Start code here 

	ctx.fillStyle = "red";
	ctx.fillRect(250, 250, cw, cw);
	ctx.strokeStyle = "white";
	ctx.strokeRect(250, 250, cw, cw);

	ctx.fillStyle = "green";
	ctx.fillRect(150, 150, cw, cw);
	ctx.strokeStyle = "white";
	ctx.strokeRect(150, 150, cw, cw);

	ctx.fillStyle = "yellow";
	ctx.fillRect(150, 250, cw, cw);
	ctx.strokeStyle = "white";
	ctx.strokeRect(150, 250, cw, cw);

	ctx.fillStyle = "orange";
	ctx.fillRect(250, 150, cw, cw);
	ctx.strokeStyle = "white";
	ctx.strokeRect(250, 150, cw, cw);
});
