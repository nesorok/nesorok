window.addEventListener("load", main, false);
function main() {


    var button = document.getElementById('button');  
    var button2 = document.getElementById('button2');  
    var ctx = canvas_example.getContext('2d');
    var w = canvas_example.width;		 var h = canvas_example.height;
    var j = 0;    var jo = 59;	var i = 0; 	var k = 40;    var dx = 0;	  var dy = 0;             var x = 130;           var y = 76; 		var color = 0;
var max = 1;	var counter = 0;	var count = 0;	var time = 0;


    var car = [];


    generateCars();
    drawStrokes();
    drawCar(x,y);


button.addEventListener('click', function(e){
        if(button.innerText == 'Стоп'){
            button.innerText = 'Продолжить'
            display.value= 'Управление: AWDS'
            clearInterval(time);  
        }else{
            if(button.innerText == 'Начать'){ 
                timeStart();
                display.value= 'Обошёл машинок: 0'
                button.innerText = 'Стоп';
            }
            if(button.innerText == 'Продолжить'){ 
                timeStart();
                display.value= 'Обошёл машинок: '+count;
                button.innerText = 'Стоп';
            }
        }
    })
    button2.addEventListener('click', function(e){
            button.innerText = 'Начать'
            max = 1;
            x = 130;        
            y = 76;
            counter = 0;
            count = 0;
            car = [];
            display.value= 'Управление: AWDS'
            generateCars();
            drawStrokes();
            drawCar(x,y);
            clearInterval(time);  
    })
    var display = document.getElementById('display');     


    function drawStrokes(){
        ctx.beginPath();
        ctx.fillStyle = '#818181';
        ctx.fillRect(0, 0, 1200, 420);
        ctx.fill();   
        ctx.fillStyle = '#4E5151';
        ctx.beginPath();
        ctx.fillRect(0, 0, 1200, 15);
        ctx.fill();   
        ctx.beginPath();
        ctx.fillRect(0, 405, 1200, 15);
        ctx.fill();  
        for (var i=0; i<40; i++){       
            ctx.fillStyle = '#D4D4D4';
            ctx.beginPath();
            ctx.fillRect(jo+i*60-50, 137, 24, 12);
            ctx.fill(); 
            console.log(jo)
        }
        for (var i=0; i<40; i++){
            ctx.fillStyle = '#D4D4D4';
            ctx.beginPath();
            ctx.fillRect(jo+i*60-50, 271, 24, 12);
            ctx.fill(); 
        }  
    }// drawStrokes


    function Cars(xx,yy,carColor){           
        ctx.beginPath();
        ctx.fillStyle = 'Black';
        ctx.fillRect(xx-35, yy-33, 20, 66);
        ctx.fillRect(xx+15, yy-33, 20, 66);
        ctx.fillStyle = carColor;
        ctx.fillRect(xx-50, yy-30, 100, 60);
        ctx.fillStyle = '#CBE7E7';
        ctx.fillRect(xx+15, yy-25, 15, 50);
        ctx.fillRect(xx-35, yy-25, 20, 50);
        ctx.fill(); 
    }


    function drawCar(xx,yy){        
        ctx.beginPath();
        ctx.fillStyle = 'Black';
        ctx.fillRect(xx-35, yy-33, 20, 66);
        ctx.fillRect(xx+15, yy-33, 20, 66);
        ctx.fillStyle = 'Red';
        ctx.fillRect(xx-50, yy-30, 100, 60);
        ctx.fillStyle = '#CBE7E7';
        ctx.fillRect(xx+15, yy-25, 15, 50);
        ctx.fillRect(xx-35, yy-25, 20, 50);
        ctx.fill(); 
    }


    function goOn(){                
        if(jo <= -1){jo= 59}
        jo-=4;
        x += dx;
        y += dy;

        if(x<50){
            x = 50;
        }
        if (x>1150){
            x = 1150;
        }
        if(y<48){
            y = 48;
        }
        if (y>372){
            y = 372;
        }       
        drawStrokes();

        for(var i=0; i<max; i++){
            if(car[i].x < -60){
                count++;
                car.splice(i, 1);
               console.log(car)
                display.value = 'Обошёл машинок: ' + count;
                generateCars();
            }
            car[i].x-= 10;
        }


        for(var i=0; i <max; i++){ if( ((y-30 < car[i].y - 30 )&&(y+30 > car[i].y - 30)||(y-30 < car[i].y + 30 )&&(y+30 > car[i].y + 30))&&((x-50 < car[i].x - 50 )&&(x+50 > car[i].x - 50)||(x-50 < car[i].x + 50 )&&(x+50 > car[i].x + 50))){
                    ctx.beginPath();
                    ctx.fillStyle = 'Black';
                    ctx.fillRect(0, 0, w, h);
                    ctx.fill(); 
                    drawCar(x,y);
                    Cars(car[i].x,car[i].y, car[i].col);
                    clearInterval(time);
                    dx = 0;
                    dy = 0;
                   display.value = 'Обошёл машинок: ' + 0;
                   setTimeout(function() { alert('Обошёл машинок: ' + count); }, k+10);
                        return;
            }
        }
        make();
        for(var i=0; i<max-1; i++){
            for(var j=i+1; j<max; j++){
                if ((Math.abs(car[i].x - car[j].x) < 120)&&(car[i].y = car[j].y)){
                    car.splice(j, 1);
                    max--;
                }
            }
        }
        for(var i =0; i<max; i++){
            Cars(car[i].x,car[i].y,car[i].col);
        }
        drawCar(x,y);
    }//goOn
    function make(){
        counter++;
        if(counter == '50'){
            counter = 0;
            max++;
            generateCars();
            max++
            generateCars();
            console.log(max);
        }
    }     


    function generateCars(){
            var red = Math.trunc(Math.random()*256);
            var green = Math.trunc(Math.random()*256);
            var blue = Math.trunc(Math.random()*256);
            color = 'rgb(' + red + ',' + green + ',' + blue + ')';
            car.push({x:1350, y:0, col: color});
            var a = Math.floor(Math.random() * (3 - 1 + 1)) + 1;         
            if(a == '1'){car[max-1].y = 76;}
            if(a == '2'){car[max-1].y = 210;}
            if(a == '3'){car[max-1].y = 344;}
    }


    function timeStart(){     
       time = setInterval(goOn, k);
    }


    document.addEventListener('keydown', function(event) {
        if (event.code == 'KeyA'){    // влево
            dx = -10;
        }
        if(event.code ==  'KeyW'){   // вверх
            dy = -10;       
        }
        if(event.code == 'KeyD'){   // вправо
            dx = 10;       
        }
        if(event.code == 'KeyS'){   //  вниз
            dy = 10;   
        }
    });
    document.addEventListener('keyup', function(event) {
    if (event.code == 'KeyA'){    // влево
        dx = 0;
    }
    if(event.code ==  'KeyW'){   // вверх
        dy = 0;       
    }
    if(event.code == 'KeyD'){   // вправо
        dx = 0;       
    }
    if(event.code == 'KeyS'){   //  вниз
        dy = 0;   
    }
    });
}

