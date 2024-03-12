window.addEventListener("load", main, false)
function main() {

	var ctx = canvas_example.getContext('2d');
	var w = canvas_example.width;
	var h = canvas_example.height;
	var x_min = -2;
	var x_max = 2;
	var y_max=2;
    var y_min=-2;
	var N = 100;
	var delta = (x_max - x_min)/N
	var scaleX = w/(x_max - x_min)
	var scaleY = h/(y_max - y_min)

	
	function axis()
	{
		ctx.beginPath();
		ctx.moveTo(w / 2, 0);
		ctx.lineTo(w / 2, h);
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo(w/2, h);
		ctx.lineTo(w/2, 0);
		ctx.stroke();
	}

	axis();

	function f(x)

		{	
			return parseFloat(a1.value) * Math.pow(x,5) + parseFloat(a2.value) * Math.pow(x,4) + parseFloat(a3.value) * Math.pow(x,3) + parseFloat(a4.value) * Math.pow(x,2) + parseFloat(a5.value) * Math.pow(x,1) + parseFloat(a6.value);
		}
		

	start_button.onclick=function()
	{
		ctx.clearRect(0,0,w, h);
		axis();
		ctx.beginPath();
		for (var x = x_min; x <= x_max; x += delta )
		{
				ctx.lineTo(x * scaleX + w/2, f(x) * scaleY + h / 2);

		}
		ctx.stroke();

	}
}