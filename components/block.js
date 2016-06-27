var BlockManager = {
	//All hail BlockManager, messenger of the Tetris gods, bringer of the I block.

	//Block object for instantiating.
	Block: function(shape) {
		this.shape = shape;
		this.dir = 0;

		//BLOCK AI//
		this.speak = function() {
			window.alert("I am the " + this.shape + " block!");
		};

		this.set_shape = function(shape) {
			this.shape = shape;
		};

		//MOVEMENT//
		this.rotate = function(i) {
			//magical fairy dust
		};
		this.move = function(x, y) {
			//more magic
		};

		//run a function on each tile in the block.
		this.eachblock = function(x, y, fn) {
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
		};
		this.create_tile = function(x, y, rx, ry) {
			var canvasBlock = new Phaser.BitmapData(game, 'block', TILE_WIDTH, TILE_HEIGHT);
			canvasBlock.fill(55, 55, 100);
			game.add.sprite(tile_x(x+rx), tile_y(y+ry), canvasBlock);
		};
		this.create_block = function (x, y) {
			this.eachblock(x, y, this.create_tile.bind(this));
		};
	},
};
