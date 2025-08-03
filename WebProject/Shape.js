function Shape(centerX, centerY, width, height, src){
	// private________________________________________________________________________________________________________________________
	this.element=null;
	this.valid=true;
	this.centerY=0;
	this.centerX=0;
	this.width=0;
	this.height=0;
	this._setShape=function(centerX, centerY, width, height, src){
		this.centerX=centerX;
		this.centerY=centerY;
		this.width=width;
		this.height=height;
		this._showShape(src);
	}
	this._showPos=function(){
		with(this.element.style){
			left=this.centerX-this.width+"px";
			top=this.centerY-this.height+"px";
		}
	}
	this._showRange=function(){
		with(this.element.style){
			width=this.width+this.width+"px";
			height=this.height+this.height+"px";			
		}
	}
	this._showShape=function(src){
		with(this.element.style){
			position="absolute";
			this._showPos();
			this._showRange();
		}
		this.setImg(src);
	}
	this._construct=function(){
		if(this.element==null){
			this.element=document.createElement("IMG");
			this._setShape(centerX, centerY, width, height, src);
			this.valid=true;
			document.body.appendChild(this.element);
		}
	}
	// public________________________________________________________________________________________________________________________
	this.setImg=function(src){
		this.element.src=src;
	}
	this.moveTo=function(centerX, centerY){
		this.centerX=centerX;
		this.centerY=centerY;
		this._showPos();
	}
	this.deconstruct=function(){
		if(!this.valid){
			return;
		}
		this.valid=false;
		this.element.style.visibility="hidden";
	}
	this.setShape=function(width, height){
		this.width=width;
		this.height=height;
		this._showRange();
		this._showPos();
	}
	this.isDuplicate=function(shape){
		if(!this.valid || !shape.valid){
			return false;
		}
		var padding=(shape.padding?shape.padding:this.padding?this.padding:0);
		if(Math.abs(this.centerX-shape.centerX)<this.width+shape.width+padding&& 
			Math.abs(this.centerY-shape.centerY)<this.height+shape.height+padding){
			return true;
		}
		return false;
	}
	// construct________________________________________________________________________________________________________________________
	this._construct();
}