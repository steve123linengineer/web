function Table(stick, ball){
	this.stick=null;
	this.ball=null;
	this.nStickEvent=0;
	this.nBallEvent=0;
	this.nFireEvent=0;
	this.bBlackEvent=false;
	this.events=null;
	//private_________________________________________________________________________________________________________________________
	this._createTable=function(){
		this.events=new Array();
		this.nBlackEvent=0;
		this.nFireEvent=0;
		this.nStickEvent=0;
		this.nBallEvent=0;
		this.bBlackEvent=false;
		this.stick=new Shape(stick.centerX, stick.centerY, stick.width, stick.height, stick.src);
		this.stick.element.style.visibility="hidden";
		this.ball=new Ball(ball.centerX, ball.centerY, ball.width, ball.height, ball.src);
		this.ball.element.style.visibility="hidden";
	}
	//public__________________________________________________________________________________________________________________________
	this.setEvents=function(){
		var i=0;
		while(this.events.length){
			this.events.pop();
		}
		for(i=0; i<arguments.length; i++){
			this.events.push(arguments[i]);
		}
	}
	this.clearTable=function(){
		this.nFireEvent=0;
		this.nStickEvent=0;
		this.nBallEvent=0;
		this.stick.deconstruct();
		this.ball.deconstruct();
	}
	this._createTable();
}