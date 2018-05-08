var c = document.getElementById('myCanvas');
var ctx = c.getContext('2d');
var resetbtn = document.getElementById('resetbtn')

// init bee's number
var beenum = 20;
var maxwidth = 400;
var row = 10;
var col = 10;
var _left = 10;
var _top = 10;
var width = Math.floor(maxwidth / 10)
var beeArr = []
var grid = null

var methods = {
	resetBee: function () {
		beeArr = []
		for (var i = 0; i < beenum; i++) {
			var num = Math.floor(Math.random() * 100)
			beeArr.push(num)
		}
		return beeArr;
	},
	createGrid: function () {
		grid = new Array(col)
		for (var i = 0; i < grid.length; i++) {
			grid[i] = new Array(row)
		}
		return grid
	},
	beginGame: function (grid) {
		beeArr = methods.resetBee()
		grid = methods.createGrid()
		for (var i = 0; i < col; i++) {
			for (var j = 0; j < row; j++) {
				var isbee = false
				for (var k = 0; k < beeArr.length; k++) {
					var item = beeArr[k]
					if (i * row + j == item) {
						isbee = true
					}
				}
				grid[i][j] = new Bee(i, j, ctx, width, isbee)
				grid[i][j].drawBoard()
			}
		}
		for (var i = 0; i < col; i++) {
			for (var j = 0; j < row; j++) {
				if (grid[i][j].isbee) {
					methods.setBeeCount(grid, i, j)
					grid[i][j].total = -1
				}
			}
		}
		return grid;
	},
	setBeeCount: function (grid, beei, beej) {
		for (var i = beei-1; i <= beei+1; i++) {
			for (var j = beej-1;j <= beej+1; j++) {
				if (i >= 0 && j>=0 && i < col && j < row) {
					grid[i][j].total++
				}
			}
		}
	},
	showAll: function () {
		for (var i = 0; i < col; i++) {
			for (var j = 0; j < row; j++) {
				grid[i][j].show()
			}
		}
	},
	showAccout: function (grid, beei, beej) {
		for (var i = beei-1; i <= beei+1; i++) {
			for (var j = beej-1;j <= beej+1; j++) {
				if (i >= 0 && j>=0 && i < col && j < row) {
					var item = grid[i][j]
					if (!item.revealed && item.total == 0 && i !== beei && j !== beej) {
						methods.showAccout(grid, i, j)
					}
					item.show()
				}
			}
		}
	},
	clickfn: function (grid, i, j) {
		if (grid[i][j].isbee) {
			methods.showAll()
		} else {
			if (grid[i][j].total == 0) {
				methods.showAccout(grid, i, j)
				return
			}
			grid[i][j].show()
		}
	},
	clearAllRect: function () {
		for (var i = 0; i < col; i++) {
			for (var j = 0; j < row; j++) {
				grid[i][j].clearAllRect()
			}
		}
	},
	mousemovefn: function (grid, beei, beej) {
		methods.clearAllRect()
		grid[beei][beej].coverfn()
	}
}

// init game
var grid = methods.beginGame(grid)

c.addEventListener('click', function(e) {
	var clientX = e.clientX;
	var clientY = e.clientY;
	var i = Math.floor((clientX - _left) / width)
	var j = Math.floor((clientY - _top) / width)
	methods.clickfn(grid, i, j)
}, false)

c.addEventListener('mousemove', function(e) {
	var clientX = e.clientX;
	var clientY = e.clientY;
	var i = Math.floor((clientX - _left) / width)
	var j = Math.floor((clientY - _top) / width)
	methods.mousemovefn(grid, i, j)
}, false)

// reset game
resetbtn.addEventListener('click', function(e) {
	ctx.clearRect(0, 0, maxwidth, maxwidth);
	grid = methods.beginGame(grid)
}, false)


















