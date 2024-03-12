window.addEventListener("load", main, false)
function main() {

	var a;
	var b;
	var oper;

	function addnumber(s){
		if (number_input.value == "0"){
			number_input.value = s;
		}
		else {
			number_input.value += s;
		}
	}

	button_clear.onclick = function(){
		number_input.value = number_input.value.substring(0, number_input.value.length-1);
		if(number_input.value==''){
			number_input.value="0";
		}
	}

	button_point.onclick = function(){
		if (!number_input.value.includes('.')){
			number_input.value+='.'
		}
	}

	button1.onclick = function(){
		addnumber(1);
	}
	button2.onclick= function(){
		addnumber(2);
	}
	button3.onclick= function(){
		addnumber(3);
	}
	button4.onclick= function(){
		addnumber(4);
	}
	button5.onclick= function(){
		addnumber(5);
	}
	button6.onclick= function(){
		addnumber(6);
	}
	button7.onclick= function(){
		addnumber(7);
	}
	button8.onclick= function(){
		addnumber(8);
	}
	button9.onclick= function(){
		addnumber(9);
	}
	button0.onclick= function(){
		addnumber(0);
	}
	button_plus.onclick= function(){
		a = parseFloat(number_input.value);
		number_input.value = '0';
		oper = '+';
	}
	button_minus.onclick= function(){
		a = parseFloat(number_input.value);
		number_input.value = '0';
		oper = '-';
	}
	button_um.onclick= function(){
		a = parseFloat(number_input.value);
		number_input.value = '0';
		oper = '*';
	}
	button_del.onclick= function(){
		a = parseFloat(number_input.value);
		number_input.value = '0';
		oper = '/';
	}
	button_ravno.onclick= function(){
		b = parseFloat(number_input.value);
		if (oper == '+'){
			number_input.value = a+b;
		}
		if (oper == '-'){
			number_input.value = a-b;
		}
		if (oper == '*'){
			number_input.value = a*b;
		}
		if (oper == '/'){
			number_input.value = a/b;
		}
	}




}