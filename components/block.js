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
	};

	//BLOCK AI//
	Block.prototype.speak = function() {
		window.alert("Hello! I am a block!");
	};

	//MOVEMENT//
	Block.prototype.rotate_cw = function() {
		this.dir += 1;
		if (this.dir > 3) { this.dir = 0 };
		this.new_pos(this.origin_x, this.origin_y);
	};
	Block.prototype.rotate_ccw = function() {
		this.dir -= 1;
		if (this.dir < 0) { this.dir = 3 };
		this.new_pos(this.origin_x, this.origin_y);
	};
	Block.prototype.move = function(x, y) {
		//moves block relative to current position
		this.new_pos(this.origin_x + x, this.origin_y + y);
	};
		//POSITIONING//
	Block.prototype.new_pos = function(x, y) {
		//set block coordinates
		this.origin_x = x;
		this.origin_y = y;
		this.eachtile(x, y, this.place_tile.bind(this));
	};
	Block.prototype.place_tile = function(x, y, rx, ry, i) {
		//set tile coordinates
		this.group.children[i].x = tile_pos_x(x+rx);
		this.group.children[i].y = tile_pos_y(y+ry);
		this.group.children[i].tile_x = x + rx;
		this.group.children[i].tile_y = y + ry;
	};
	//CREATION//
	Block.prototype.create_block = function (x, y) {
		//create group and populate with tiles
		this.group = game.add.group();
		this.eachtile(x, y, this.create_tile.bind(this));
		this.new_pos(x, y);
	};
	Block.prototype.create_tile = function() {
		//create tile sprite
		var canvasBlock = new Phaser.BitmapData(game, 'block', TILE_WIDTH, TILE_HEIGHT);
		canvasBlock.fill(55, 55, 100);
		var tile = game.add.sprite(0, 0, canvasBlock);
		tile.tile_x = 0;
		tile.tile_y = 0;
		this.group.add(tile);
	};
	//HELPERS//
	//run a function on each tile in the block.
	Block.prototype.eachtile = function(x, y, fn) {
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

	Block.prototype.tile_coords = function() {
		var tile_coords_arr = [];
		for (tile in this.group.children) {
			tile_coords_arr.push([
				this.group.children[tile].tile_x, 
			this.group.children[tile].tile_y
			]);
		}
		return tile_coords_arr;
	};

	return exports;
}());
