var BlockManager = (function () {
	//Then God said "Let there be straight pieces",
	//and there were straight pieces.

	var exports = {};

	//Public//

	exports.init = function () {
		new_pool();
	};

	exports.new_block = function (shape) {
		var block = new Block(BLOCKS[get_next_block()].shape);
		if (block_pool.length == 0) { new_pool(); }
		block.create_block();
		return block;
	};

	//Private//

	var BLOCKS = {
		i: { shape: [0x0F00, 0x2222, 0x00F0, 0x4444], color: 'cyan' },
		j: { shape: [0x44C0, 0x8E00, 0x6440, 0x0E20], color: 'blue' },
		l: { shape: [0x4460, 0x0E80, 0xC440, 0x2E00], color: 'orange' },
		o: { shape: [0xCC00, 0xCC00, 0xCC00, 0xCC00], color: 'yellow' },
		s: { shape: [0x06C0, 0x8C40, 0x6C00, 0x4620], color: 'green' },
		t: { shape: [0x0E40, 0x4C40, 0x4E00, 0x4640], color: 'purple' },
		z: { shape: [0x0C60, 0x4C80, 0xC600, 0x2640], color: 'red' }
	};
	var block_pool = [];

	//BLOCK POOL
	var new_pool = function () {
		//create list of keys for BLOCKS object.
		for (var block in BLOCKS) {
			for (var i = 0; i <= 3; i++) {
				block_pool.push(block);
			}
		};
	};

	var get_next_block = function () {
		//get random block from pool.
		var rand = Math.floor(Math.random() * block_pool.length - 1);
		return block_pool.splice(rand, 1);
	};


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
