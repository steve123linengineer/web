function Block(left, top, width, height, src, hardness){
	//private________________________________________________________________________________________________________________________
	this.hardness=0;
	this._createBlock=function(){
		this.hardness=hardness;
		if(this.hardness){
			this.element.src=brickImg[this.hardness-1].src;
		}
	}
	//public________________________________________________________________________________________________________________________
	this.duplicate=function(hit){
		this.hardness-=hit;		
		if(this.hardness<=0){
			this.deconstruct();
			if(Math.random()*10<=4){
				capsule.push(new Capsule(this.centerX, this.centerY, cache[4].src));
				capsule[capsule.length-1].action();
			}
			brick.size--;
			ui.addScore(10);
		}
		else{
			this.element.src=brickImg[Math.ceil(this.hardness-1)].src;
		}
	}
	//construct________________________________________________________________________________________________________________________
	Shape.apply(this, arguments);
	this._createBlock();
}