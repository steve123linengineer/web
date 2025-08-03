function UI(){
//	private________________________________________________________________________________________________________________________
	this.element=null;
	this.score=null;
	this.time=null;
	this._createUI=function(){
		this.element=null;
		this.element=document.createElement("DIV");
		with(this.element.style){
			position="absolute";
			left="720px";
			top="50px";
			padding="10px";
		}
		this.element.appendChild(document.createTextNode("Score:"));
		this._createScore();
		this.element.appendChild(document.createTextNode("Time:"));
		this._createTime();
		document.body.appendChild(this.element);
	}
	this._setStyle=function(obj){
		with(obj.style){
			position="relative";
			border="solid 1px #000000";
			width="200px";
			margin="20px";
			padding="10px";
			textAlign="center";
		}
	}
	this._createScore=function(){
		this.score=document.createElement("DIV");
		this._setStyle(this.score);
		this.score.value=allScore;
		this.score.appendChild(document.createTextNode(""+this.score.value));
		this.element.appendChild(this.score);
		this.element.appendChild(document.createElement("BR"));
	}
	this._createTime=function(){
		this.time=document.createElement("DIV");
		this._setStyle(this.time);
		this.time.value=allTime;
		this.time.appendChild(document.createTextNode(""+this.time.value));
		this.element.appendChild(this.time);
		this.element.appendChild(document.createElement("BR"));
	}
//	public__________________________________________________________________________________________________________________________
	this.addScore=function(addScore){
		this.score.value+=addScore;
		this.score.replaceChild(document.createTextNode(""+this.score.value), this.score.lastChild);
	}
	this.timer=function(){
		this.time.value--;
		this.time.replaceChild(document.createTextNode(""+this.time.value), this.time.lastChild);
	}
	this.clearUI=function(){
		document.body.removeChild(this.element);
	}
	this._createUI();
}