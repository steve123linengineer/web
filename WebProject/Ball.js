function Ball(left, right, width, height, src){
//private___________________________________________________________________________________________________________________________
	this.id=0;
	this.dx=0;
	this.dy=0;
	this.runTime=0;
	this.hit=0;
	this.rate=0;
	this.angle=0;
	this.padding=0;
	this.moveOnly=false;
	this.ready=false;
	this.createBall=function(){
		this.moveOnly=false;
		this.ready=false;
		this.id=ball.length;
		this.rate=6;
		this.hit=1;
		this.setAngle(Math.random()*1000%120+210);
		this.padding=2;
	}
	this.setAngle=function(angle){
		this.angle=angle;
		this.dy=this.rate*Math.sin(Math.PI/180*this.angle);
		this.dx=this.rate*Math.cos(Math.PI/180*this.angle);
	}
	this._normalize=function(shape){
		if(this.centerY<=shape.centerY-shape.height){
			this.dy=-this.dy;
			this.centerY=shape.centerY-shape.height-this.height-this.padding;
		}
		else if(this.centerY>=shape.centerY+shape.height){
			this.dy=-this.dy;
			this.centerY=shape.centerY+shape.height+this.height+this.padding;
		}
		else if(this.centerX<=shape.centerX-shape.width){
			this.dx=-this.dx;
			this.centerX=shape.centerX-shape.width-this.width-this.padding;
		}
		else{
			this.dx=-this.dx;
			this.centerX=shape.centerX+shape.width+this.width+this.padding;
		}
	}
	this.getAngle=function(dy, dx){
		var angle=0;
		angle=(Math.atan2(dy, dx))/Math.PI*180;
		angle=(angle<0?angle+360:angle);
		return angle;
	}
	this.setRate=function(rate){
		this.rate=rate;
		this.setAngle(this.angle);
	}
	this._ballRun=function(){
		var i=0;
		if(end || this.centerX<wall[0].centerX || this.centerX>wall[1].centerX || this.centerY<wall[2].centerY || this.centerY>wall[3].centerY){
			this.clearBall();
			ball.size--;
			return;
		}
		if(this.moveOnly){
			for(i=0; i<4; i++){
				if(wall[i].isDuplicate(this)){
					this._normalize(wall[i]);
				}
			}
			this.moveTo(this.centerX+this.dx, this.centerY+this.dy);
			return;
		}
		if(wall[3].isDuplicate(this)){
			this.clearBall();
			ball.size--;
			if(ball.size<1){
				clearAll();
				showStr("Game Over");
				return;
			}
		}
		else if(stick.isDuplicate(this)){
			var angle=0;
			this.centerY=stick.centerY-stick.height-this.height-this.padding;
			if(table.nStickEvent>0){
				angle=Math.random()*80+230;
			}
			else{
				angle=this.getAngle(this.centerY-stick.centerY, this.centerX-stick.centerX);
			}
			this.setAngle(angle);
		}
		else{
			for(i=0; i<wall.length; i++){
				if(wall[i].isDuplicate(this)){
					this._normalize(wall[i]);
				}
			}
			if(i==wall.length){
				for(i=0; i<brick.length; i++){
					if(brick[i].isDuplicate(this)){
						brick[i].duplicate(this.hit);
						this._normalize(brick[i]);
					}
					if(!end && brick.size<1){
						allScore=ui.score.value;						
						clearAll();
						allCur++;
						if(allCur>2){
							showStr("You Win. Score: "+allScore);
							return;
						}
						showStr("²Ä "+eval(allCur+1)+" Ãö", true);
						setTimeout("initial()", 2000);
						return;
					}
				}
			}
			if(i==brick.length && this.ready){
				for(i=0; i<ball.length; i++){
					if(ball[i].id==this.id){
						continue;
					}
					if(ball[i].isDuplicate(this)){
						this.setAngle(this.getAngle(this.centerY-ball[i].centerY, this.centerX-ball[i].centerX));
					}
				}
			}
		}
		this.moveTo(this.centerX+this.dx, this.centerY+this.dy);
	}
//public___________________________________________________________________________________________________________________________
	this.clearBall=function(){
		if(this.valid)
			clearInterval(this.runTime);
		this.deconstruct();
	}
	this.action=function(){
		var _this=this;
		this.runTime=setInterval(function(){_this._ballRun()}, 5);
		setTimeout(function(){_this.ready=true}, 400);
	}
//construct___________________________________________________________________________________________________________________________
	Shape.apply(this, arguments);
	this.createBall();
}