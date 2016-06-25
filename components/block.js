var Block = {
	
	shape: [0x0000, 0x0000, 0x0000, 0x0000],
	dir: 0,

	tile_x: function(x) {
		return x * TILE_WIDTH;
	},
	tile_y: function(y) {
		return y * TILE_HEIGHT;
	},
	set_shape: function(shape) {
		this.shape = shape;
	},
	//run a function on each tile in the block.
	eachblock: function(x, y, fn) {
		var bit
		var blocks = this.shape[this.dir];
		var rx = ry = 0;
		for (bit = 0x8000; bit > 0; bit = bit >> 1) {
			if (blocks & bit) {
				fn(x, y, rx, ry);
			}
			if (++rx == 4) {
				rx = 0;
				++ry;
			}
		}
	},
	create_tile: function(x, y, rx, ry) {
		var canvasBlock = new Phaser.BitmapData(game, 'block', TILE_WIDTH, TILE_HEIGHT);
		canvasBlock.fill(55, 55, 100);
		game.add.sprite(this.tile_x(x+rx), this.tile_y(y+ry), canvasBlock);
	},
	create_block: function (x, y) {
		this.eachblock(x, y, this.create_tile.bind(this));
	}
};
