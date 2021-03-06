function Bee (i, j, ctx, width, isbee) {
	this.i = i;
	this.j = j;
	this.ctx = ctx;
	this.width = width
	this.isbee = isbee || false;
	this.revealed = false;
	this.total = 0;
}

// draw every single box's board
Bee.prototype.drawBoard = function() {
	var i = this.i;
	var j = this.j;
	var width = this.width
	var ctx = this.ctx
	ctx.beginPath();
	ctx.strokeRect(i * width, j * width, width, width)
	ctx.closePath();
	ctx.stroke();
};

// draw every single bee
Bee.prototype.drawBee = function () {
	var width = this.width
	var ctx = this.ctx
	var isbee = this.isbee
	if (isbee) {
		ctx.fillStyle="#888";
		ctx.beginPath();
		ctx.arc((this.i+0.5) * width, (this.j+0.5) * width, width * 0.3, 0*Math.PI, 2*Math.PI)
		ctx.closePath();
		ctx.fill(); 
	}
};

// draw every single account of near bees
Bee.prototype.drawCount = function () {
	var width = this.width
	var ctx = this.ctx
	var isbee = this.isbee
	if (!isbee) {
		ctx.font="20px Arial";
		ctx.fillText(this.total, (this.i+0.4) * width, this.j * width + 25);
	}
}

// reveal the current result: bee or account
Bee.prototype.show = function () {
	this.clearRect()
	this.revealed = true
	if (this.isbee) {
		this.drawBee()
	} else {
		this.drawCount()
	}
}

// the effect when cover every single box
Bee.prototype.coverfn = function() {
	var i = this.i;
	var j = this.j;
	var width = this.width
	var ctx = this.ctx
	if (!this.revealed) {
		ctx.fillStyle = "#999";
		ctx.clearRect(i * width, j * width, width, width);
		ctx.fillRect(i * width, j * width, width, width)
	}
};

// erasure the current box
Bee.prototype.clearRect = function () {
	var i = this.i;
	var j = this.j;
	var width = this.width
	var ctx = this.ctx
	ctx.clearRect(i * width, j * width, width, width);
	this.drawBoard()
}

// erasure all unrevealed boxes
Bee.prototype.clearAllRect = function () {
	if (!this.revealed) {
		this.clearRect()
	}
}









