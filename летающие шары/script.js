window.addEventListener("load", main, false);
function main() {

	var ctx = canvas_example.getContext('2d');
	var w = canvas_example.width;
	var h = canvas_example.height;
	var fps = 60;
	var dt = 1/fps;
	var V = 20;
	
	var balls = [];
	var R = 5;
	var N = 50;

	function Ball(x0, y0, R, Vx, Vy) {
		this.x=x0;
		this.y=y0;
		this.R=R;
		this.Vx=Vx;
		this.Vy=Vy;
		this.collides=function(other){
			return (this.x-other.x)**2+(this.y-other.y)**2<=(this.R+other.R)**2
		}
	
		this.draw=function(ctx){
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.R, 0, Math.PI*2);
			ctx.fill();
		};
	}

	for (var i = 0; i<N; i++) {
		var x = Math.random()*w;
		var y = Math.random()*h;
		var Vx = Math.random()*2*V-V;
		var Vy = Math.random()*2*V-V;
		var ball = new Ball(x, y, R, Vx, Vy);
		ball.draw(ctx);
		balls.push(ball);
	}

	function draw(){
		ctx.clearRect(0, 0, w, h);
		for (var i=0; i<balls.length; i++) {
			balls[i].draw(ctx);
		}

	}

	function phisics(){
		for (var i=0;i<balls.length; i++) {
			balls[i].x += balls[i].Vx*dt;
			balls[i].y += balls[i].Vy*dt;
			if (balls[i].x>w+R) {
				balls[i].x-=w+2*R;
			}
			if(balls[i].y>h+R) {
				balls[i].y-=h+2*R;
			}
			if(balls[i].y<-R) {
				balls[i].y+=h+2*R;
			}
			if (balls[i].x<-R) {
				balls[i].x+=w+2*R;
			}

		}
		for(var i=0;i<balls.length; i++) {
			for (var j=i; j<balls.length; j++) {
				if (balls[i].collides(balls[j])){
					var a = balls[i].Vx;

					balls[i].Vx = balls[j].Vx;
					balls[j].Vx = a;

					var a = balls[i].Vy;
					balls[i].Vy=balls[j].Vy;
					balls[j].Vy=a;
		
				}

			}

		}


	}

	function step(){
		draw();
		phisics();
	}
	setInterval(step, 1000/fps)
}