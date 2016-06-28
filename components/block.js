var BlockManager = (function () {
	//Then God said "Let there be straight pieces",
	//and there were straight pieces.

	var exports = {};

	//Public//

	exports.new_block = function (shape) {
		return new Block(shape);
	}

	//Private//

	//Block object for instantiating.
	var Block = function(shape) {
		this.shape = shape;
		this.dir = 0;
		this.origin_x = this.origin_y = 0;

		//BLOCK AI//
		this.speak = function() {
			window.alert("Hello! I am a block!");
		};

		//MOVEMENT//
		this.rotate_cw = function() {
			this.dir += 1;
			if (this.dir > 3) { this.dir = 0 };
			this.new_pos(this.origin_x, this.origin_y);
		};
		this.rotate_ccw = function() {
			this.dir -= 1;
			if (this.dir < 0) { this.dir = 3 };
			this.new_pos(this.origin_x, this.origin_y);
		};
		this.move = function(x, y) {
			//moves block relative to current position
			this.new_pos(this.origin_x + x, this.origin_y + y);
		};

		//POSITIONING//
		this.new_pos = function(x, y) {
			//set block coordinates
			this.origin_x = x;
			this.origin_y = y;
			this.eachblock(x, y, this.place_tile.bind(this));
		};
		this.place_tile = function(x, y, rx, ry, i) {
			//set tile coordinates
			this.group.children[i].x = tile_x(x+rx);
			this.group.children[i].y = tile_y(y+ry);
		};

		//CREATION//
		this.create_block = function (x, y) {
			//create group and populate with tiles
			this.group = game.add.group();
			this.eachblock(x, y, this.create_tile.bind(this));
			this.new_pos(x, y);
		};
		this.create_tile = function(x, y, rx, ry) {
			//create tile sprite
			var canvasBlock = new Phaser.BitmapData(game, 'block', TILE_WIDTH, TILE_HEIGHT);
			canvasBlock.fill(55, 55, 100);
			this.group.create(0, 0, canvasBlock);
		};

		//HELPERS//
		//run a function on each tile in the block.
		this.eachblock = function(x, y, fn) {
			var bit;
			var blocks = this.shape[this.dir];
			var rx = ry = 0;
			var i = 0;
			for (bit = 0x8000; bit > 0; bit = bit >> 1) {
				if (blocks & bit) {
					fn(x, y, rx, ry, i);
					i++;
				}
				if (++rx == 4) {
					rx = 0;
					++ry;
				}
			}
		};
	};

	return exports;
}());
