function Capsule(centerX, centerY, src){
	//private___________________________________________________________________________________________________________________________
	var _this=this;
	this.sequence=0;
	this.runTime=0;
	this.distance=0;
	this.eventEnd=false;
	this.img=null;
	this._createCapsule=function(){
		this.sequence=table.events[Math.floor(Math.random()*table.events.length)];
		if(this.sequence==9 && table.bBlackEvent){
			this.sequence=4;
		}
		else if((this.sequence==8||this.sequence==5) && ball.size>6){
			this.sequence=Math.random()<0.5?4:6;
		}
		this.eventEnd=false;
		this.runTime=0;
		this.distance=Math.random()*5+1;
		this.element.style.border="solid 1px #000000";
	}
	this._capsuleRun=function(){
		this.moveTo(this.centerX, this.centerY+this.distance);
		if(stick.isDuplicate(this)){
			this.clearCapsule();
			this.createTransform();
		}
		else if(wall[3].isDuplicate(this)){
			this.clearCapsule();
		}
	}
	//public____________________________________________________________________________________________________________________________
	this.action=function(){
		if(this.sequence==9){
			this.createTransform();
			return;
		}
		this.runTime=setInterval(function(){_this._capsuleRun()}, 13);
	}
	this.clearCapsule=function(){
		clearInterval(this.runTime);
		this.deconstruct();
	}
	this.createTransform=function(){
		var i=0, timeOut=8, obj=null, j=0;
		var distance=0;
		switch(this.sequence){
			case 0:
				table.nBallEvent++;
				for(i=0; i<ball.length; i++){
					ball[i].setShape(15, 15);
					ball[i].hit=9;
				}
				break;
			case 1:
				table.nStickEvent++;
				stick.setShape(wall[3].width, stick.height);
				stick.moveTo(wall[3].centerX, stick.centerY);
				break;
			case 2:
				table.nStickEvent++;
				stick.setShape(stick.width/3, stick.height);
				break;
			case 3:
				table.nBallEvent++;
				for(i=0; i<ball.length; i++){
					ball[i].setShape(6, 6);
					ball[i].hit=0.1;
				}
				break;
			case 4:
				ui.addScore(Math.floor(Math.random()*100)+100);
				timeOut=0;
				break;
			case 5:
				table.nFireEvent++;
				if(table.nFireEvent>1){
					break;
				}
				ballObj=new Ball(stick.centerX, stick.centerY-stick.height-ball[ball.length-1].height, ball[ball.length-1].width, ball[ball.length-1].height, cache[1].src);
				ball.size++;
				timeOut=3;
				break;
			case 6:
				ui.time.value+=Math.floor(Math.random()*50+10);
				timeOut=0;
				break;
			case 7:
				this.runTime=setInterval(function(){_this._ballUp()}, 200);
				timeOut=3;
				break;
			case 8:
				timeOut=0;
				obj=new Ball(this.centerX, stick.centerY-stick.height-17, 15, 15, cache[6].src);
				distance=Math.floor(Math.random()*8)+1;
				this.runTime=setInterval(function(){
					obj.moveTo(obj.centerX, obj.centerY-distance);
					for(i=0; i<brick.length; i++){
						if(obj.isDuplicate(brick[i])){
							this.img=new Shape(brick[i].centerX, brick[i].centerY, 30, 30, null);
							for(j=0; j<brick.length; j++){
								if(this.img.isDuplicate(brick[j])){
									brick[j].duplicate(9);
								}
							}
							this.img.deconstruct();
							obj.clearBall();
							clearInterval(_this.runTime);
							_this._bom(obj, 12);
							break;
						}
					}
					if(obj.isDuplicate(wall[2])){
						obj.clearBall();
						clearInterval(_this.runTime);
						_this._bom(obj, 6);
					}
					else{
						for(i=4; i<wall.length; i++){
							if(obj.isDuplicate(wall[i])){
								this.img=new Shape(wall[i].centerX, wall[i].centerY, 30, 30, null);
								for(j=4; j<wall.length; j++){
									if(this.img.isDuplicate(wall[j])){
										wall[j].deconstruct();
									}
								}
								this.img.deconstruct();
								obj.clearBall();
								clearInterval(_this.runTime);
								_this._bom(obj, 12);
								break;
							}
						}
					}
				}, 10);
				break;
			case 9:
				this.element.style.visibility="hidden";
				this.img=new Shape(this.centerX, this.centerY, 1, 1, cache[8].src);
				//________________________________________here
				//this.img.element.style.visibility="hidden";
				table.bBlackEvent=true;
				timeOut=3;//Math.floor(Math.random()*5)+1;
				this.setShape(6, 6);
				this.runTime=setTimeout(function(){_this._inBlack(75, 1, true)}, 10);
				for(i=0; i<ball.length; i++){
					ball[i].setRate(3);
				}
				break;
			default: ;
		}
		this._timeOut(timeOut);
	}
	this._inBlack=function(angle, range, bAdd){
		var i=0;
		for(i=0; i<ball.length; i++){
			ball[i].moveOnly=true;
			if(ball[i].isDuplicate(this)){
				ball[i].clearBall();
				ball.size--;
				if(ball.size<1){
					this.eventEnd=true;
					return;
				}
			}
		}
		for(i=0; i<ball.length; i++){
			ball[i].setAngle((ball[i].getAngle(this.centerY-ball[i].centerY, this.centerX-ball[i].centerX)+angle)%360);
		}
		if(range>=40){
			bAdd=false;
		}else if(range<=1){
			bAdd=true;
		}
		range=(bAdd?range+4:range-4);
		this.img.setShape(range, range);
		this.runTime=setTimeout(function(){_this._inBlack((angle<=0?angle:angle-1), range, bAdd)}, 50);
	}
	this._bom=function(obj, size){
		var i;
		for(i=0; i<size; i++){
			ball.push(new Ball(obj.centerX, obj.centerY, ball[ball.length-1].width, ball[ball.length-1].height, cache[1].src));
			ball.size++;
			with(ball[ball.length-1]){
					setAngle(15+i*30);
					ready=false;
					moveTo(centerX+dx, centerY+dy);
					action();
			}
		}
	}
	this._ballUp=function(){
		var i;
		if(table.bBlackEvent>0){
			clearInterval(this.runTime);
			return;
		}
		for(i=0; i<ball.length; i++){
			ball[i].setAngle(Math.random()*150+195);
		}
	}
	this._timeOut=function(curTime){
		if(end || this.eventEnd){
			this.clearTransform();
			return;
		}
		if(curTime>0){
			setTimeout(function(){
				_this._timeOut(--curTime);
			}, 1000);
			return;
		}
		this.clearTransform();
	}
	this.clearTransform=function(){
		if(end){
			return;
		}
		var i=0;
		switch(this.sequence){
			case 0:
				if(table.nBallEvent>1){
					table.nBallEvent--;
					break;
				}
				table.nBallEvent--;
				for(i=0; i<ball.length; i++){
					ball[i].setShape(table.ball.width, table.ball.height);
					ball[i].hit=table.ball.hit;
				}
				break;
			case 1:
				if(table.nStickEvent>1){
					table.nStickEvent--;
					break;
				}
				table.nStickEvent--;
				stick.setShape(table.stick.width, stick.height);
				break;
			case 2:
				if(table.nStickEvent>1){
					table.nStickEvent--;
					break;
				}
				table.nStickEvent--;
				stick.setShape(table.stick.width, stick.height);
				break;
			case 3:
				if(table.nBallEvent>1){
					table.nBallEvent--;
					break;
				}
				table.nBallEvent--;
				for(i=0; i<ball.length; i++){
					ball[i].setShape(table.ball.width, table.ball.height);
					ball[i].hit=table.ball.hit;
				}
				break;
			case 4:
				break;
			case 5:
				table.nFireEvent--;
				if(table.nFireEvent>0){
					break;
				}
				ball.size--;
				document.body.removeChild(ballObj.element);
				if(ball.size<1){
					clearAll();
					showStr("Game Over");
					return;
				}
				break;
			case 6:
				break;
			case 7:
				clearInterval(this.runTime);
				break;
			case 8:
				break;
			case 9:
				this.img.deconstruct();
				clearInterval(this.runTime);
				if(ball.size<=0){
					clearAll();
					showStr("You Lose.");
					return;
				}
				for(i=0; i<ball.length; i++){
					ball[i].setRate(6);
					ball[i].moveOnly=false;
				}
				table.bBlackEvent=false;
				break;
			default: ;
		}
	}
	//construct_________________________________________________________________________________________________________________________
	Shape.call(this, centerX, centerY, 8, 15, src);
	this._createCapsule();
}