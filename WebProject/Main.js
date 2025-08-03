var cache=null;
var brickImg=null;
var wall=null, ball=null, brick=null, stick=null, capsule=null;
var table=null;
var ui=null;
var start=false;
var end=false;
var allTime=0;
var allCur=0;
var allScore=0;
var ballObj=null;

function counterTime(){
	if(end){
		clearTimeout(allTime);
		return;
	}
	if(ui.time.value>0){
		ui.timer();
		allTime=setTimeout("counterTime()", 1000);
	}
	else{
		clearTimeout(allTime);
		clearAll();
		showStr("Time terminate");
	}
}
function mainMenu(){
	end=true;
	var index=-1, back=null;
	document.body.innerHTML="<div align='center'>"+
		"<select length='4' id='select'><option>--- 請選擇關卡 ---</option><option>第一關</option><option>第二關</option><option>第三關</option></select>"+
		"<button onclick='selClick()'>確定</button>"+"</div>";
	back=document.createElement("IMG");
	back.style.position="relative";
	back.style.top="5%";
	back.style.left="15%";
	back.style.width="70%";
	back.style.height="80%";
	back.src=cache[9].src;
	document.body.appendChild(back);
}
function selClick(){
	if(document.getElementById("select").selectedIndex!=0){
		allScore=0;
		startGame(document.getElementById("select").selectedIndex-1);
	}
}
function showStr(str, bHidden){
	document.body.innerHTML=
		"<div style='line-height: 355px; text-align: center; font-family: Arial Black; font-size: 28pt; font-weight: bold; color: #220011'>"+
		str+"</div>";
		if(!bHidden){
			document.body.innerHTML+="<div align='center'>"+
				"<button onclick='mainMenu()'>重新開始</button><button onclick='startGame("+allCur+")'>再來一次</button>"+"</div>";
		}
}
function loadTable(){
	table=new Table(stick, ball[ball.length-1]);
}
function loadCapsule(){
	capsule=new Array();
}
function clearAll(){
	var obj=null;
	end=true;
	start=false;
	clearTimeout(allTime);
	while(capsule.length>0){
		obj=capsule.pop();
		clearInterval(obj.runTime);
	}	
	while(ball.length>0){
		obj=ball.pop();
		clearInterval(obj.runTime);
	}
	table.clearTable();
	with(document.body){
		while(lastChild){
			removeChild(lastChild);
		}
	}
	setTimeout(function(){
		while(wall.length>0){
			wall.pop();
		}
		while(brick.length>0){
			brick.pop();
		}
	}, 1000);
}
function loadBackground(){
	var background=document.createElement("IMG");
	background.src=cache[7].src;
	with(background.style){
		position="absolute";
		left="10px";
		top="5px";
		width="690px";
		height="525px";
	}
	document.body.appendChild(background);
}
function loadWall(){
	wall=new Array();
	wall.push(new Shape(10, 267, 2, 265, cache[0].src)); //left
	wall.push(new Shape(700, 267, 2, 265, cache[0].src)); //right
	wall.push(new Shape(355, 4, 343, 2, cache[0].src)); // top
	wall.push(new Shape(355, 530, 343, 2, cache[0].src)); //bottom
}
function loadBall(){
	ball=new Array();
	ball.push(new Ball(stick.centerX, stick.centerY-stick.height-10, 10, 10, cache[1].src));
	ball.size=1;
}
function loadBrick(){
	var i=0, j=0, lengthRow=0, lengthCol=0;
	var	left=wall[0].centerX+wall[0].width, top=wall[2].centerY+wall[2].height, 
		right=wall[1].centerX-wall[1].width, bottom=wall[3].centerY-wall[3].height,
		padding=2, 
		vPadding=2;
	var width=0, height=0;
	brick=new Array();
	height=(bottom-200-top-arguments.length*vPadding)/arguments.length/2;
	lengthRow=arguments.length;
	brick.size=0;
	for(j=0; j<arguments.length; j++){
		width=(right-left-(arguments[j].length+1)*padding)/arguments[j].length/2;
		lengthCol=arguments[j].length;
		for(i=0; i<lengthCol; i++){
			hold=parseInt(arguments[j].charAt(i));
			if(isNaN(hold)){
				wall.push(new Shape(left+padding+width+i*(padding+width)+i*width, top+vPadding+height+j*(vPadding+height)+j*height, 
					width, height, cache[5].src));
				wall[wall.length-1].element.style.border="solid 1px #000000";
				continue;
			}
			if(hold<1){
				continue;
			}
			brick.push(new Block(left+padding+width+i*(padding+width)+i*width, top+vPadding+height+j*(vPadding+height)+j*height, 
				width, height, cache[2].src, hold));
			brick[brick.length-1].element.style.border="solid 1px #000000";
			brick.size++;
		}
	}
}
function loadStick(){
	stick=new Shape(400, 520, 80, 10, cache[3].src);
	stick.element.style.border="solid 1px #000000";
}
function loadUI(){
	ui=new UI();
}
function isButtonLeft(event){
	if((event?event.button:window.event.button-1)==0){
		return true;
	}
	return false;
}
function stickMove(event){
	if(end){
		return;
	}
	var left=stick.width+wall[0].width+wall[0].centerX, right=wall[1].centerX-wall[1].width-stick.width;
	event=event||window.event;
	stick.moveTo((event.clientX<left?left:(event.clientX>right?right:event.clientX)), stick.centerY);
	if(!start){
		ball[ball.length-1].moveTo(stick.centerX, stick.centerY-stick.height-ball[ball.length-1].height);		
	}
	else{
		if(table.nFireEvent<1){
			return;
		}
		ballObj.moveTo(stick.centerX, stick.centerY-stick.height-ballObj.height);
		ballObj.setShape(ball[ball.length-1].width, ball[ball.length-1].height);
	}
}
function onStart(event){
	if(end){
		return;
	}
	if(start){
		if(table.nFireEvent<1){
		}
		else{
			ball.push(new Ball(stick.centerX, stick.centerY-stick.height-ballObj.height, ball[ball.length-1].width, ball[ball.length-1].height, cache[1].src));
			with(ball[ball.length-1]){
				moveTo(centerX+dx, centerY+dy);
			}
			ball[ball.length-1].action();
			ball.size++;
		}
	}
	else{
		with(ball[ball.length-1]){
			moveTo(centerX+dx, centerY+dy);
		}
		ball[ball.length-1].action();
		start=true;
		setTimeout("counterTime()", 1000);
	}
}
function startGame(cur){
	end=true;
	allCur=cur?cur:0;
	showStr("第 "+eval(allCur+1)+" 關", true); 
	setTimeout('initial()', 2000);
}