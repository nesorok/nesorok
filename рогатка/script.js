window.addEventListener("load", main, false);
function main() {

	var ctx = canvas_example.getContext('2d');
	var w = canvas_example.width;
	var h = canvas_example.height;
	
	var fps = 60;
	var dt = 1/fps;
	var x0;
	var y0;


	var move = false;
	var k = - 5;
	var b = -0.2;


	var ball = {
		x: w/2,
		y: h/2,
		r: 50,
		vx: 0,
		vy: 0,

	}

	function draw () {
		ctx.clearRect( 0, 0, w, h);
		ctx.beginPath();
		ctx.arc(ball.x, ball.y, ball.r, 0,2*Math.PI);
		ctx.fill();
	}

	function calc () {
		ball.vx += b*ball.vx*dt;
		ball.vy += b*ball.vy*dt;
		ball.x += ball.vx*dt;
		ball.y += ball.vy*dt;
		if(ball.x>=w-ball.r || ball.x<=ball.r){
			ball.vx=-ball.vx;
		}
		if(ball.y>=h-ball.r || ball.y<=ball.r){
			ball.vy = -ball.vy;
		} 

	}

	function control () {
		calc();
		draw();
	}

	canvas_example.onmousedown = function(e){
		
		if((ball.x- e.offsetX)**2+(ball.y- e.offsetY)**2 <= ball.r**2){
			ball.vx = 0;
			ball.vy = 0;
			move = true;
			x0 = ball.x;
			y0 = ball.y;
		}
	}

	canvas_example.onmousemove = function(e){
		if(move){
			ball.x = e.offsetX;
			ball.y = e.offsetY;

		}

	}

	canvas_example.onmouseup = function(e){
		if(move){
			move = false;	
			ball.vx = k*(e.offsetX-x0);
			ball.vy = k*(e.offsetY-y0);
		}
	

	}

	setInterval(control, 1000/fps);
}