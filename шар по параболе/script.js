window.addEventListener("load", main, false);
function main() {

	var ctx = canvas_example.getContext('2d');
	var w = canvas_example.width;
	var h = canvas_example.height;

	var angle = parseFloat(angleinput.value)/180*Math.PI;
	var speed = parseFloat(speedinput.value);
	var fps = 60;
	var x = 0;
	var y = 0;
	var g = 9.8;
	var vx = speed*Math.cos(angle);
	var vy = speed*Math.sin(angle);
	var dt = 1/fps;
	var timer;
	var X =[x];
	var Y= [y];

	function oxy() {
		for (var i = 0; i<400 ; i+= 10 ) {
			ctx.beginPath();
			ctx.moveTo(i, 0);
			ctx.lineTo(i, h);
			ctx.stroke();
			ctx.moveTo(0, i);
			ctx.lineTo(w, i);
			ctx.stroke();

		}
	}

	function line (a, b, c, d) {
		ctx.beginPath();
		ctx.moveTo(a, b);
		ctx.lineTo(c, d);
		ctx.stroke();
	}

	function XtoPX (x) {
		return (x*10);
	}

	function YtoPX(y) {
		return (h - y*10);
	}

	function control() {
		physics();
		draw();
	} 

	function circle(x, y) {
		ctx.beginPath();
		ctx.arc(x, y, 10, 0, 2*Math.PI);
		ctx.stroke();

	}

	function draw() {
		ctx.clearRect(0, 0, w, h);
		circle(XtoPX(x), YtoPX(y));
		oxy();
		for ( var i = 0; i< X.length-1; i++){
			line (XtoPX(X[i]), YtoPX(Y[i]), XtoPX(X[i+1]), YtoPX(Y[i+1]));
		}
	}

	function physics() {
		 x = x + dt*vx;
		 X.push(x);
		 vy = vy - g*dt;
		 y = y + dt*vy;
		 Y.push(y);
		if (y <= 0) {
			clearInterval(timer);
		}
	}

	
	HelloButton.onclick = function() {
		if (timer != undefined) {
			clearInterval(timer);
		}
		x=0;
		y=0;
		angle = (parseFloat(angleinput.value))/180*Math.PI;
		speed = parseFloat(speedinput.value);
		vx = speed*Math.cos(angle);
		vy = speed*Math.sin(angle);

		timer = setInterval(control, 1000/fps);


	}
}