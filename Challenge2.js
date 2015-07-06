$(document).ready(function(){
	//Canvas stuff
	var canvas = $("#canvas")[0];
	var ctx = canvas.getContext("2d");
	var w = $("#canvas").width();
	var h = $("#canvas").height();
	var checker = [];

	//Lets save the cell width in a variable for easy control
	var cellWidth = 56.25;

	//Lets paint the canvas now
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, w, h);
	ctx.strokeStyle = "black";
	ctx.strokeRect(0, 0, w, h);

	function makeChecker(){
		for (var i = 0; i < w/cellWidth; i++){
			if(i % 2 === 0){
				for (var j = 0; j < h/cellWidth; j += 2){
					checker.push({x:i, y:j});
				}
			} else {
				for (var j = 1; j < h/cellWidth; j += 2){
					checker.push({x:i, y:j});
				}
			}
		}
	}
	makeChecker();
	console.log("checker:",checker);

	function paint(){
		//Start code here
		for (var i = 0; i < checker.length; i++){
			ctx.fillStyle = "orange";
			ctx.fillRect(checker[i]['x']*cellWidth, checker[i]['y']*cellWidth, cellWidth, cellWidth);
			ctx.strokeStyle = "black";
			ctx.strokeRect(checker[i]['x']*cellWidth, checker[i]['y']*cellWidth, cellWidth, cellWidth);
		}
	}
	paint();

});
