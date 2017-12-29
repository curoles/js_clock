// @brief:     JavaScript Clock Application
// @author:    Igor Lesik 2017
// @copyright: Igor Lesik 2017

// For todays date;
/*Date.prototype.today = function () { 
    return ((this.getDate() < 10)?"0":"") + this.getDate() +"/"+(((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"/"+ this.getFullYear();
}*/

// String of current time now in format: hh:mm
Date.prototype.timeNow = function () {
	var h = this.getHours();
	var m = this.getMinutes();
	var hStr = ((h < 10)? "0":"") + h;
	var mStr = ((m < 10)? "0":"") + m;
	var s = (this.getSeconds() % 2)? ":":" ";
    return hStr + s + mStr;
}

var gl_canvas;

function getCanvas() {
	return gl_canvas || (gl_canvas = document.getElementById("canvas"));
}

function paintClockFace(canvas, width, height, size)
{
	canvas.save();

	var x0 = width/2;
	var y0 = height/2;
	var r = size/2;

	canvas.fillStyle = "#112";
	canvas.beginPath();
	canvas.arc(x0, y0, r, 0, Math.PI*2, true);
	canvas.fill();
	
	var radialGradient = canvas.createRadialGradient(
	    x0, y0, 10,
		x0, y0, r/2
	);
	radialGradient.addColorStop(0, "rgba(255, 255, 255, 0.1)");
	radialGradient.addColorStop(1, "rgba(10, 255, 10, 0.1)");
	canvas.fillStyle = radialGradient;
	canvas.beginPath();
	canvas.arc(x0, y0, r, 0, Math.PI*2, true);
	canvas.fill();
	
	canvas.strokeStyle = "rgba(10, 255, 10, 0.1)"
	canvas.lineWidth = 1;
	canvas.arc(x0, y0, r - canvas.lineWidth, 0, Math.PI*2, true);
	canvas.stroke();
	
	canvas.restore();
}

function paintClockMarks(canvas, width, height, size)
{
	canvas.save();
	
	var x0 = width/2;
	var y0 = height/2;
	var r = size/2;

	canvas.lineWidth = 2;
	canvas.strokeStyle = "rgba(10, 10, 10, 0.5)";
	canvas.lineCap = "round";
	
	canvas.translate(x0, y0);

	for (let i = 0; i < 12; i++)
	{
	    canvas.beginPath();
	    canvas.moveTo(0, 0 + (r*3)/4);
	    canvas.lineTo(0, 0 + r);
	    canvas.stroke();
		canvas.rotate(Math.PI/6);
	}
	
	canvas.restore();
}

function paintTimeNumbers(canvas, width, height, size)
{
    // Save canvas context here and restore it at the end,
    // we do not want shadow effect to be applied to everything.	
	canvas.save();

	var fontSize = size/5;
	canvas.font = "bold italic "+fontSize+"px "+" DSEG7-Classic";

	var timeBkgText = "88:88"; // to see all segments
	var x0 = width/2 - (canvas.measureText(timeBkgText).width / 2);
	var y0 = height/2 + fontSize/2;

    // Show all segments of the digital display.
	canvas.fillStyle = "rgba(200, 200, 200, 0.05)"
	canvas.fillText(timeBkgText, x0, y0);

	// Make shallow shadow.
	/*canvas.shadowOffsetX = 2;
	canvas.shadowOffsetY = 2;
	canvas.shadowBlur = 0;
	canvas.shadowColor = "rgba(255, 255, 255, 0.3)";*/

	var date = new Date();
	canvas.fillStyle = "#1F1"
	canvas.fillText(date.timeNow(), x0, y0);
	
	// Restore canvas context, particularly turn off shadow.
	canvas.restore();
}

function paintTimeArcs(canvas, width, height, size)
{
	canvas.save();

	var x0 = width/2;
	var y0 = height/2;
	var r = size/2;
	var date = new Date();
	var s = date.getSeconds();
	var m = date.getMinutes() + s/60.0;
	var h = date.getHours() + m/60.0;
	var hourArc = (h > 0)? ((Math.PI*h)/12):0;
	var minArc = (m > 0)? ((Math.PI*m)/30):0;
	var secArc = (s > 0)? ((Math.PI*s)/30):0;

	canvas.translate(x0, y0);
	canvas.rotate(-Math.PI/2);

	canvas.strokeStyle = "rgba(10, 255, 10, 1.0)";
	canvas.lineCap = "butt";
	canvas.lineWidth = r/20;
	canvas.beginPath();
	canvas.arc(0, 0, r - canvas.lineWidth*1, 0, minArc, false);
	canvas.stroke();

	//canvas.strokeStyle = "rgba(10, 255, 10, 1.0)";
	canvas.beginPath();
	canvas.arc(0, 0, r - canvas.lineWidth*3, 0, hourArc, false);
	canvas.stroke();
	
	canvas.lineWidth = 1;
	canvas.beginPath();
	canvas.arc(0, 0, r, secArc - Math.PI/180, secArc, false);
	canvas.stroke();
	
	canvas.restore();
}


function paintClock()
{
    var canvas_element = getCanvas();
	var canvas = canvas_element.getContext("2d");
	canvas.fillStyle = "#112";
	canvas.fillRect(0, 0, canvas_element.width, canvas_element.height);
	
	var width = canvas_element.width;
	var height = canvas_element.height;
	var size = Math.min(width, height)-10;

	paintClockFace(canvas, width, height, size);
	
	paintTimeArcs(canvas, width, height, size);

	//paintClockMarks(canvas, width, height, size);

	paintTimeNumbers(canvas, width, height, size);
}

/* Resize the canvas to fit inside the window.
 *
 * TODO check window.innerWidth vs canvas.clientWidth
 */
function resizeCanvas()
{
	var canvas = getCanvas();
	canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
	
	paintClock();
}


/* First function to be called, initializes the App and draws clock image.
 *
 */
function initClockApp()
{
	// Register our callback on window resize event.
	window.addEventListener('resize', resizeCanvas, false);

	// Resize 2d canvas to fill the whole window.
	resizeCanvas();

	// Paint the clock image for first time.
    paintClock();

	// Repaint the clock image every second.
	setInterval(paintClock, 1000 /*millisec*/);
}